const MOVIE_APIS = [
  { name: 'TMDb', url: `https://api.themoviedb.org/3/movie/popular?api_key=${EACO_CONFIG.tmdbKey}&page=1` },
  { name: 'OMDb', url: `https://www.omdbapi.com/?apikey=${EACO_CONFIG.omdbKey}&s=movie` },
  { name: 'Trakt', url: `https://api.trakt.tv/movies/popular?api_key=${EACO_CONFIG.traktKey}` },
  { name: 'TVMaze', url: `https://api.tvmaze.com/shows` },
  { name: 'Simkl', url: `https://api.simkl.com/movies/trending?client_id=${EACO_CONFIG.simklKey}` },
  { name: 'uNoGS', url: `https://unogsng.p.rapidapi.com/search?type=movie`, headers: { "X-RapidAPI-Key": EACO_CONFIG.unogsKey } },
  { name: 'Watchmode', url: `https://api.watchmode.com/v1/list-titles/?apiKey=${EACO_CONFIG.watchmodeKey}&types=movie` },
  { name: 'Dailymotion', url: `https://api.dailymotion.com/videos?fields=title,thumbnail_url,url` },
  { name: 'Shotstack', url: `https://api.shotstack.io/v1/movies` },
  { name: 'Open Movie Database', url: `https://www.omdbapi.com/?apikey=${EACO_CONFIG.omdbKey}&s=movie` }
];
const MUSIC_APIS = [
  { name: 'Spotify', url: `https://api.spotify.com/v1/browse/new-releases`, headers: { "Authorization": `Bearer ${EACO_CONFIG.spotifyToken}` } },
  { name: 'Deezer', url: `https://api.deezer.com/chart` },
  { name: 'SoundCloud', url: `https://api.soundcloud.com/tracks?client_id=${EACO_CONFIG.soundcloudKey}` },
  { name: 'Lastfm', url: `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${EACO_CONFIG.lastfmKey}&format=json` },
  { name: 'Mureka', url: `https://api.mureka.com/music/top` },
  { name: 'Uomg', url: `https://api.uomg.com/api/rand.music?format=json` },
  { name: 'VVHan', url: `https://v1.hitokoto.cn/?c=m` },
  { name: 'YYY001', url: `https://api.yyy001.com/music/top` },
  { name: '看戏仔', url: `https://api.kxizi.com/music/top` },
  { name: 'Free-API', url: `https://free-api.com/music/top` }
];
const NOVEL_APIS = [
  { name: 'Walkline', url: `https://api.walkline.cn/lite/novel/hot` },
  { name: 'APIOpen', url: `https://api.apioopen.com/novel/list?key=${EACO_CONFIG.apioopenKey}` },
  { name: '3ulu', url: `https://api.3ulu.com/novel/hot` },
  { name: '书迷阁', url: `https://api.shumige.com/novel/hot` },
  { name: '纵横中文网', url: `https://api.zongheng.com/novel/hot` },
  { name: '追书神器', url: `https://api.zhuishushenqi.com/book/hot` },
  { name: '笔趣阁', url: `https://api.biquge.com/novel/hot` },
  { name: '起点中文网', url: `https://api.qidian.com/novel/hot` },
  { name: 'Open Novel', url: `https://api.opennovel.com/novel/hot` },
  { name: 'CSDN合集', url: `https://api.csdn.net/novel/hot` }
];
function batchFetch(apiList, section, callback) {
  let batchIndex = 0;
  function doBatch() {
    const batch = apiList.slice(batchIndex * 5, batchIndex * 5 + 5);
    batch.forEach(api => {
      fetch(api.url, api.headers ? { headers: api.headers } : {})
        .then(r => r.json())
        .then(data => {
          if (callback) callback(api.name, data);
        })
        .catch(e => {
          const backup = apiList[5 + batch.indexOf(api)];
          if (backup) {
            fetch(backup.url, backup.headers ? { headers: backup.headers } : {})
              .then(r => r.json())
              .then(data => {
                if (callback) callback(backup.name, data);
              });
          }
        });
    });
    batchIndex = (batchIndex + 1) % 2;
  }
  doBatch();
  setInterval(doBatch, 10 * 60 * 1000);
}
batchFetch(MOVIE_APIS, 'movie', (name, data) => {});
batchFetch(MUSIC_APIS, 'music', (name, data) => {});
batchFetch(NOVEL_APIS, 'novel', (name, data) => {});
