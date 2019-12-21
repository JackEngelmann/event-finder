import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Input } from '../Input/Input'
import './ImageUrlsInput.scss'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

type Props = {
    value?: string[] | undefined
    onChange: (value: string[] | undefined) => void
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
                value.map((imageUrl, index) => (
                    <div className={`${cn}__entry`} key={imageUrl}>
                        <Button
                            borderless
                            onClick={() =>
                                onChange(value!.filter((v, i) => i !== index))
                            }
                        >
                            <Icon icon="times" />
                        </Button>
                        <img src={imageUrl} />
                    </div>
                ))}
            <label htmlFor="image-url-input-input">
                {(!value || value.length === 0) && (
                    <span className={`${cn}__no-images`}>
                        No images selected.
                    </span>
                )}
                <Icon icon="plus" className={`${cn}__add-image`} />
            </label>
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
