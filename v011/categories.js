const movieCategories = ["剧情片", "动作片", "喜剧片", "科幻片", "恐怖片", "爱情片", "纪录片", "战争片", "悬疑片", "动画电影", "奇幻片", "犯罪片", "西部片", "武侠片", "警匪片"];
const musicCategories = ["流行音乐", "摇滚", "嘻哈", "古典音乐", "乡村音乐", "电子音乐", "节奏布鲁斯", "蓝调", "民谣", "影视原声", "舞曲"];
const novelCategories = ["现实主义小说", "科幻小说", "奇幻小说", "悬疑 / 推理小说", "爱情小说", "历史小说", "武侠小说", "恐怖 / 惊悚小说", "青春小说", "长篇小说", "中篇小说", "短篇小说"];
function renderCategories(list, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = list.map(c => `<a href="#" class="category-tag">${c}</a>`).join('');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderCategories(movieCategories, 'movie-category-list');
  renderCategories(musicCategories, 'music-category-list');
  renderCategories(novelCategories, 'novel-category-list');
});
