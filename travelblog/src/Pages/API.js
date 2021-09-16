// false for local
// true for heroku
const production = false;
export const API_PATH = production === false ? "http://localhost:8000/" : 'https://protected-scrubland-37279.herokuapp.com/';