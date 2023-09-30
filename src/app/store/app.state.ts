import { User } from '../core/models/user.model';
import { Film } from '../core/models/film.model';

export interface AppState {
  user: User | null;
  films: Film[];
}

export const initialState: AppState = {
  user: null,
  films: [],
};
