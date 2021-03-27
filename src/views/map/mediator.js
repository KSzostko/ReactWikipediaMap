import { WikiApi } from '../../services/api/wiki';
import { useMapStore } from './store';
import * as events from '../../types/mapEvents';
import { getMobileWikiUrl } from '../../utils/getMobileWikiUrl';
import ArticlesStorage from '../../services/ArticlesStorage';

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
    { articles },
    {
      addArticles,
      setGoogleApiLoaded,
      setModalVisible,
      setWikiArticle,
      setIsLight,
    },
  ] = useMapStore();

  function mapArticlesMarked(articlesList) {
    ArticlesStorage.refresh();
    return articlesList.map(article => ({
      ...article,
      marked: ArticlesStorage.isArticleRead(article.title),
    }));
  }

  async function mapDragged(coord) {
    const data = await WikiApi.getArticles({ coord });

    const markedArticles = mapArticlesMarked(data.query.geosearch);
    addArticles(markedArticles);
  }

  function mapLoaded() {
    setGoogleApiLoaded(true);
  }

  async function markerClicked({ pageid, lat, lon }) {
    setModalVisible(true);

    const res = await WikiApi.getArticle(pageid);
    const article = res.query.pages[pageid];

    const mobileUrl = getMobileWikiUrl(article.fullurl);

    setWikiArticle({
      pageid,
      url: mobileUrl,
      title: article.title,
      lat,
      lng: lon,
    });
  }

  function modalClosed() {
    setModalVisible(false);
    setWikiArticle({});
  }

  function mapStyleChanged(value) {
    setIsLight(value);
  }

  function refreshArticlesOnMap() {
    const markedArticles = mapArticlesMarked(articles);
    addArticles(markedArticles);
  }

  function articleMarked(article) {
    if (!ArticlesStorage.isArticleRead(article.title)) {
      ArticlesStorage.setArticleAsRead(article);
    }
    ArticlesStorage.refresh();

    setModalVisible(false);

    refreshArticlesOnMap();
  }

  addListener(events.MAP_LOADED, mapLoaded);
  addListener(events.MAP_DRAGGED, mapDragged);
  addListener(events.MARKER_CLICKED, markerClicked);
  addListener(events.MODAL_CLOSED, modalClosed);
  addListener(events.MAP_STYLE_CHANGED, mapStyleChanged);
  addListener(events.ARTICLE_MARKED, articleMarked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
