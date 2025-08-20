const MEMBER_TYPES = [
  { name: '收听收看者', desc: '免费浏览基本数据，付费会员可获取完整内容' },
  { name: '创作者', desc: '上传原创视频、音乐作品，获得收益分成' },
  { name: '审核会员', desc: '审核内容质量，获得审核奖励' },
  { name: '义工', desc: '为社区提供志愿服务，获得生态奖励' }
];
const REVENUE_SPLIT = {
  uploader: 55,
  platform: 25,
  review: 10,
  charity: 5,
  reserve: 5
};
