const prefix = 'lightWeb_'
export const BridgeMethods = {
  init: prefix + 'init',
  pageConfig: prefix + 'page_config',
  router: prefix + 'router_config',
  vibrate: prefix + 'vibrate',
  setClipboard: prefix + 'set_clipboard',
  getClipboard: prefix + 'get_clipboard',
}
export const BridgeEvents = {
  'active': prefix + 'appActive',
  'backGround': prefix + 'appBackGround',
  'show': prefix + 'viewShow',
  'hide': prefix + 'viewHide',
  'sceneMode': prefix + 'sceneMode'
}
export const RouterActions = {
  'push': 0,
  'pop': 1,
  'replace': 2,
  'setPopExtra': 3,
  'restart': 4,
}

export const ThemeTypes = {
  'light': 0,
  'dark': 1
}
export const ThemeConfig = {
  'light': 0,
  'dark': 1,
  'auto': 2,
}