import React from 'react'
import { useHistory } from 'react-router-dom'
import { EditButtonView } from './EditButtonView'

type Props = {
  eventId: number
}

export function EditButtonContainer(props: Props) {
  const { eventId } = props
  const history = useHistory()
  const editEvent = () => history.push(`/admin/event/${eventId}`)
  return <EditButtonView onClick={editEvent} />
}
