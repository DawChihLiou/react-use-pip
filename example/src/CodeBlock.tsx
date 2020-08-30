import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language?: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={atomDark}>
    {value}
  </SyntaxHighlighter>
)

export default CodeBlock
