import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  prism,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language?: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const initialScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const [scheme, setScheme] = useState<'dark' | 'light'>(
    initialScheme.matches ? 'dark' : 'light'
  )
  const style = scheme === 'dark' ? vscDarkPlus : prism
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const nextScheme = event.matches ? 'dark' : 'light'
        setScheme(nextScheme)
      })
  }, [])
  return (
    <SyntaxHighlighter language={language} style={style}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
