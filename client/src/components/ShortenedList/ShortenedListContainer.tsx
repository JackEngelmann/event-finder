import * as R from 'ramda'
import React, { useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ShortenedListContext } from './context'
import { TFunction } from 'i18next'

type Props = {
  showFirst?: number
  children: ReactNode
  listLenght: number
}

export function ShortenedListContainer(props: Props) {
  const { children, showFirst, listLenght } = props
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation()
  const shortenedListLength = getShortenedListLenght(
    showAll,
    showFirst,
    listLenght
  )
  const difference = listLenght - shortenedListLength
  const toggleText = getToggleText(t, showAll, difference)
  const showToggle = shortenedListLength !== Infinity && difference > 0
  return (
    <ShortenedListContext.Provider
      value={{
        shortenedListLength,
        showToggle,
        texts: {
          toggle: toggleText,
        },
        toggle: () => setShowAll(R.not),
      }}
    >
      {children}
    </ShortenedListContext.Provider>
  )
}

function getShortenedListLenght(
  showAll: boolean,
  showFirst: number | undefined,
  listLenght: number
) {
  if (showAll) return listLenght
  return showFirst || Infinity
}

function getToggleText(t: TFunction, showAll: boolean, difference: number) {
  return showAll ? t('showLess') : `${t('showMore')} (${difference})`
}
