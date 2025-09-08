"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

type RichTextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  theme?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  theme = 'snow',
  placeholder,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string>(value || '');

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    } else {
      setInternalValue(content);
    }
  };

  return (
    <ReactQuill
      theme={theme}
      value={value !== undefined ? value : internalValue}
      onChange={handleChange}
      placeholder={placeholder || "Compose an epic..."}
      {...rest}
    />
  );
};

export default RichTextEditor;