export default {
    state: {
        resetDialog: false,
        edit: false,
        msgMask: false,
        memberMask: false,
        passMonitor: false,
        isSubmit:false,
        isCancel:false
    },
    getters: {

    },
    mutations: {
        showResetDialog(state) {
            state.resetDialog = true
        },
        hideResetDialog(state) {
            state.resetDialog = false
        },
        openEdit(state) {
            state.edit = true
        },
        submitAll(state,flag){
           state.isSubmit=flag
        },
        closeEdit(state) {
            state.edit = false
           
        },
        cancelSave(state,flag){
            state.isCancel=flag
        },
        openMsgMask(state) {
            state.msgMask = true
        },
        closeMsgMask(state) {
            state.msgMask = false
        },
        openMemberMask(state) {
            state.memberMask = true
        },
        closeMemberMask(state) {
            state.memberMask = false
        },
        openMonitor(state) {
            state.passMonitor = true
        },
        closeMonitor(state) {
            state.passMonitor = false
        }
    },
    actions: {
    }
}