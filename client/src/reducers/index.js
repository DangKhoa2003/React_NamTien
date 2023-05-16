import { combineReducers } from 'redux';

import products from './products';
import admin from './admin';
import banners from './banners';
import posts from './post';
import companies from './company';
import videos from './video';
import cartReducer from './cart';

export default combineReducers({ products, admin, banners, posts, companies, videos, cartReducer });
