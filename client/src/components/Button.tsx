import './Button.scss'
import React from 'react'
import classNames from 'classnames'
import { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {
    primary?: boolean
    secondary?: boolean
    danger?: boolean
    borderless?: boolean
}

const cn = 'button'

export function Button(props: Props) {
    const {
        className,
        primary,
        secondary,
        danger,
        borderless,
        ...restProps
    } = props
    return (
        <button
            {...restProps}
            className={classNames(cn, className, {
                [`${cn}--primary`]: primary,
                [`${cn}--secondary`]: secondary,
                [`${cn}--danger`]: danger,
                [`${cn}--borderless`]: borderless,
            })}
        />
    )
}
