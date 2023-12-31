// imports
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ThunkMiddleware from 'redux-thunk'
import reducer from "./reducers/reducer";
import userReducer from './reducers/userReducer';
import offersReducer from './reducers/offersReducer';
import navBarSlice from './slices/navBarSlice';
import formPetEditSlice from './slices/formPetEditSlice';
// combinaed Reducers
const rootReducerCombined = combineReducers({
  reducer: reducer,
  userReducer: userReducer,
  offersReducer: offersReducer,
  navBarReducer: navBarSlice, // rename the assignment reducer name
  formPetEditReducer: formPetEditSlice,
});

// configured store
const store = configureStore({
reducer: rootReducerCombined,
middleware: [ThunkMiddleware],
});

export default store