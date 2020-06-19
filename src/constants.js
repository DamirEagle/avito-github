const AVITO = "avito",
  SEARCH = "SEARCH",
  CURRANT_PAGE = "CURRANT_PAGE",
  PER_PAGE = 10,
  NUMBER_OF_PAGES = 10,
  LIMIT_APP = "LIMITAPP",
  LIMIT_MODAL = "LIMIT_MODAL",
  DATE_MODAL = "DATE_MODAL",
  X_RATELIMIT_REMAIING = "x-ratelimit-remaining",
  X_RATELIMIT_RESET = "x-ratelimit-reset";

let arrayOfPages = [];
for (let i = 1; i <= NUMBER_OF_PAGES; i++) {
  arrayOfPages.push(i);
}
export {
  AVITO,
  SEARCH,
  CURRANT_PAGE,
  PER_PAGE,
  NUMBER_OF_PAGES,
  LIMIT_APP,
  LIMIT_MODAL,
  DATE_MODAL,
  X_RATELIMIT_REMAIING,
  X_RATELIMIT_RESET,
  arrayOfPages,
};
