import './GoBackButton.scss'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'button'>

export function GoBackButton(props: Props) {
    return (
        <button className="go-back-button" {...props}>
            {"<-"}
        </button>
    )
}