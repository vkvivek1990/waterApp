import { createStore, combineReducers } from 'redux';
import emForm  from './form'
import emDetail  from './grid'

const rootReducer = combineReducers({
    emForm,
    emDetail
});

const store = createStore(rootReducer);

export  default store