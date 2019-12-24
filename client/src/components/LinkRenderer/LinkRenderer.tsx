import * as R from 'ramda'
import React from 'react'
import './LinkRenderer.scss'

type Props = {
  text?: string
  href: string
}

const cn = 'link-renderer'

export function LinkRenderer(props: Props) {
  const { text, href } = props
  const linkText = text || prettifyLink(href)
  return (
    <a
      href={prependProtocoll(href)}
      className={cn}
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  )
}

function prependProtocoll(link: string) {
  const hasProtocoll = Boolean(link.match(/^(http[s]?:)/))
  return hasProtocoll ? link : `https://${link}`
}

function prettifyLink(link: string) {
  const matchResult = link.match(
    /(?:http[s]?:)?[/]{0,2}[w]{0,3}[.]?([\S]*)[/]{0,1}/
  )
  const linkBase = matchResult && matchResult[1]
  if (!linkBase) return 'link'
  return R.endsWith('/', linkBase) ? linkBase.slice(0, -1) : linkBase
}
