export default {
    state: {
        // 机构类型、
        groupID: 0,
    },
    mutations: {
        changeID(state, id) {
            state.groupID = id
        },
    }
}
