/**
 * Convert HTML (rich text) to readable plain text in the browser.
 * Preserves paragraphs, <br>, headings, and list items.
 *
 * @param html - The HTML string to convert
 * @param opts - Optional configuration
 * @param opts.wrap - Max line width to wrap (0 = no wrap)
 * @returns Plain text string
 */
export function htmlToPlainText(html: string, opts: { wrap?: number } = {}): string {
  const wrap = opts.wrap || 0;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || '', 'text/html');

  const decodeHtmlEntities = (str: string): string => {
    const ta = document.createElement('textarea');
    ta.innerHTML = str;
    return ta.value;
  };

  const walk = (node: Node): string => {
    let out = '';

    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === Node.TEXT_NODE) {
        out += (child.nodeValue || '').replace(/\s+/g, ' ');
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        const name = element.nodeName.toLowerCase();

        if (name === 'br') {
          out += '\n';
        } else if (name === 'p' || /^h[1-6]$/.test(name)) {
          out += '\n' + walk(child).trim() + '\n\n';
        } else if (name === 'li') {
          const parentName = element.parentElement?.nodeName.toLowerCase();
          const bullet = parentName === 'ol' ? '1. ' : '- ';
          out += bullet + walk(child).trim() + '\n';
        } else if (name === 'ul' || name === 'ol') {
          out += '\n' + walk(child) + '\n';
        } else if (name === 'blockquote') {
          const inner = walk(child).trim().split('\n').map(l => `> ${l}`).join('\n');
          out += '\n' + inner + '\n\n';
        } else if (name === 'pre' || name === 'code') {
          out += '\n' + element.textContent + '\n';
        } else if (name === 'a') {
          const text = walk(child).trim();
          const href = element.getAttribute('href');
          out += text || href || '';
          if (href && text && !text.includes(href)) out += ` (${href})`;
        } else {
          out += walk(child);
        }
      }
    }

    return out;
  };

  let text = walk(doc.body || doc);

  text = decodeHtmlEntities(text);
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  if (wrap && Number.isInteger(wrap) && wrap > 0) {
    text = wrapText(text, wrap);
  }

  return text;
}

/**
 * Wrap text to a maximum line width
 */
function wrapText(text: string, maxWidth: number): string {
  return text
    .split('\n')
    .map(line => {
      if (line.length <= maxWidth) return line;
      const words = line.split(' ');
      let out = '', cur = '';
      for (const w of words) {
        if ((cur + ' ' + w).trim().length > maxWidth) {
          out += (out ? '\n' : '') + cur.trim();
          cur = w;
        } else {
          cur += (cur ? ' ' : '') + w;
        }
      }
      if (cur) out += (out ? '\n' : '') + cur.trim();
      return out;
    })
    .join('\n');
}
