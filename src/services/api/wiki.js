import ky from 'ky';

const client = ky.create({ prefixUrl: 'https://en.wikipedia.org/w/' });

export const WikiApi = {
  getArticles({ coord, radius = 10000, limit = 10 } = {}) {
    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      origin: '*',
    };

    if (!coord) {
      console.error('Wikipedia API: no coord passed to getArticles');
    }

    return client
      .get(`api.php?`, {
        searchParams: {
          ...params,
          gscoord: `${coord.lat}|${coord.lng}`,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },

  getArticle(pageid) {
    const params = {
      action: 'query',
      format: 'json',
      pageids: pageid,
      prop: 'info',
      inprop: 'url',
      origin: '*',
    };

    if (!pageid) {
      console.error('Wikipedia API: no pageid passed to getArticle');
    }

    return client
      .get(`api.php?`, {
        searchParams: {
          ...params,
        },
      })
      .json();
  },
};
