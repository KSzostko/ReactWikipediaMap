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

  function addArticle(article) {
    try {
      articles.push(article);
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error while adding article to localStorage', e);
    }
  }

  const api = {
    getReadArticles() {
      return articles;
    },
    refresh() {
      articles = getArticles();
    },
    isArticleRead(title) {
      return articles.findIndex(article => article.title === title) !== -1;
    },
    setArticleAsRead(article) {
      addArticle(article);
    },
  };
  return api;
}

export default ArticlesDatabase();
