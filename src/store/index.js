import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import tab from './modules/tab'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'
import dialog from './modules/dialog'
import select from './modules/select'
import manage from './modules/manage'

const store = new vuex.Store({
    modules: {
        app: app,
        tab: tab,
        iframe: iframe,
        user: user,
        menu: menu,
        dialog: dialog,
        select: select,
        manage:manage
    }
})

export default store