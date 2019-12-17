import './Logo.scss'
import React, { ComponentProps } from 'react'
import classNames from 'classnames'

type Props = ComponentProps<'div'>

const cn = 'logo'

export function Logo(props: Props) {
    return (
        <div {...props} className={classNames(cn, props.className)}>
            LP
        </div>
    )
}
