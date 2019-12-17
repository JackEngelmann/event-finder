import './EventsPage.scss'
import React, { useState } from 'react'
import moment from 'moment'
import { useDimensions } from '../containers/useDimensions'
import { useSelectedDate } from '../containers/useSelectedDate'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Page } from '../components/Page'
import { HeaderContainer } from '../containers/HeaderContainer'
import { Content } from '../components/Content'
import { ClubListContainer } from '../containers/ClubListContainer'
import { EventListContainer } from '../containers/EventListContainer'
import { Calendar } from '../components/Calendar'

type Props = {}

const currentDate = moment()
const PickDate = () => <span>Pick a date</span>

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
    return (
        <Page className={cn}>
            <HeaderContainer>
                <div>
                    {selectedDate
                        ? selectedDate.format('D. MMMM')
                        : 'Pick a Date'}
                </div>
            </HeaderContainer>
            {desktop && (
                <>
                    <div className={`${cn}__title`}>
                        Events on {selectedDate.format('D. MMMM')}
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
                </>
            )}
            <Content scrollable restrictMaxWidth={desktop}>
                {desktop ? (
                    <>
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
                    </>
                ) : (
                    <EventListContainer
                        selectedDate={selectedDate}
                        onEventClick={onEventClick}
                    />
                )}
            </Content>
        </Page>
    )
}
