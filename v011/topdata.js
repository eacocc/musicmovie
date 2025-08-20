document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${EACO_CONFIG.tmdbKey}&language=zh-CN&page=1`)
    .then(r => r.json()).then(data => {});
  fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${EACO_CONFIG.lastfmKey}&format=json`)
    .then(r => r.json()).then(data => {});
  fetch(`https://www.googleapis.com/books/v1/volumes?q=bestseller&langRestrict=zh&maxResults=30`)
    .then(r => r.json()).then(data => {});
});
