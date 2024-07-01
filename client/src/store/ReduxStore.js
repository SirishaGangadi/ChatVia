import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import {thunk} from "redux-thunk"; // Ensure this import is correct
  import { reducers } from "../reducers/reducerindex";
  
  // Function to save state to local storage
  function saveToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem('store', serializedState);
    } catch (e) {
      console.error("Could not save state", e);
    }
  }
  
  // Function to load state from local storage
  function loadFromLocalStorage() {
    try {
      const serializedState = window.localStorage.getItem('store');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Could not load state", e);
      return undefined;
    }
  }
  
  // Safely check for Redux DevTools extension
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  
  const persistedState = loadFromLocalStorage();
  
  const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  // Subscribe to store updates and save state to local storage
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;
  