import React from 'react'
import { Button } from '../components/Button'
import './ComponentLibrary.scss'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Option } from '../components/Option'
import { LoadingIndicator } from '../components/LoadingIndicator'

// TODO: should probably not be available in production

const cn = 'component-library'

export function ComponentLibraryPage() {
    return (
        <div>
            <div className={`${cn}__spacer`}>
                <Button primary>Primary</Button>
            </div>
            <div className={`${cn}__spacer`}>
                <Button secondary>Secondary</Button>
            </div>
            <div className={`${cn}__spacer`}>
                <Button danger>Danger</Button>
            </div>
            <div className={`${cn}__spacer`}>
                <Input />
            </div>
            <div className={`${cn}__spacer`}>
                <Select>
                    <Option>1</Option>
                    <Option>2</Option>
                </Select>
            </div>
            <div className={`${cn}__spacer`}>
                <LoadingIndicator />
            </div>
        </div>
    )
}
