import './AdminUpdateEventPage.scss'
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { eventDetailsFragment, EventDetailsEvent } from '../../graphqlUtils'
import { useParams, useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import moment from 'moment'
import { useGenres } from '../../components/utils/useGenres'
import { useClubs } from '../../components/utils/useClubs'
import { Button } from '../../components/Button/Button'
import { H1Title } from '../../components/H1Title/H1Title'
import { Spacer } from '../../components/Spacer/Spacer'
import { LabeledInput } from '../../components/LabeledInput/LabeledInput'
import { Input } from '../../components/Input/Input'
import { Calendar } from '../../components/Calendar'
import { Select } from '../../components/Select/Select'
import { Option } from '../../components/Option/Option'
import { Textarea } from '../../components/TextArea/Textarea'
import { MultiSelect } from '../../components/MultiSelect/MultiSelect'
import { ImageUrlsInput } from '../../components/ImageUrlsInput/ImageUrlsInput'
import { NetworkError } from '../../components/NetworkError'
import { useTranslation } from 'react-i18next'

type Params = {
  eventId: string
}

type State = {
  admissionFee?: number
  admissionFeeWithDiscount?: number
  amountOfFloors?: number
  club?: {
    id: number
    name: string
  }
  date?: string
  description?: string
  genres?: {
    id: number
    name: string
  }[]
  id?: number
  imageUrls?: string[]
  link?: string
  minimumAge?: number
  name?: string
  priceCategory?: 1 | 2 | 3
  special?: string
}

// TODO: store entities in state, transform to id when doing mutation

const EVENT_QUERY = gql`
  query eventQuery($eventId: Int!) {
    event(id: $eventId) {
      ...EventDetails
    }
  }
  ${eventDetailsFragment}
`
type QueryData = { event: EventDetailsEvent }

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      event {
        ...EventDetails
      }
    }
  }
  ${eventDetailsFragment}
`

const cn = 'admin-update-event-page'

export function AdminUpdateEventPage(props: any) {
  const params = useParams<Params>()
  const { t } = useTranslation()
  const { eventId } = params
  const [requestPending, setRequestPending] = useState(false)
  const [monthSelection, setMonthSelection] = useState(moment())
  const [genres, genresQueryResult] = useGenres()
  const [clubs, clubsQueryResult] = useClubs()
  const eventQueryResult = useQuery<QueryData>(EVENT_QUERY, {
    variables: { eventId: parseInt(eventId, 10) },
  })
  const [state, setState] = useState<State>({})
  const [updateEventMutation] = useMutation(UPDATE_EVENT_MUTATION, {
    variables: {
      input: {
        admissionFee: state.admissionFee,
        admissionFeeWithDiscount: state.admissionFeeWithDiscount,
        amountOfFloors: state.amountOfFloors,
        id: state.id,
        clubId: state.club && state.club.id,
        date: state.date,
        description: state.description,
        genreIds: state.genres ? state.genres.map(g => g.id) : undefined,
        imageUrls: state.imageUrls,
        link: state.link,
        minimumAge: state.minimumAge,
        name: state.name,
        priceCategory: state.priceCategory,
        special: state.special,
      },
    },
    refetchQueries: [
      {
        query: EVENT_QUERY,
        variables: { eventId: parseInt(eventId, 10) },
      },
    ],
  })
  const history = useHistory()
  const event = eventQueryResult.data && eventQueryResult.data.event
  useEffect(() => {
    if (!event) return
    setState(event)
  }, [event])

  if (eventQueryResult.error) return <NetworkError />
  if (clubsQueryResult.error) return <NetworkError />
  if (genresQueryResult.error) return <NetworkError />

  if (!event) return <LoadingIndicator />

  const updateEvent = async () => {
    setRequestPending(true)
    await updateEventMutation()
    history.push(`/event/${eventId}`)
  }

  const canSave =
    state.name && state.club && state.date && state.id && !requestPending

  return (
    <Page>
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        <H1Title>{t('editEvent')}</H1Title>
        <div className={cn}>
          <LabeledInput label={t('name')}>
            <Input
              data-cy="adminupdateevent-name-input"
              placeholder="name"
              value={state.name || ''}
              onChange={e =>
                setState({
                  ...state,
                  name: e.target.value,
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('date')}>
            <div className={`${cn}__calendar-wrapper`}>
              <Calendar
                monthSelection={monthSelection}
                setMonthSelection={setMonthSelection}
                selectedDate={state.date ? moment(state.date) : undefined}
                setSelectedDate={date =>
                  setState({
                    ...state,
                    date: date.toISOString(),
                  })
                }
              />
            </div>
          </LabeledInput>
          <LabeledInput label={t('club')}>
            <Select
              data-cy="adminupdateevent-club-select"
              value={state.club ? state.club.id : ''}
              onChange={e =>
                setState({
                  ...state,
                  club: (clubs || []).find(
                    c => c.id === parseInt(e.target.value, 10)
                  ),
                })
              }
            >
              <Option disabled value="">
                --select--
              </Option>
              {(clubs || []).map(c => (
                <Option value={c.id}>{c.name}</Option>
              ))}
            </Select>
          </LabeledInput>
          <LabeledInput label={t('admissionFee')}>
            <Input
              data-cy="adminupdateevent-admissionfee-input"
              min={0}
              onChange={e =>
                setState({
                  ...state,
                  admissionFee: parseFloat(e.target.value),
                })
              }
              step={0.01}
              type="number"
              value={state.admissionFee || ''}
            />
          </LabeledInput>
          <LabeledInput label={t('admissionFeeWithDiscount')}>
            <Input
              data-cy="adminupdateevent-admissionfeewithdiscount-input"
              min={0}
              onChange={e =>
                setState({
                  ...state,
                  admissionFeeWithDiscount: parseFloat(e.target.value),
                })
              }
              step={0.01}
              type="number"
              value={state.admissionFeeWithDiscount || ''}
            />
          </LabeledInput>
          <LabeledInput label={t('amountOfFloors')}>
            <Input
              data-cy="adminupdateevent-amountoffloors-input"
              min={0}
              onChange={e =>
                setState({
                  ...state,
                  amountOfFloors: parseInt(e.target.value, 10),
                })
              }
              type="number"
              value={state.amountOfFloors || ''}
            />
          </LabeledInput>
          <LabeledInput label={t('description')}>
            <Textarea
              data-cy="adminupdateevent-description-input"
              onChange={e =>
                setState({
                  ...state,
                  description: e.target.value,
                })
              }
              value={state.description || ''}
              width="20em"
            />
          </LabeledInput>
          <LabeledInput label={t('specials')}>
            <Textarea
              data-cy="adminupdateevent-specials-input"
              onChange={e =>
                setState({
                  ...state,
                  special: e.target.value,
                })
              }
              value={state.special || ''}
              width="20em"
            />
          </LabeledInput>
          <LabeledInput label={t('minimumAge')}>
            <Input
              data-cy="adminupdateevent-minimumage-input"
              min={0}
              onChange={e =>
                setState({
                  ...state,
                  minimumAge: parseInt(e.target.value, 10),
                })
              }
              type="number"
              value={state.minimumAge || ''}
            />
          </LabeledInput>
          <LabeledInput label={t('priceCategory')}>
            <Select
              data-cy="adminupdateevent-pricecategory-select"
              onChange={e => {
                setState({
                  ...state,
                  priceCategory:
                    e.target.value === ''
                      ? undefined
                      : (parseInt(e.target.value, 10) as 1 | 2 | 3),
                })
              }}
              value={state.priceCategory || ''}
            >
              <Option value="">No Value</Option>
              <Option value="1">Low</Option>
              <Option value="2">Average</Option>
              <Option value="3">High</Option>
            </Select>
          </LabeledInput>
          <LabeledInput label={t('genres')}>
            <MultiSelect
              getItemKey={item => item.id.toString()}
              renderItem={item => item.name}
              items={genres || []}
              selectedItems={state.genres || []}
              onChange={genres =>
                setState({
                  ...state,
                  genres,
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('link')}>
            <Input
              data-cy="adminupdateevent-link-input"
              onChange={e =>
                setState({
                  ...state,
                  link: e.target.value,
                })
              }
              value={state.link || ''}
            />
          </LabeledInput>
          <LabeledInput label={t('images')}>
            <ImageUrlsInput
              value={state.imageUrls}
              onChange={imageUrls => setState({ ...state, imageUrls })}
            />
          </LabeledInput>
        </div>
        <Spacer />
        <Button
          primary
          disabled={!canSave}
          onClick={updateEvent}
          data-cy="adminupdateevent-save"
        >
          {t('save')}
        </Button>
        <Button secondary onClick={() => history.push('/admin')}>
          {t('cancel')}
        </Button>
        <Spacer />
      </Content>
    </Page>
  )
}
