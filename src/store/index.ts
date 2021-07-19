import { createStore, combineReducers } from 'redux'
import Theme from './ducks/theme'

interface Reducers {
  theme: boolean
}

const rootReducer = combineReducers<Reducers>({
  theme: Theme
})

const store = createStore(rootReducer)

export type StoreState = ReturnType<typeof store.getState>

export default store
