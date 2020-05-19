/* 
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as dept from './moudules/dept'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dict'
import * as log from './moudules/log'
import * as member from './moudules/member'
import * as active from './moudules/active'
import * as message from './moudules/message'
import * as system from './moudules/system'
import * as manage from './moudules/manage'
import * as common from './moudules/common'

// 默认全部导出
export default {
    login,
    user,
    dept,
    role,
    menu,
    dict,
    log,
    member,
    active,
    message,
    system,
    manage,
    common
}