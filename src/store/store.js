import {createStore} from 'redux';
import reducers  from '../reducers/reducers.js';

let store = createStore(reducers);

export default store;
