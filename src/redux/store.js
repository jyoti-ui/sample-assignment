import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import UserListReducer from "./slices/users.slice"
import PostsReducer from "./slices/posts.slice"
import CountriesReducer from "./slices/countries.slice"

const rootReducer = combineReducers({
    users: UserListReducer, 
    posts: PostsReducer,
    countries : CountriesReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));