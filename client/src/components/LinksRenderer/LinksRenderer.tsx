import './LinksRenderer.scss'
import React from 'react'
import { Spacer } from '../Layouting/Spacer'
import { Icon } from '../Icon/Icon'

type Props = {
  links: { href: string; type: 'FACEBOOK' | 'HOMEPAGE' }[]
}

const cn = 'links-renderer'

export function LinksRenderer(props: Props) {
  const { links } = props
  if (links.length === 0) return null
  return (
    <div className={cn}>
      {links.map((l) => (
        <Spacer marginRight={1} key={l.href}>
          <a
            href={prependProtocoll(l.href)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.type === 'FACEBOOK' && <Icon icon="facebook" iconPrefix="fab" />}
            {l.type === 'HOMEPAGE' && <Icon icon="globe" />}
          </a>
        </Spacer>
      ))}
    </div>
  )
}

function prependProtocoll(link: string) {
  const hasProtocoll = Boolean(link.match(/^(http[s]?:)/))
  return hasProtocoll ? link : `https://${link}`
}
