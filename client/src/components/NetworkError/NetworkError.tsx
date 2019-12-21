import * as React from 'react'
import { contact } from '../../contact'
import './NetworkError.scss'

const cn = 'network-error'

export function NetworkError() {
    return (
        <div className={cn}>
            A problem with the network occured :(
            <br />
            Try reloading or contact us at {contact.email} when the error occurs
            multiple times.
        </div>
    )
}
