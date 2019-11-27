import './Content.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react'
import { FooterContainer } from '../containers/FooterContainer'
import { MobileMenuContainer } from '../containers/MobileMenuContainer'

type Props = ComponentProps<'div'> & {
    scrollable?: boolean
    restrictMaxWidth?: boolean
}

const cn = 'content'

export function Content(props: Props) {
    const { restrictMaxWidth, scrollable, children, ...divProps } = props
    return (
        <div
            className={classNames(cn, scrollable && `${cn}--scrollable`)}
            {...divProps}
        >
            <MobileMenuContainer />
            {restrictMaxWidth ? (
                <div className={`${cn}__scrollable-content`}>
                    <div className={`${cn}__max-width-wrapper`}>
                        {children}
                    </div>
                    <FooterContainer />
                </div>
            ) : (
                <div className={`${cn}__scrollable-content`}>
                    {children}
                    <FooterContainer />
                </div>
            )}
        </div>
    )
}
