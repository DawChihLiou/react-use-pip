import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  prism,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')

interface CodeBlockProps {
  language?: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [scheme, setScheme] = useState<'dark' | 'light'>(
    prefersColorScheme.matches ? 'dark' : 'light'
  )
  const schemeHandler = (event: MediaQueryListEvent) => {
    const nextScheme = event.matches ? 'dark' : 'light'
    setScheme(nextScheme)
  }
  const style = scheme === 'dark' ? vscDarkPlus : prism

  useEffect(() => {
    if (prefersColorScheme.addEventListener) {
      prefersColorScheme.addEventListener('change', schemeHandler)
    } else {
      prefersColorScheme.addListener(schemeHandler)
    }
  }, [])

  return (
    <SyntaxHighlighter language={language} style={style}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
