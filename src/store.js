import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers/index";

export function configureStore() {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	return createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(reduxThunk))
	);
	// return createStore(
	// 	rootReducer,
	// 	applyMiddleware(reduxThunk),
	// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// );
}

export const store = configureStore();
