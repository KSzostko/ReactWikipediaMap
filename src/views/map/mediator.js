import { WikiApi } from '../../services/api/wiki';
import { useMapStore } from './store';
import * as events from '../../types/mapEvents';
import { getMobileWikiUrl } from '../../utils/getMobileWikiUrl';

const listeners = {};

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

  function mapLoaded() {
    setGoogleApiLoaded(true);
  }

  async function markerClicked(pageid) {
    setModalVisible(true);

    const res = await WikiApi.getArticle(pageid);
    const article = res.query.pages[pageid];
    setWikiArticleTitle(article.title);

    const mobileUrl = getMobileWikiUrl(article.fullurl);
    setWikiArticleUrl(mobileUrl);
  }

  function modalClosed() {
    setModalVisible(false);
    setWikiArticleTitle('');
    setWikiArticleUrl('');
  }

  addListener(events.MAP_LOADED, mapLoaded);
  addListener(events.MAP_DRAGGED, mapDragged);
  addListener(events.MARKER_CLICKED, markerClicked);
  addListener(events.MODAL_CLOSED, modalClosed);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
