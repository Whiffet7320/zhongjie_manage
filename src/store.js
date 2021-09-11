import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 如师傅
    shopObj: null,
    zijinmingxiliebiaoPage: 1, //用户-资金余额明细列表
    zijinmingxiliebiaoPageSize: 10,
    yonghuguanliPage: 1, //用户列表
    yonghuguanliPageSize: 10,
    shifuliebiaoPage: 1, //用户-师傅列表
    shifuliebiaoPageSize: 10,
    shangpingliebiaoPage: 1, //商品列表
    shangpingliebiaoPageSize: 10,
    lunbotuliebiaoPage: 1, //轮播图列表
    lunbotuliebiaoPageSize: 10,
    wenzhangObj:null,
    qitashezhiliebiaoPage: 1, //其他设置列表
    qitashezhiliebiaoPageSize: 10,
    wenzhangliebiaoPage: 1, //文章列表
    wenzhangliebiaoPageSize: 10,
    chengshiliebiaoPage: 1, //城市列表
    chengshiliebiaoPageSize: 10,
    fankuiliebiaoPage: 1, //反馈意见列表
    fankuiliebiaoPageSize: 10,
    // 
    userInfo: null,
    headerTit: '',
    yunfeimubanliebiaoPage: 1, //运费模板
    yunfeimubanliebiaoPageSize: 10,
    shangpingpinglunPage: 1, //商品评论
    shangpingpinglunPageSize: 10,
    dingdanliebiaoPage: 1, //订单列表
    dingdanliebiaoPageSize: 10,
    pintuanShangpingliebiaoPage: 1, //拼团管理-拼团商品列表
    pintuanShangpingliebiaoPageSize: 10,
    pintuanShangpingliebiaoShopPage: 1, //拼团管理-拼团列表-添加商品
    pintuanShangpingliebiaoShopPageSize: 10,
    pintuanShopObj: null,
    maichanghuodongPage: 1, //卖场活动-活动列表
    maichanghuodongPageSize: 10,
    maichanghuodongShopPage: 1, //卖场活动-活动商品列表
    maichanghuodongShopPageSize: 10,
    maichanghuodongSeeShopPage: 1, //卖场活动-查看添加活动商品列表
    maichanghuodongSeeShopPageSize: 10,
    maichanghuodongnoAddSeeShopPage: 1, //卖场活动-查看商品列表
    maichanghuodongnoAddSeeShopPageSize: 10,
    pingtuanliebiaoPage: 1, //拼团管理-拼团分类列表
    pingtuanliebiaoPageSize: 10,
    lianghaoliebiaoPage: 1, //用户-靓号列表
    lianghaoliebiaoPageSize: 10,
    jishouliebiaoPage: 1, //寄售列表
    jishouliebiaoPageSize: 10,
    tixianliebiaoPage: 1, //提现列表
    tixianliebiaoPageSize: 10,
    pingtuanjiluPage: 1, //拼团记录
    pingtuanjiluPageSize: 10,
  },
  mutations: {
    // 如师傅
    wenzhangObj(state, str) {
      state.wenzhangObj = str;
    },
    zijinmingxiliebiaoPage(state, str) {
      state.zijinmingxiliebiaoPage = str;
    },
    zijinmingxiliebiaoPageSize(state, str) {
      state.zijinmingxiliebiaoPageSize = str;
    },
    yonghuguanliPage(state, str) {
      state.yonghuguanliPage = str;
    },
    yonghuguanliPageSize(state, str) {
      state.yonghuguanliPageSize = str;
    },
    shifuliebiaoPage(state, str) {
      state.shifuliebiaoPage = str;
    },
    shifuliebiaoPageSize(state, str) {
      state.shifuliebiaoPageSize = str;
    },
    shangpingliebiaoPage(state, str) {
      state.shangpingliebiaoPage = str;
    },
    shangpingliebiaoPageSize(state, str) {
      state.shangpingliebiaoPageSize = str;
    },
    wenzhangliebiaoPage(state, str) {
      state.wenzhangliebiaoPage = str;
    },
    wenzhangliebiaoPageSize(state, str) {
      state.wenzhangliebiaoPageSize = str;
    },
    qitashezhiliebiaoPage(state, str) {
      state.qitashezhiliebiaoPage = str;
    },
    qitashezhiliebiaoPageSize(state, str) {
      state.qitashezhiliebiaoPageSize = str;
    },
    chengshiliebiaoPage(state, str) {
      state.chengshiliebiaoPage = str;
    },
    chengshiliebiaoPageSize(state, str) {
      state.chengshiliebiaoPageSize = str;
    },
    fankuiliebiaoPage(state, str) {
      state.fankuiliebiaoPage = str;
    },
    fankuiliebiaoPageSize(state, str) {
      state.fankuiliebiaoPageSize = str;
    },
    // 
    userInfo(state, str) {
      state.userInfo = str;
    },
    headerTit(state, str) {
      state.headerTit = str;
    },
    dingdanliebiaoPage(state, str) {
      state.dingdanliebiaoPage = str;
    },
    dingdanliebiaoPageSize(state, str) {
      state.dingdanliebiaoPageSize = str;
    },
    shopObj(state, str) {
      state.shopObj = str;
    },
    pintuanShangpingliebiaoPage(state, str) {
      state.pintuanShangpingliebiaoPage = str;
    },
    pintuanShangpingliebiaoPageSize(state, str) {
      state.pintuanShangpingliebiaoPageSize = str;
    },
    pintuanShopObj(state, str) {
      state.pintuanShopObj = str;
    },
    maichanghuodongPage(state, str) {
      state.maichanghuodongPage = str;
    },
    maichanghuodongPageSize(state, str) {
      state.maichanghuodongPageSize = str;
    },
    maichanghuodongShopPage(state, str) {
      state.maichanghuodongShopPage = str;
    },
    maichanghuodongShopPageSize(state, str) {
      state.maichanghuodongShopPageSize = str;
    },
    maichanghuodongSeeShopPage(state, str) {
      state.maichanghuodongSeeShopPage = str;
    },
    maichanghuodongSeeShopPageSize(state, str) {
      state.maichanghuodongSeeShopPageSize = str;
    },
    pingtuanliebiaoPage(state, str) {
      state.pingtuanliebiaoPage = str;
    },
    pingtuanliebiaoPageSize(state, str) {
      state.pingtuanliebiaoPageSize = str;
    },
    lianghaoliebiaoPage(state, str) {
      state.lianghaoliebiaoPage = str;
    },
    lianghaoliebiaoPageSize(state, str) {
      state.lianghaoliebiaoPageSize = str;
    },
    shangpingpinglunPage(state, str) {
      state.shangpingpinglunPage = str;
    },
    shangpingpinglunPageSize(state, str) {
      state.shangpingpinglunPageSize = str;
    },
    pintuanShangpingliebiaoShopPage(state, str) {
      state.pintuanShangpingliebiaoShopPage = str;
    },
    pintuanShangpingliebiaoShopPageSize(state, str) {
      state.pintuanShangpingliebiaoShopPageSize = str;
    },
    maichanghuodongnoAddSeeShopPage(state, str) {
      state.maichanghuodongnoAddSeeShopPage = str;
    },
    maichanghuodongnoAddSeeShopPageSize(state, str) {
      state.maichanghuodongnoAddSeeShopPageSize = str;
    },
    jishouliebiaoPage(state, str) {
      state.jishouliebiaoPage = str;
    },
    jishouliebiaoPageSize(state, str) {
      state.jishouliebiaoPageSize = str;
    },
    yunfeimubanliebiaoPage(state, str) {
      state.yunfeimubanliebiaoPage = str;
    },
    yunfeimubanliebiaoPageSize(state, str) {
      state.yunfeimubanliebiaoPageSize = str;
    },
    tixianliebiaoPage(state, str) {
      state.tixianliebiaoPage = str;
    },
    tixianliebiaoPageSize(state, str) {
      state.tixianliebiaoPageSize = str;
    },
    lunbotuliebiaoPage(state, str) {
      state.lunbotuliebiaoPage = str;
    },
    lunbotuliebiaoPageSize(state, str) {
      state.lunbotuliebiaoPageSize = str;
    },
    pingtuanjiluPage(state, str) {
      state.pingtuanjiluPage = str;
    },
    pingtuanjiluPageSize(state, str) {
      state.pingtuanjiluPageSize = str;
    },
  },
  actions: {

  },
});