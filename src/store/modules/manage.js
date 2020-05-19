export default {
  state: {
    passVal: {
      type: '', // 操作类型          
      number: '', // 流水号
      dataType: '', // 流水类型
      taskId: '', // 流水id
      companyId: '', // 公司id
      title:'' // 当前流程名称
    },
    processId: null
  },
  getters: {

  },
  mutations: {
    setPassVal(state, data) { // 流水操作
      state.passVal = data;
    },
    setDataType(state, dataType) { // 流水操作
      state.dataType = dataType;
    },
    setProcessIde(state, id) { //流程图id
      state.processId = id;
    },
  },
  actions: {}
}
