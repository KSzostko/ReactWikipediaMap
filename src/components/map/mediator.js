import { WikiApi } from '../../services/api/wiki';
import { useMapStore } from './store';
import * as events from './eventTypes';

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
  const [, { addArticles, setGoogleApiLoaded }] = useMapStore();

  async function mapDragged(coord) {
    const data = await WikiApi.getArticles({ coord });

    addArticles(data.query.geosearch);
  }

  function mapLoaded(mapInstance) {
    map = mapInstance;

    setGoogleApiLoaded(true);
  }

  addListener(events.MAP_LOADED, mapLoaded);
  addListener(events.MAP_DRAGGED, mapDragged);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
