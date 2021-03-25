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
    isModalVisible: false,
    wikiArticleTitle: '',
    wikiArticleUrl: '',
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
    setModalVisible: value => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.isModalVisible = value;
        })
      );
    },
    setWikiArticleTitle: value => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.wikiArticleTitle = value;
        })
      );
    },
    setWikiArticleUrl: value => ({ setState, getState }) => {
      setState(
        produce(getState(), drafState => {
          drafState.wikiArticleUrl = value;
        })
      );
    },
  },
  name: 'articles',
});

export const useMapStore = createHook(store);
