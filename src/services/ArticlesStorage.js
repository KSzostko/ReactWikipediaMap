const ARTICLES_KEY = 'articles';

function ArticlesDatabase() {
  /* eslint-disable */
  let articles = getArticles();
  /* eslint-enable */

  function getArticles() {
    try {
      const savedArticles = localStorage.getItem(ARTICLES_KEY);

      if (savedArticles) {
        return JSON.parse(savedArticles);
      }
      return [];
    } catch (e) {
      console.error('Error while reading articles from localStorage', e);
    }
  }

  function addArticle(title) {
    try {
      articles.push(title);
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error while adding article to localStorage', e);
    }
  }

  const api = {
    refresh() {
      articles = getArticles();
    },
    isArticleRead(title) {
      return articles.includes(title);
    },
    setArticleAsRead(title) {
      addArticle(title);
    },
  };
  return api;
}

export default ArticlesDatabase();
