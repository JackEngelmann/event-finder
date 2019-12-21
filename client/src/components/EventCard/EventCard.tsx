import React from 'react'
import './EventCard.scss'
import classNames from 'classnames'

type Props = {
    event: {
        name: string
        imageUrls?: string[]
        club: { name: string }
    }
    onClick: () => void
    desktop?: boolean
}

const cn = 'event-card'

export function EventCard(props: Props) {
    const { event, onClick, desktop } = props
    return (
        <div
            className={classNames(cn, {
                [`${cn}--desktop`]: desktop,
                [`${cn}--mobile`]: !desktop,
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
                <div className={`${cn}__club-name`}>{event.club.name}</div>
            </div>
        </div>
    )
}
