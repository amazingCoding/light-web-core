import { getEnvInfo, objectDelKey, minObject } from "./helper"
import { BridgeMethods, RouterActions, ThemeConfig } from './config'
let shareInstance = null
export class LightWebCore {
  info = null
  appInfo = null
  routerInfo = null
  extra = null
  currentTheme = null
  themeConfig = null
  callBackCollection = {}
  listenEvent = {}
  callBackID = 0
  /**
   * 初始化: 单例模式
   */
  constructor(config, success, fail) {
    if (shareInstance != null) return shareInstance
    this.info = getEnvInfo()
    this.themeConfig = config.theme === undefined ? ThemeConfig.auto : config.theme
    const globalName = new Date().getTime().toString()
    if (globalName) {
      window[globalName] = this
      shareInstance = this
      // 载入配置，通知 native 一切已经 OK 。可以展示 webview 层
      this.addCallBack({
        name: BridgeMethods.init,
        value: { ...config, global: globalName },
        success: (res) => {
          if (res && res.data) {
            const { data } = res
            if (data.appInfo) this.appInfo = data.appInfo
            if (data.routerInfo) this.routerInfo = data.routerInfo
            if (data.extra) this.extra = data.extra ? JSON.parse(data.extra) : null
            if (data.currentTheme !== undefined) this.currentTheme = data.currentTheme
          }
          success(res)
        },
        fail
      })
    }
  }
  changePageConfig(view, success, fail) {
    if (view.theme !== undefined) this.themeConfig = view.theme
    this.addCallBack({
      name: BridgeMethods.pageConfig,
      value: { ...view },
      success: (res) => {
        if (res && res.data) {
          const { webWidth, webHeight, currentTheme } = res.data
          this.appInfo.webWidth = webWidth
          this.appInfo.webHeight = webHeight
          this.currentTheme = currentTheme
        }
        success(res)
      },
      fail
    })
  }
  setClipboard(text, success, fail) {
    this.addCallBack({
      name: BridgeMethods.setClipboard,
      value: { text },
      success, fail
    })
  }
  getClipboard(success, fail) {
    this.addCallBack({
      name: BridgeMethods.getClipboard,
      value: null,
      success, fail
    })
  }
  vibrate(isLong, success, fail) {
    this.addCallBack({
      name: BridgeMethods.vibrate,
      value: { isLong: isLong === undefined ? true : isLong },
      success, fail
    })
  }
  push(config, success, fail) {
    this.addCallBack({
      name: BridgeMethods.router,
      value: { ...config, action: RouterActions.push },
      success, fail
    })
  }
  pop(config, fail) {
    this.addCallBack({
      name: BridgeMethods.router,
      value: { ...config, action: RouterActions.pop },
      success: null, fail
    })
  }
  replace(config, fail) {
    this.addCallBack({
      name: BridgeMethods.router,
      value: { ...config, action: RouterActions.replace },
      success: null, fail
    })
  }
  setPopExtra(config, success, fail) {
    this.addCallBack({
      name: BridgeMethods.router,
      value: { ...config, action: RouterActions.setPopExtra },
      success, fail
    })
  }
  restart(fail) {
    this.addCallBack({
      name: BridgeMethods.router,
      value: { action: RouterActions.restart },
      success: null, fail
    })
  }
  // 注册事件监听 return unSub 方法
  sub(key, fn) {
    this.callBackID += 1
    const id = this.callBackID.toString()
    if (!this.listenEvent.hasOwnProperty(key)) { this.listenEvent[key] = {} }
    this.listenEvent[key][id] = fn
    return () => {
      if (this.listenEvent.hasOwnProperty(key)) this.listenEvent[key] = objectDelKey(id, this.listenEvent[key])
    }
  }
  // 删除指定 key 的所有 sub 事件
  removeSubKey(key) {
    if (this.listenEvent.hasOwnProperty(key)) this.listenEvent[key] = null
  }
  // native 调用 —— 事件推送
  pub(key, res) {
    if (this.listenEvent.hasOwnProperty(key)) {
      const callBackCollection = this.listenEvent[key]
      for (const id in callBackCollection) {
        if (callBackCollection.hasOwnProperty(id)) {
          const jsonRes = {
            data: res.data ? JSON.parse(res.data) : null,
            state: res.state
          }
          callBackCollection[id](jsonRes, null, false)
        }
      }
    }
  }
  // native 调用 ——  回调执行
  exec(id, res, err, isAlive = false) {
    if (this.callBackCollection[id] && id > 0) {
      const func = this.callBackCollection[id]
      func(id.toString(), res, err, isAlive)
    }
  }
  // 添加回调
  addCallBack({ name, value, success, fail }) {
    if (this.info == null) return null
    let cid = 0
    if (success || fail) {
      this.callBackID += 1
      cid = this.callBackID.toString()
      this.callBackCollection[cid] = (id, result, err, isAlive) => {
        if (result && success) success(result)
        if (err && fail) fail(err)
        // 执行完，根据 alive 判断是否消除 回调函数
        if (!isAlive && id != null && this.callBackCollection[id]) this.callBackCollection = objectDelKey(id, this.callBackCollection)
      }
    }
    this.navtiveFunc(name, value, cid)
  }
  // 执行 接口函数
  navtiveFunc(name, value, id) {
    const data = minObject(value)
    try {
      switch (this.info.device) {
        case 'ios':
          window.webkit.messageHandlers[name].postMessage({ data, id })
          break
        case 'android':
          AndroidNative.postMessage(JSON.stringify({ name, data: { data, id } }))
          break
        case 'dev':
          window.require("electron").ipcRenderer.send("nativeEvent", JSON.stringify({ webCode: window.WEBCODE, name, data: { data, id } }))
          break
        default:
          console.log('==== name ====')
          console.log(name)
          console.log('==== data ====')
          console.log(data)
          console.log('==== id ====')
          console.log(id)
          console.log('==== End ====')
          break
      }
    }
    catch (error) { console.log(error) }
  }
}
export { BridgeEvents, ThemeTypes, RouterActions, ThemeConfig } from './config'