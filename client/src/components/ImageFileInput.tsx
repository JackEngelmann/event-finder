import React from 'react'
import { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

type Props = {
    imageUrl: string | undefined
    onChange: (file: File | undefined) => void
}

export function ImageFileInput(props: Props) {
    const { imageUrl, onChange } = props
    const [editExistingImage, setEditExistingImage] = useState(false) // TODO: not component anymore?
    if (imageUrl && !editExistingImage) {
        return (
            <span>
                assigned{' '}
                <Button onClick={() => setEditExistingImage(true)}>Edit</Button>
            </span>
        )
    }
    return (
        <Input
            type="file"
            onChange={e =>
                onChange(e.target.files ? e.target.files[0] : undefined)
            }
        />
    )
}
