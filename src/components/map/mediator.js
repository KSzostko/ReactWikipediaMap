import { WikiApi } from '../../services/api/wiki';
import { useArticles } from './store';
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
  const [, actions] = useArticles();

  async function mapDragged(coord) {
    const data = await WikiApi.getArticles({ coord });

    actions.addArticles(data.query.geosearch);
  }

  addListener(events.MAP_DRAGGED, mapDragged);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
