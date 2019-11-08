import './Option.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'option'>

const cn = 'option'

export function Option(props: Props) {
    const { className } = props;
    return (
        <option {...props} className={classNames(cn, className)} />
    )
}