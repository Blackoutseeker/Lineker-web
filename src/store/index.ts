import { createStore, combineReducers } from 'redux'
import Theme from './reducers/theme'

export interface IRootReducer {
  theme: string
}

const rootReducer = combineReducers<IRootReducer>({
  theme: Theme
})

const store = createStore(rootReducer)

export default store
