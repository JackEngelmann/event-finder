import './LinksInput.scss'
import * as R from 'ramda'
import React from 'react'
import { Icon } from '../Icon/Icon'
import { Select } from '../Select/Select'
import { Option } from '../Option/Option'
import { Input } from '../Input/Input'
import { Spacer } from '../Layouting/Spacer'

type Link = { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }
type Props = {
  value: Link[]
  onChange: (links: Link[]) => void
}

const cn = 'links-input'

export function LinksInput(props: Props) {
  const { value, onChange } = props
  return (
    <div>
      {value.map((link, linkIndex) => {
        function changeLink(link: Link) {
          onChange(R.adjust(linkIndex, () => link, value))
        }
        return (
          <div className={`${cn}__entry`}>
            <Select
              value={link.type}
              onChange={(e) =>
                changeLink({
                  ...link,
                  type: e.target.value as 'FACEBOOK' | 'HOMEPAGE',
                })
              }
              width="8em"
            >
              <Option value="FACEBOOK">Facebook</Option>
              <Option value="HOMEPAGE">Homepage</Option>
            </Select>
            <Spacer marginRight={3} />
            <Input
              width="10em"
              value={link.href}
              onChange={(e) =>
                changeLink({
                  ...link,
                  href: e.target.value,
                })
              }
            />
            <Spacer marginRight={3} />
            <Spacer
              padding={3}
              onClick={() => onChange(R.remove(linkIndex, 1, value))}
            >
              <Icon icon="times" />
            </Spacer>
          </div>
        )
      })}
      <div
        onClick={() => {
          console.log('onClick')
          onChange([...value, { href: '', type: 'FACEBOOK' }])
        }}
      >
        <Icon icon="plus" />
      </div>
    </div>
  )
}
