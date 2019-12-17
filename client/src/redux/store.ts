import { createStore } from 'redux'

const initialState = {
    showMobileMenu: false,
    showMobileCalendar: false,
}

export const store = createStore<ReduxState, ReduxAction, any, any>(rootReducer)

export type ReduxState = {
    showMobileMenu: boolean
    showMobileCalendar: boolean
}

export type ReduxAction =
    | {
          type: 'toggleMobilemMenu'
      }
    | {
          type: 'toggleMobileCalendar'
      }
    | {
          type: 'hideMobileCalendar'
      }

function rootReducer(state = initialState, action: ReduxAction) {
    if (action.type === 'toggleMobilemMenu') {
        return {
            ...state,
            showMobileMenu: !state.showMobileMenu,
        }
    }
    if (action.type === 'toggleMobileCalendar') {
        return {
            ...state,
            showMobileCalendar: !state.showMobileCalendar,
        }
    }
    if (action.type === 'hideMobileCalendar') {
        return {
            ...state,
            showMobileCalendar: false,
        }
    }
    return state
}
