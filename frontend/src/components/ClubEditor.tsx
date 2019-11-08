import React from 'react'
import './ClubEditor.scss'
import { LabeledInput } from './LabeledInput'
import { Input } from './Input'
import { Textarea } from './Textarea'

export type ClubEditorState = {
    address?: string
    contact?: string
    description?: string
    email?: string
    id?: number
    link?: string
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
    const { state, setState } = props
    return (
        <div className={cn}>
            <LabeledInput label="Name">
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
            <LabeledInput label="Address">
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
            <LabeledInput label="Contact">
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
            <LabeledInput label="Description">
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
            <LabeledInput label="Email">
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
            <LabeledInput label="Link">
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
            <LabeledInput label="Region">
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
            <LabeledInput label="Specials">
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
        </div>
    )
}
