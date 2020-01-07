import './KeyValueField.scss'
import React, { ReactNode, ComponentProps } from 'react'

type Props = {
  fieldKey: string
  fieldValue: ReactNode | string | undefined
} & ComponentProps<'div'>

const cn = 'key-value-field'

export function KeyValueField(props: Props) {
  const { fieldKey, fieldValue, ...divProps } = props
  if (!fieldValue) return null
  return (
    <div className={cn} {...divProps}>
      <div className={`${cn}__value`} data-cy="keyvaluefield-value">
        {fieldValue}
      </div>
      <div className={`${cn}__key`} data-cy="keyvaluefield-key">
        {fieldKey}
      </div>
    </div>
  )
}
