const MOST_STARRED = "stars%3A>0",
  SEARCH = "SEARCH",
  CURRANT_PAGE = "CURRANT_PAGE",
  PER_PAGE = 10,
  NUMBER_OF_PAGES = 10,
  LIMIT_APP = "LIMITAPP",
  LIMIT_MODAL = "LIMIT_MODAL",
  DATE_MODAL = "DATE_MODAL",
  X_RATELIMIT_REMAINING = "x-ratelimit-remaining",
  X_RATELIMIT_RESET = "x-ratelimit-reset";

let arrayOfPages = [];
for (let i = 1; i <= NUMBER_OF_PAGES; i++) {
  arrayOfPages.push(i);
}
export {
  MOST_STARRED,
  SEARCH,
  CURRANT_PAGE,
  PER_PAGE,
  NUMBER_OF_PAGES,
  LIMIT_APP,
  LIMIT_MODAL,
  DATE_MODAL,
  X_RATELIMIT_REMAINING,
  X_RATELIMIT_RESET,
  arrayOfPages,
};
