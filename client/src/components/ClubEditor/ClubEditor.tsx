import React from 'react'
import './ClubEditor.scss'
import { LabeledInput } from '../LabeledInput/LabeledInput'
import { Input } from '../Input/Input'
import { Textarea } from '../TextArea/Textarea'
import { ImageUrlsInput } from '../ImageUrlsInput/ImageUrlsInput'
import { useTranslation } from 'react-i18next'

export type ClubEditorState = {
    address?: string
    contact?: string
    description?: string
    email?: string
    id?: number
    link?: string
    imageUrls?: string[]
    name?: string
    region?: string
    specials?: string
}

type Props = {
    state: ClubEditorState
    setState(state: ClubEditorState): void
}

const cn = 'club-editor'

export function ClubEditor(props: Props) {
  const { t } = useTranslation()
    const { state, setState } = props
    return (
        <div className={cn}>
            <LabeledInput label={t('name')}>
                <Input
                    placeholder="name"
                    value={state.name || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            name: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('adress')}>
                <Input
                    value={state.address || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            address: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('contact')}>
                <Input
                    value={state.contact || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            contact: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('description')}>
                <Textarea
                    width="20em"
                    value={state.description || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            description: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('email')}>
                <Input
                    value={state.email || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            email: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('link')}>
                <Input
                    value={state.link || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            link: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('region')}>
                <Input
                    value={state.region || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            region: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('specials')}>
                <Input
                    value={state.specials || ''}
                    onChange={e =>
                        setState({
                            ...state,
                            specials: e.target.value,
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label={t('images')}>
                <ImageUrlsInput
                    value={state.imageUrls}
                    onChange={imageUrls => setState({ ...state, imageUrls })}
                />
            </LabeledInput>
        </div>
    )
}
