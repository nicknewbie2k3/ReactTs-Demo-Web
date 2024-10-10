import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Album } from '../../../models/dashboard';

export interface DashboardState {
  listAlbum?: Album[];
}

export const setListAlbum = createCustomAction('dashboard/setListAlbum', (data: Album[]) => ({
  data,
}));


const actions = { setListAlbum };

type Action = ActionType<typeof actions>;

export default function dashboardReducer(state: DashboardState = {}, action: Action) {
  switch (action.type) {
    case getType(setListAlbum):
      return { ...state, listAlbum: action.data };
    default:
      return state;
  }
}
/*
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IAlbum} from '../../../models/album';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export interface DashboardState {
    [x: string]: any;
    album?: IAlbum[];
}

export const setListAlbums = createCustomAction('auth/setListAlbums', (data: IAlbum[]) => ({
    data,
}));

const actions = { setListAlbums };
type Action = ActionType<typeof actions>;
const store = createStore(reducer, applyMiddleware(thunk));

export default function reducer(state: DashboardState = {}, action: Action) {
    switch (action.type) {
        case getType(setListAlbums):
            return {
                ...state,
                album: action.data,
            };
        default:
            return state;
    }
}
*/