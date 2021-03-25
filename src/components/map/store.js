import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;

const defaultCenter = {
  lat: 53.11,
  lng: 23.14,
};

const store = createStore({
  initialState: {
    articles: [],
    isGoogleApiLoaded: false,
    mapCenter: defaultCenter,
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
    setMapCenter: coords => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.mapCenter = coords;
        })
      );
    },
  },
  name: 'articles',
});

export const useMapStore = createHook(store);
