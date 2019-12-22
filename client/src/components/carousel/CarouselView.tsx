import React, { ReactNode, ComponentProps } from 'react'
import './Carousel.scss'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'

type Props = {
    children: ReactNode
    next: () => void
    previous: () => void
    showArrows: boolean
} & ComponentProps<'div'>

const cn = 'carousel'

export function CarouselView(props: Props) {
    const {
        children,
        next,
        previous,
        className,
        showArrows,
        ...divProps
    } = props
    return (
        <div className={classNames(className, cn)} {...divProps}>
            {showArrows && (
                <div
                    onClick={previous}
                    className={`${cn}__overlay ${cn}__overlay--left`}
                >
                    <div className={`${cn}__icon-background`}>
                        <Icon icon="arrow-left" />
                    </div>
                </div>
            )}
            {children}
            {showArrows && (
                <div
                    onClick={next}
                    className={`${cn}__overlay ${cn}__overlay--right`}
                >
                    <div className={`${cn}__icon-background`}>
                        <Icon icon="arrow-right" />
                    </div>
                </div>
            )}
        </div>
    )
}
