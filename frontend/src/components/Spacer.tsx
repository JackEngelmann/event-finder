import './Spacer.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'div'>

const cn = 'spacer'

export function Spacer(props: Props) {
    return <div {...props} className={classNames(cn, props.className)} />
}