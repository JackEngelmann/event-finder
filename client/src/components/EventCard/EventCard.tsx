import React from 'react'
import './EventCard.scss'
import classNames from 'classnames'
import * as R from 'ramda'
import moment from 'moment'

type Props = {
  event: {
    name: string
    date: string
    imageUrls?: string[]
    club: { name: string }
    genres: {
      id: number
      name: string
    }[]
    priceCategory: number
  }
  onClick: () => void
  desktop?: boolean
  showDate?: boolean
}

const cn = 'event-card'

export function EventCard(props: Props) {
  const { event, onClick, desktop, showDate } = props
  return (
    <div
      className={classNames(cn, {
        [`${cn}--desktop`]: desktop,
      })}
      onClick={onClick}
    >
      <div className={`${cn}__picture-wrapper`}>
        <img
          className={`${cn}__picture`}
          src={event.imageUrls ? event.imageUrls[0] : undefined}
          alt={`event ${event.name}`}
        />
      </div>
      <div className={`${cn}__information`}>
        <div className={`${cn}__name`}>{event.name}</div>
        <div className={`${cn}__extra-information`}>
          <div className={`${cn}__left`}>
            {showDate ? moment(event.date).format('DD.MM.YY') : event.club.name}
          </div>
          <div className={`${cn}__right`}>
            {event.genres.map(g => g.name).join(', ')}
          </div>
        </div>
        {event.priceCategory && (
          <div className={`${cn}__price`}>
            {R.times(() => '€', event.priceCategory).join('')}
          </div>
        )}
      </div>
    </div>
  )
}
