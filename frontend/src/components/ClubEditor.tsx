import React from 'react'
import './ClubEditor.scss'
import { H1Title } from './H1Title'
import { LabeledInput } from './LabeledInput'

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
            <H1Title>
                <LabeledInput label="Name">
                    <input
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
            </H1Title>
            <LabeledInput label="Address">
                <input
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
                <input
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
                <textarea
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
                <input
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
                <input
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
                <input
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
                <input
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
