import classNames from 'classnames'
import './ShortenedListToggle.scss'
import React, { useContext, ComponentProps } from 'react'
import { ShortenedListContext } from './context'

type Props = ComponentProps<'div'>

const cn = 'shortened-list-toggle'

export function ShortenedListToggle(props: Props) {
  const { texts, toggle, showToggle } = useContext(ShortenedListContext)
  if (!showToggle) return null
  return (
    <div
      onClick={toggle}
      {...props}
      className={classNames(cn, props.className)}
    >
      {texts.toggle}
    </div>
  )
}
