import * as R from 'ramda'
import React, { useContext, ReactNode } from 'react'
import { ShortenedListContext } from './context'

type Props<ItemType> = {
  items: ItemType[]
  renderList(items: ItemType[]): ReactNode
}

export function ShortenedListList<ItemType>(props: Props<ItemType>) {
  const { items, renderList } = props
  const { shortenedListLength } = useContext(ShortenedListContext)
  const shortenedItems = R.take<ItemType>(shortenedListLength, items)
  return <>{renderList(shortenedItems)}</>
}
