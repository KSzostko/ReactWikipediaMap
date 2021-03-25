import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;

const store = createStore({
  initialState: {
    articles: [],
    isGoogleApiLoaded: false,
  },
  actions: {
    addArticles: articles => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.articles = articles;
        })
      );
    },
    setGoogleApiLoaded: value => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.isGoogleApiLoaded = value;
        })
      );
    },
  },
  name: 'articles',
});

export const useMapStore = createHook(store);
