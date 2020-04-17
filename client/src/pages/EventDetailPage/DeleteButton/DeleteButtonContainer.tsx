import React from 'react'
import { DeleteButtonView } from './DeleteButtonView'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

type Props = {
  eventId: number
}

const DELETE_EVENT_MUTATION = gql`
  mutation AdminDeleteEvent($id: Int!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

export function DeleteButtonContainer(props: Props) {
  const { eventId } = props
  const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION)
  const history = useHistory()

  async function deleteEvent() {
    const isSure = window.confirm('Sure?')
    if (!isSure) return
    await deleteEventMutation({
      variables: { id: eventId },
    })
    history.push('/')
  }

  return <DeleteButtonView onClick={deleteEvent} />
}
