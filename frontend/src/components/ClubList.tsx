import React, { useState } from 'react'
import { Club } from "../api";
import { ReactNode } from "react";
import './ClubList.css'
import * as R from 'ramda'

type Props = {
    clubs: Club[]
    renderClub: (club: Club) => ReactNode
    showFirst?: number
}

const sortClubsByName = R.sortBy(R.prop('name'))

export function ClubList(props: Props) {
    const { clubs, renderClub, showFirst } = props
    const [showAll, setShowAll] = useState(false)

    const sortedClubs = sortClubsByName(clubs)

    function renderContent() {
        if (sortedClubs === undefined) return 'Loading...'
        if (sortedClubs.length === 0) return 'No events listed today'
        const displayedClubs = (!showAll && showFirst) ? R.take(showFirst, sortedClubs) : sortedClubs
        const difference = sortedClubs.length - displayedClubs.length
        return (
            <>
                {displayedClubs.map(renderClub)}
                {difference > 0 && <div className="club-list__see-more" onClick={() => setShowAll(true)}>
                    See More ({difference})
                </div>}
                {showAll && <div className="club-list__see-more" onClick={() => setShowAll(false)}>
                    Show Less
                </div>}
            </>
        )
    }

    return (
        <div className="club-list">
            <div className="club-list__header">
                Clubs
            </div>
            <div className="club-list__content">
                {renderContent()}
            </div>
        </div>
    )
}