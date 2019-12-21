import React, { useState } from 'react'
import { Club } from '../../api'
import { ReactNode } from 'react'
import './ClubList.scss'
import * as R from 'ramda'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'

type Props = {
    clubs: Club[]
    renderClub: (club: Club) => ReactNode
    showFirst?: number
}

const sortClubsByName = R.sortBy(R.prop('name'))

const cn = 'club-list'

export function ClubList(props: Props) {
    const { clubs, renderClub, showFirst } = props
    const [showAll, setShowAll] = useState(false)

    const sortedClubs = sortClubsByName(clubs)

    function renderContent() {
        if (sortedClubs === undefined) return <LoadingIndicator />
        if (sortedClubs.length === 0) return 'No events listed today'
        const displayedClubs =
            !showAll && showFirst ? R.take(showFirst, sortedClubs) : sortedClubs
        const difference = sortedClubs.length - displayedClubs.length
        return (
            <>
                {displayedClubs.map(renderClub)}
                {difference > 0 && (
                    <div
                        className={`${cn}__see-more`}
                        onClick={() => setShowAll(true)}
                    >
                        See More ({difference})
                    </div>
                )}
                {showAll && (
                    <div
                        className={`${cn}__see-more`}
                        onClick={() => setShowAll(false)}
                    >
                        Show Less
                    </div>
                )}
            </>
        )
    }

    return (
        <div className={cn}>
            <div className={`${cn}__header`}>Clubs</div>
            <div className={`${cn}__content`}>{renderContent()}</div>
        </div>
    )
}
