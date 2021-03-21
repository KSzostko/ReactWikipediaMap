import { WikiApi } from '../../services/api/wiki';
import * as events from './eventTypes';

const listeners = {};

export function emit(e, ...args) {
  const listener = listeners[e];
  listener(...args);
}

function addListener(e, listener) {
  listeners[e] = listener;
}

function useMapMediator() {
  async function mapDragged(coord) {
    const articles = await WikiApi.getArticles({ coord });
    console.log('mapDraggedEvent was called');
    console.log(articles.query.geosearch);
  }

  addListener(events.MAP_DRAGGED, mapDragged);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
