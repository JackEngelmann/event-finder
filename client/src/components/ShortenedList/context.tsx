import React from 'react'

type ShortenedListContextType = {
  texts: {
    toggle: string
  }
  toggle: () => void
  shortenedListLength: number
  showToggle: boolean
}

export const ShortenedListContext = React.createContext<
  ShortenedListContextType
>({
  texts: {
    toggle: '',
  },
  toggle: () => {},
  shortenedListLength: Infinity,
  showToggle: false,
})
