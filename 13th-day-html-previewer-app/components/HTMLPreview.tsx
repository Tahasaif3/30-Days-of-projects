'use client';

import { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default function HTMLPreview() {
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [html]);

  const highlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.html, 'html');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] gap-4">
      <div className="flex-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Editor
          value={html}
          onValueChange={setHtml}
          highlight={highlight}
          padding={10}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            height: '100%',
            color: '#fff',
            backgroundColor: '#1e1e1e',
          }}
        />
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          key={key}
          srcDoc={html}
          title="preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
