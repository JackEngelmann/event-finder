import React, { useState } from 'react'
import { Button } from '../components/Button'
import './ComponentLibrary.scss'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Option } from '../components/Option'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { ImageUrlsInput } from '../components/ImageUrlsInput'

// TODO: should probably not be available in production

const cn = 'component-library'

export function ComponentLibraryPage() {
    const [imageUrls, setImageUrls] = useState<string[] | null>(null)
    return (
        <div className={cn}>
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
                <Button disabled primary>
                    Primary
                </Button>
            </div>
            <div className={`${cn}__spacer`}>
                <Button disabled secondary>
                    Secondary
                </Button>
            </div>
            <div className={`${cn}__spacer`}>
                <Button disabled danger>
                    Danger
                </Button>
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
            <div className={`${cn}__spacer`}>
                <ImageUrlsInput
                    value={imageUrls}
                    onChange={imageUrls => setImageUrls(imageUrls)}
                />
            </div>
        </div>
    )
}
