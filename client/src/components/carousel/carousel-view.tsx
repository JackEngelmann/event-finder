import React, { ReactNode, ComponentProps } from 'react'
import './carousel.scss'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'

type Props = {
    children: ReactNode
    next: () => void
    previous: () => void
} & ComponentProps<'div'>

const cn = 'carousel'

export function CarouselView(props: Props) {
    const { children, next, previous, className, ...divProps } = props
    return (
        <div className={classNames(className, cn)} {...divProps}>
            <div onClick={previous} className={`${cn}__arrow-left`}>
                <Icon icon="arrow-left" />
            </div>
            {children}
            <div onClick={next} className={`${cn}__arrow-right`}>
                <Icon icon="arrow-right" />
            </div>
        </div>
    )
}
