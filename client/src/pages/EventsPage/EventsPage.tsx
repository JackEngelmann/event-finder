import './EventsPage.scss'
import React, { useState } from 'react'
import moment from 'moment'
import { useDimensions } from '../../components/utils/useDimensions'
import { useSelectedDate } from '../../components/utils/useSelectedDate'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Page } from '../../components/Page/Page'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { Content } from '../../components/Content/Content'
import { ClubListContainer } from '../../components/ClubList/ClubListContainer'
import { EventListContainer } from '../../components/EventList/EventListContainer'
import { Calendar } from '../../components/Calendar/Calendar'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon/Icon'

type Props = {}

const currentDate = moment()

const cn = 'events-page'

// TODO: refactor

export function EventsPage(props: Props) {
    const dimensions = useDimensions()
    const [monthSelection, setMonthSelection] = useState(currentDate)
    const [selectedDate, setSelectedDate] = useSelectedDate()
    const history = useHistory()
    const desktop = Boolean(dimensions.width && dimensions.width > 800)
    const showClubList = Boolean(!dimensions.width || dimensions.width > 1000)
    const search = useLocation().search
    if (!selectedDate) {
        return <Redirect to={`/event?date=${moment().toISOString()}`} />
    }
    const onEventClick = (event: { id: number }) =>
        history.push(`/event/${event.id}${search}`)

    function renderDesktopContent() {
        return (
            <>
                <div className={`${cn}__title`}>
                    Events on {selectedDate!.format('D. MMMM')}
                </div>
                <div className={`${cn}__calendar-anchor`}>
                    <div className={`${cn}__calendar-wrapper`}>
                        <Calendar
                            monthSelection={monthSelection}
                            setMonthSelection={setMonthSelection}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>
                </div>
                <Content scrollable restrictMaxWidth={desktop}>
                    {showClubList && (
                        <div className={`${cn}__club-list-wrapper`}>
                            <ClubListContainer />
                        </div>
                    )}
                    <div className={`${cn}__event-list-wrapper`}>
                        <EventListContainer
                            selectedDate={selectedDate}
                            desktop
                            onEventClick={onEventClick}
                        />
                    </div>
                </Content>
            </>
        )
    }

    function renderMobileContent() {
        return (
            <>
                <HeaderContainer>
                    <div>
                        {selectedDate ? (
                            <div>
                                <Button
                                    borderless
                                    onClick={() =>
                                        setSelectedDate(
                                            selectedDate.subtract(1, 'day')
                                        )
                                    }
                                    className={`${cn}__select-day-arrow-button`}
                                >
                                    <Icon icon="arrow-left" />
                                </Button>
                                <span>{selectedDate.format('D. MMMM')}</span>
                                <Button
                                    borderless
                                    onClick={() =>
                                        setSelectedDate(
                                            selectedDate.add(1, 'day')
                                        )
                                    }
                                    className={`${cn}__select-day-arrow-button`}
                                >
                                    <Icon icon="arrow-right" />
                                </Button>
                            </div>
                        ) : (
                            'Pick a Date'
                        )}
                    </div>
                </HeaderContainer>
                <Content scrollable restrictMaxWidth={desktop}>
                    <EventListContainer
                        selectedDate={selectedDate}
                        onEventClick={onEventClick}
                    />
                </Content>
            </>
        )
    }
    return (
        <Page className={cn}>
            {desktop ? renderDesktopContent() : renderMobileContent()}
        </Page>
    )
}
