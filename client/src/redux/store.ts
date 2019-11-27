import { createStore } from 'redux'

export const store = createStore<ReduxState, ReduxAction, any, any>(rootReducer)

export type ReduxState = {
    showMobileMenu: boolean
}

export type ReduxAction = {
    type: 'toggleMobilemMenu'
}

function rootReducer(state = { showMobileMenu: false }, action: ReduxAction) {
    if (action.type === 'toggleMobilemMenu') {
        return {
            ...state,
            showMobileMenu: !state.showMobileMenu,
        }
    }
    return state
}

