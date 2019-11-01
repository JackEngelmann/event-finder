import './SelectedDate.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react'
import { Moment } from 'moment';

type Props = ComponentProps<'div'> & { date: Moment }

const cn = "selected-date"

export function SelectedDate(props: Props) {
    const { date, ...divProps } = props;
    return (
      <div className={classNames(cn, props.onClick && `${cn}--clickable`)} {...divProps}>
        {date.format('D. MMMM')}
      </div>
    )
}