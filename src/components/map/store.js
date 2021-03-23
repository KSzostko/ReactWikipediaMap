import { createStore, createHook, defaults } from 'react-sweet-state';

defaults.devtools = true;

const store = createStore({
  initialState: {
    articles: [],
  },
  actions: {
    addArticles: articles => ({ setState }) => {
      setState({
        articles,
      });
    },
  },
  name: 'articles',
});

export const useArticles = createHook(store);
