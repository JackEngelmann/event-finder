import React, { useState } from 'react'
import { Club } from '../../api'
import { ReactNode } from 'react'
import './ClubList.scss'
import * as R from 'ramda'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    const sortedClubs = sortClubsByName(clubs)

    function renderContent() {
        if (sortedClubs === undefined) return <LoadingIndicator />
        if (sortedClubs.length === 0) {
            return t('listNoClubs')
        }
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
                        {t('showMore')} ({difference})
                    </div>
                )}
                {showAll && (
                    <div
                        className={`${cn}__see-more`}
                        onClick={() => setShowAll(false)}
                    >
                        {t('showLess')}
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
