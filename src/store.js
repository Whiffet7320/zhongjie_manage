import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 校园帮帮
    biaobaiqiangPage: 1, //表白墙列表
    biaobaiqiangPageSize: 10,
    jishiShougouPage: 1, //集市-收购列表
    jishiShougouPageSize: 10,
    jishizhuanmaiPage: 1, //集市-转卖列表
    jishizhuanmaiPageSize: 10,
    shudongPage: 1, //树洞列表
    shudongPageSize: 10,
    headerTit: '',
    fengjingPage: 1, //风景列表
    fengjingPageSize: 10,
    baoxiuPage: 1, //报修列表
    baoxiuPageSize: 10,
    xunwuPage: 1, //寻物列表
    xunwuPageSize: 10,
    xunzhuPage: 1, //寻主列表
    xunzhuPageSize: 10,
    pindanPage: 1, //拼单列表
    pindanPageSize: 10,
    pinchePage: 1, //拼车列表
    pinchePageSize: 10,
    biaobaiqiangPinglunPage: 1, //表白墙-评论列表
    biaobaiqiangPinglunPageSize: 10,
    wenzhangPage: 1, //文章列表
    wenzhangPageSize: 10,
    wenzhangObj:null,
  },
  mutations: {
    headerTit(state, str) {
      state.headerTit = str;
    },
    biaobaiqiangPage(state, str) {
      state.biaobaiqiangPage = str;
    },
    biaobaiqiangPageSize(state, str) {
      state.biaobaiqiangPageSize = str;
    },
    jishiShougouPage(state, str) {
      state.jishiShougouPage = str;
    },
    jishiShougouPageSize(state, str) {
      state.jishiShougouPageSize = str;
    },
    jishizhuanmaiPage(state, str) {
      state.jishizhuanmaiPage = str;
    },
    jishizhuanmaiPageSize(state, str) {
      state.jishizhuanmaiPageSize = str;
    },
    shudongPage(state, str) {
      state.shudongPage = str;
    },
    shudongPageSize(state, str) {
      state.shudongPageSize = str;
    },
    fengjingPage(state, str) {
      state.fengjingPage = str;
    },
    fengjingPageSize(state, str) {
      state.fengjingPageSize = str;
    },
    baoxiuPage(state, str) {
      state.baoxiuPage = str;
    },
    baoxiuPageSize(state, str) {
      state.baoxiuPageSize = str;
    },
    xunwuPage(state, str) {
      state.xunwuPage = str;
    },
    xunwuPageSize(state, str) {
      state.xunwuPageSize = str;
    },
    xunzhuPage(state, str) {
      state.xunzhuPage = str;
    },
    xunzhuPageSize(state, str) {
      state.xunzhuPageSize = str;
    },
    pindanPage(state, str) {
      state.pindanPage = str;
    },
    pindanPageSize(state, str) {
      state.pindanPageSize = str;
    },
    pinchePage(state, str) {
      state.pinchePage = str;
    },
    pinchePageSize(state, str) {
      state.pinchePageSize = str;
    },
    biaobaiqiangPinglunPage(state, str) {
      state.biaobaiqiangPinglunPage = str;
    },
    biaobaiqiangPinglunPageSize(state, str) {
      state.biaobaiqiangPinglunPageSize = str;
    },
    wenzhangPage(state, str) {
      state.wenzhangPage = str;
    },
    wenzhangPageSize(state, str) {
      state.wenzhangPageSize = str;
    },
    wenzhangObj(state, str) {
      state.wenzhangObj = str;
    },
  },
  actions: {

  },
});