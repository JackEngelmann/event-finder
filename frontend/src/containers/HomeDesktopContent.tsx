import React from 'react';
import { useSelectedDate } from "./useSelectedDate";
import { useHistory, useLocation } from "react-router";
import { useDimensions } from "./useDimensions";
import moment from 'moment';
import { Header } from '../components/Header';
import { SelectedDate } from '../components/SelectedDate';
import { ClubListContainer } from './ClubListContainer';
import { EventListContainer } from './EventListContainer';
import { Calendar } from '../components/Calendar';
import './HomeDesktopContent.scss'
import { FooterContainer } from './FooterContainer';
import { Page } from '../components/Page';
import { Content } from '../components/Content';

type Props = {
 monthSelection: moment.Moment
 setMonthSelection: (monthSelection: moment.Moment) => void 
}

const PickDate = () => <span>Pick a date</span>

const cn = 'home-desktop-content'

export function HomeDesktopContent(props: Props) {
  const { monthSelection, setMonthSelection } = props
  const dimensions = useDimensions()
  const showClubList = Boolean(!dimensions.width || dimensions.width > 1000);
  const [selectedDate, setSelectedDate] = useSelectedDate();
  const search = useLocation().search
  const history = useHistory()
  const onEventClick = (event: { id: number }) => history.push(`/event/${event.id}${search}`)
  return (
    <Page>
      <Header>
        {selectedDate
          ? <SelectedDate
              date={selectedDate}
            />
          : <PickDate />
        }
      </Header>
      <Content>
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
        <div className={`${cn}__scroll-wrapper`}>
          <div className={`${cn}__max-width-wrapper`}>
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
          </div>
        </div>
      </Content>
      <FooterContainer />
    </Page>
  )
}