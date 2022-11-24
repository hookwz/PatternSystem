//在src文件夹下面建立store文件夹，在再store文件夹下面建立index.js
import Vue from "vue";
import Vuex from "vuex";

//修改state时在console打印，便于调式

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    upresult: [],
    downresult: [],
    cdObject: null,
    jzData: null,
    WuHou:null,
    ChengHua:null,
    QingYang:null,
    JingJiang:null,
    JinNiu:null
  },
  getters: {
    GetWuHou(state)
    {
       return state.WuHou
    },
    GetChengHua(state)
    {
      return state.ChengHua
    },
    GetQingYang(state)
    {
      return state.QingYang
    },
    GetJingJiang(state)
    {
      return state.JingJiang
    },
    GetJinNiu(state)
    {
      return state.JinNiu
    }
  },
  mutations: {
    Setupresult(state, newval) {
      state.upresult = newval;
    },
    Setdownresult(state, newval) {
      state.downresult = newval;
    },
    SetCdGeoJson(state, newval) {
      state.cdObject = newval;
    },
    SetJzData(state, newval) {
      state.jzData = newval;
    },
    SetWuHou(state,newval)
    {
       state.WuHou=newval  
    },
    SetChengHua(state,newval)
    {
       state.ChengHua=newval  
    },
    SetQingYang(state,newval)
    {
       state.QingYang=newval  
    },
    SetJingJiang(state,newval)
    {
       state.JingJiang=newval  
    },
    SetJinNiu(state,newval)
    {
       state.JinNiu=newval  
    }
  },
  actions: {}
});

export default store;
