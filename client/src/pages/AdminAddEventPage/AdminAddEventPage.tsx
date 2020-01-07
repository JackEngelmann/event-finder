import './AdminAddEventPage.scss'
import React, { useState } from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { MultiSelectCalendar } from '../../components/Calendar'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'
import moment from 'moment'
import { useGenres } from '../../components/utils/useGenres'
import { useClubs } from '../../components/utils/useClubs'
import { Button } from '../../components/Button/Button'
import { H1Title } from '../../components/H1Title/H1Title'
import { Spacer } from '../../components/Spacer/Spacer'
import { LabeledInput } from '../../components/LabeledInput/LabeledInput'
import { Input } from '../../components/Input/Input'
import { Select } from '../../components/Select/Select'
import { Option } from '../../components/Option/Option'
import { Textarea } from '../../components/TextArea/Textarea'
import { MultiSelect } from '../../components/MultiSelect/MultiSelect'
import { ImageUrlsInput } from '../../components/ImageUrlsInput/ImageUrlsInput'
import { NetworkError } from '../../components/NetworkError'
import { useTranslation } from 'react-i18next'

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      event {
        id
      }
    }
  }
`

type State = {
  admissionFee?: number
  admissionFeeWithDiscount?: number
  amountOfFloors?: number
  club?: {
    id: number
    name: string
  }
  dates: string[]
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

const cn = 'admin-add-event-page'

export function AdminAddEventPage() {
  const { t } = useTranslation()
  const [monthSelection, setMonthSelection] = useState(moment())
  const [requestPending, setRequestPending] = useState(false)
  const [genres, genresQueryResult] = useGenres()
  const [clubs, clubsQueryResult] = useClubs()
  const [state, setState] = useState<State>({
    dates: [],
  })
  const [createEventMutation] = useMutation(CREATE_EVENT_MUTATION)

  const canCreate =
    state.name && state.club && state.dates.length >= 1 && !requestPending
  const history = useHistory()

  const createEvent = async () => {
    setRequestPending(true)
    const mutations = state.dates.map(date =>
      createEventMutation({
        variables: {
          input: {
            admissionFee: state.admissionFee,
            admissionFeeWithDiscount: state.admissionFeeWithDiscount,
            amountOfFloors: state.amountOfFloors,
            id: state.id,
            imageUrls: state.imageUrls,
            clubId: state.club && state.club.id,
            date,
            description: state.description,
            genreIds: state.genres ? state.genres.map(g => g.id) : undefined,
            link: state.link,
            minimumAge: state.minimumAge,
            name: state.name,
            priceCategory: state.priceCategory,
            special: state.special,
          },
        },
      })
    )
    const results = await Promise.all(mutations)
    const eventId = results[0].data.createEvent.event.id
    history.push(`/event/${eventId}`)
  }
  if (clubsQueryResult.error) return <NetworkError />
  if (genresQueryResult.error) return <NetworkError />
  return (
    <Page>
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        <H1Title>{t('createEvent')}</H1Title>
        <div className={cn}>
          <LabeledInput label={t('name')}>
            <Input
              data-cy="addminaddevent-name-input"
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
              <MultiSelectCalendar
                monthSelection={monthSelection}
                setMonthSelection={setMonthSelection}
                selectedDates={state.dates.map(d => moment(d))}
                setSelectedDates={dates =>
                  setState({
                    ...state,
                    dates: dates.map(d => d.toISOString()),
                  })
                }
              />
            </div>
          </LabeledInput>
          <LabeledInput label={t('club')}>
            <Select
              value={state.club ? state.club.id : ''}
              data-cy="adminaddevent-club-select"
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
              data-cy="adminaddevent-admissionfee-input"
              value={state.admissionFee || ''}
              min={0}
              type="number"
              onChange={e =>
                setState({
                  ...state,
                  admissionFee: parseFloat(e.target.value),
                })
              }
              step={0.01}
            />
          </LabeledInput>
          <LabeledInput label={t('admissionFeeWithDiscount')}>
            <Input
              data-cy="adminaddevent-admissionfeewithdiscount-input"
              value={state.admissionFeeWithDiscount || ''}
              min={0}
              type="number"
              onChange={e =>
                setState({
                  ...state,
                  admissionFeeWithDiscount: parseFloat(e.target.value),
                })
              }
              step={0.01}
            />
          </LabeledInput>
          <LabeledInput label={t('amountOfFloors')}>
            <Input
              data-cy="adminaddevent-amountoffloors-input"
              value={state.amountOfFloors || ''}
              min={0}
              type="number"
              onChange={e =>
                setState({
                  ...state,
                  amountOfFloors: parseInt(e.target.value, 10),
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('description')}>
            <Textarea
              data-cy="adminaddevent-description-input"
              width="20em"
              value={state.description || ''}
              onChange={e =>
                setState({
                  ...state,
                  description: e.target.value,
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('specials')}>
            <Textarea
              data-cy="adminaddevent-specials-input"
              width="20em"
              value={state.special || ''}
              onChange={e =>
                setState({
                  ...state,
                  special: e.target.value,
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('minimumAge')}>
            <Input
              data-cy="adminaddevent-minimumage-input"
              value={state.minimumAge || ''}
              min={0}
              type="number"
              onChange={e =>
                setState({
                  ...state,
                  minimumAge: parseInt(e.target.value, 10),
                })
              }
            />
          </LabeledInput>
          <LabeledInput label={t('priceCategory')}>
            <Select
              data-cy="adminaddevent-pricecategory-select"
              value={state.priceCategory || ''}
              onChange={e => {
                setState({
                  ...state,
                  priceCategory:
                    e.target.value === ''
                      ? undefined
                      : (parseInt(e.target.value, 10) as 1 | 2 | 3),
                })
              }}
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
              data-cy="adminaddevent-link-input"
              value={state.link || ''}
              onChange={e =>
                setState({
                  ...state,
                  link: e.target.value,
                })
              }
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
        <Button primary disabled={!canCreate} onClick={createEvent} data-cy="adminaddevent-create">
          {t('create')}
        </Button>
        <Button secondary onClick={() => history.push('/admin')}>
          {t('cancel')}
        </Button>
        <Spacer />
      </Content>
    </Page>
  )
}
