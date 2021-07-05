import { createStore, combineReducers } from 'redux'
import Theme from './reducers/theme'

export interface Reducers {
  theme: boolean
}

const rootReducer = combineReducers<Reducers>({
  theme: Theme
})

const store = createStore(rootReducer)

export default store
