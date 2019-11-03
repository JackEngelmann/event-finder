import './GoBackButton.scss'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'button'>

const cn = 'go-back-button'

export function GoBackButton(props: Props) {
    return (
        <button className={cn} {...props}>
            {"<-"}
        </button>
    )
}