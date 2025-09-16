// import Swal from 'sweetalert2';

// interface IConfirmModalProps {
//   title?: string;
//   text?: string;
//   confirmText?: string;
//   cancelText?: string;
//   func: () => void;
//   target?: HTMLElement | string;
// };

// export const showConfirmModal = ({ title, text, confirmText, cancelText, func, target }: IConfirmModalProps) => {

//   const renderText = () => {
//     switch (text) {
//       case "delete":
//         return "Are you sure you want to delete this trainer?";
//       case "move-to-trash":
//         return "Are you sure you want to move to trash?";
//       case "save":
//         return "Are you sure you want to save the data?";
//       default:
//         return text;
//     }
//   }

//   Swal.fire({
//     title: title || "Comfirm?",
//     text: renderText(),
//     confirmButtonColor: "var(--color-primary)",
//     cancelButtonColor: "#d33",
//     showCancelButton: true,
//     confirmButtonText: confirmText || "Yes, Save it",
//     denyButtonText: cancelText || `Don't save`,
//     icon: "question",
//     target: target || document.body,
//     customClass: {
//       container: "z-[2147483647]", // ⬅️ ensures swal above shadcn dialog
//       popup: "relative"
//     }
//   }).then((result) => {
//     if (result.isConfirmed) {
//       return func();
//     }
//   });
// }

import Swal from 'sweetalert2';

interface IConfirmModalProps {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  func: () => void;
  target?: HTMLElement | string;
};

export const showConfirmModal = ({ title, text, confirmText, cancelText, func, target }: IConfirmModalProps) => {
  if (typeof document === 'undefined') return;

  const renderText = () => {
    switch (text) {
      case "delete":
        return "Are you sure you want to delete this trainer?";
      case "move-to-trash":
        return "Are you sure you want to move to trash?";
      case "save":
        return "Are you sure you want to save the data?";
      default:
        return text;
    }
  }

  let swalRoot = document.getElementById('swal-root') as HTMLElement | null;
  if (!swalRoot) {
    swalRoot = document.createElement('div');
    swalRoot.id = 'swal-root';
    document.body.appendChild(swalRoot);
  } else {
    document.body.appendChild(swalRoot);
  }
  swalRoot.style.position = 'fixed';
  swalRoot.style.top = '0';
  swalRoot.style.left = '0';
  swalRoot.style.width = '100%';
  swalRoot.style.height = '100%';
  swalRoot.style.zIndex = '2147483647';
  swalRoot.style.pointerEvents = 'none';

  const swalTarget = ((): HTMLElement => {
    if (!target) return swalRoot as HTMLElement;
    if (typeof target === 'string') {
      const sel = document.querySelector(target as string) as HTMLElement | null;
      return sel ?? (swalRoot as HTMLElement);
    }
    return target as HTMLElement;
  })();

  Swal.fire({
    title: title || "Confirm?",
    text: renderText(),
    confirmButtonColor: "var(--color-primary)",
    cancelButtonColor: "#d33",
    showCancelButton: true,
    confirmButtonText: confirmText || "Yes, Save it",
    denyButtonText: cancelText || `Don't save`,
    icon: "question",
    target: swalTarget,
    didOpen: () => {
      const container = document.querySelector('.swal2-container') as HTMLElement | null;
      if (container) {
        container.style.position = 'fixed';
        container.style.zIndex = '2147483647';
        container.style.pointerEvents = 'auto';
        if (swalRoot && container.parentElement !== swalRoot) {
          try { swalRoot.appendChild(container); } catch {}
        }
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      return func();
    }
  });
}
