import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Input } from './Input'
import './ImageUrlsInput.scss'

type Props = {
    value?: string[] | null
    onChange: (value: string[] | null) => void
}

const UPLOAD_IMAGE_MUTATION = gql`
    mutation uploadImage($input: UploadImageInput!) {
        uploadImage(input: $input) {
            imageUrl
        }
    }
`

const cn = 'image-urls-input'

export function ImageUrlsInput(props: Props) {
    const { value, onChange } = props
    const [uploadImageMutation] = useMutation(UPLOAD_IMAGE_MUTATION)
    const [isLoading, setIsLoading] = useState(false)
    console.log(value)

    async function uploadImages(files: FileList) {
        setIsLoading(true)
        console.log(files)
        const uploadPromises = Array.from(files).map(file =>
            uploadImageMutation({
                variables: {
                    input: {
                        upload: file,
                    },
                },
            })
        )
        const mutationResults = await Promise.all(uploadPromises)
        const imageUrls = mutationResults.map(i => i.data.uploadImage.imageUrl)
        setIsLoading(false)
        onChange([...(value || []), ...imageUrls])
    }

    return (
        <div className={cn}>
            {value &&
                value.map(imageUrl => (
                    <div>
                        <img src={imageUrl} />
                    </div>
                ))}
            <label htmlFor="image-url-input-input">+</label>
            <Input
                id="image-url-input-input"
                type="file"
                disabled={isLoading}
                onChange={e => {
                    const files = e.target.files
                    if (!files) return
                    uploadImages(files)
                }}
            />
        </div>
    )
}
