import React, { useState } from 'react'
import moment from 'moment';
import { useDimensions } from '../containers/useDimensions';
import { HomeDesktopContent } from '../containers/HomeDesktopContent';
import { HomeMobileContent } from '../containers/HomeMobileContent';

type Props = {}

const currentDate = moment()

export function HomePage(props: Props) {
  const dimensions = useDimensions()
  const [monthSelection, setMonthSelection] = useState(currentDate)
  const desktop = Boolean(dimensions.width && dimensions.width > 800);
  const commonProps = { monthSelection, setMonthSelection }
  return desktop ? <HomeDesktopContent {...commonProps} /> : <HomeMobileContent {...commonProps} />
}
