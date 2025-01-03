'use client'

import { useCallback } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism-tomorrow.css'

interface CodeEditorProps {
  value: string
  onValueChange: (code: string) => void
}

export default function CodeEditor({ value, onValueChange }: CodeEditorProps) {
  const highlightWithLineNumbers = useCallback((code: string) => {
    return highlight(code, languages.markup, 'markup')
      .split('\n')
      .map((line, i) => `<span class='line-number'>${i + 1}</span>${line}`)
      .join('\n')
  }, [])

  return (
    <Editor
      value={value}
      onValueChange={onValueChange}
      highlight={highlightWithLineNumbers}
      padding={10}
      textareaClassName="outline-none"
      className="font-mono text-sm"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        backgroundColor: '#f5f5f5',
        borderRadius: '0.375rem',
        border: '1px solid #e2e8f0',
      }}
    />
  )
}

