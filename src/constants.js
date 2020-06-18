const AVITO = "avito",
  SEARCH = "search",
  LIMIT = "limit",
  CURRANT_PAGE = "currentPage",
  numberOfPages = 10,
  PER_PAGE = 10;
let arrayOfPages = [];
for (let i = 1; i <= numberOfPages; i++) {
  arrayOfPages.push(i);
}
export {
  AVITO,
  SEARCH,
  CURRANT_PAGE,
  LIMIT,
  numberOfPages,
  PER_PAGE,
  arrayOfPages,
};
