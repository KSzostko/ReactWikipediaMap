import { WikiApi } from '../../services/api/wiki';
import { useMapStore } from './store';
import * as events from '../../types/mapEvents';

const listeners = {};
let map;

export function emit(e, ...args) {
  const listener = listeners[e];
  listener(...args);
}

function addListener(e, listener) {
  listeners[e] = listener;
}

function useMapMediator() {
  const [
    ,
    {
      addArticles,
      setGoogleApiLoaded,
      setModalVisible,
      setWikiArticleTitle,
      setWikiArticleUrl,
    },
  ] = useMapStore();

  async function mapDragged(coord) {
    const data = await WikiApi.getArticles({ coord });

    addArticles(data.query.geosearch);
  }

  function mapLoaded(mapInstance) {
    map = mapInstance;

    setGoogleApiLoaded(true);
  }

  async function markeClicked(pageid) {
    setModalVisible(true);

    const res = await WikiApi.getArticle(pageid);
    const article = res.query.pages[pageid];
    setWikiArticleTitle(article.title);
    setWikiArticleUrl(article.fullurl);
  }

  addListener(events.MAP_LOADED, mapLoaded);
  addListener(events.MAP_DRAGGED, mapDragged);
  addListener(events.MARKER_CLICKED, markeClicked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
