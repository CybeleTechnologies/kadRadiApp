import {combineReducers} from 'redux';
import * as recipesReducer from './incrementers.js';
import { routerReducer } from 'react-router-redux';

export default combineReducers(Object.assign(recipesReducer, routerReducer));
