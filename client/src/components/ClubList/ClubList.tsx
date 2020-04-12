import React from 'react'
import { Club } from '../../api'
import { ReactNode } from 'react'
import './ClubList.scss'
import * as R from 'ramda'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import { useTranslation } from 'react-i18next'
import { ShortenedListContainer } from '../ShortenedList/ShortenedListContainer'
import { ShortenedListList } from '../ShortenedList/ShortenedListList'
import { ShortenedListToggle } from '../ShortenedList/ShortenedListToggle'

type Props = {
  clubs: Club[]
  renderClub: (club: Club) => ReactNode
  showFirst?: number
}

const sortClubsByName = R.sortBy(R.prop('name'))

const cn = 'club-list'

export function ClubList(props: Props) {
  const { clubs, renderClub, showFirst } = props
  const { t } = useTranslation()
  const sortedClubs = sortClubsByName(clubs)
  const noClubsText = t('listNoClubs')!
  return (
    <div className={cn}>
      <div className={`${cn}__header`}>Clubs</div>
      {sortedClubs === undefined ? (
        <LoadingIndicator />
      ) : (
        <ShortenedListContainer
          showFirst={showFirst}
          listLenght={sortedClubs.length}
        >
          <ShortenedListList
            renderList={(items) =>
              items.length === 0 ? noClubsText : items.map(renderClub)
            }
            items={sortedClubs}
          />
          <ShortenedListToggle />
        </ShortenedListContainer>
      )}
    </div>
  )
}
