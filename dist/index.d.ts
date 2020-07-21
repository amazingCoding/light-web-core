declare module 'light-web-core' {
  export interface Rect {
    width: number,
    height: number,
    x: number,
    y: number
  }
  export interface SuccessResponse<T> {
    data?: T,
    state: number
  }
  export interface ErrorResponse {
    errorMsg: string,
    state: number
  }
  export type SuccessCallBack<T> = (res: SuccessResponse<T>) => void
  export type ErrorCallBack = (res: ErrorResponse) => void

  export interface PageConfig {
    isHideNav: boolean,
    statusStyle: number,
    title: string
    titleColor: string,
    navBackgroundColor: string,
    backgroundColor: string,
    bounces: boolean,
    showCapsule: boolean,
  }
  export interface InitConfig extends PageConfig {
    global: string
  }
  export interface Info {
    isInApp: string,
    device: string,
    version: string,
  }
  export interface AppInfo {
    phoneName: string,
    system: string,
    systemVersion: string,
    screenWidth: number,
    screenHeight: number,
    statusBarHeight: number,
    capsule: Rect,
  }
  export interface RouterInfo {
    maxRouters: number,
    currentPos: number,
  }
  export interface VibrateConfig {
    isLong?: boolean,
  }
  export interface RouterConfig {
    action: number,
    extra?: any,
    name: string,
    pos?: number,
    isToRoot?: boolean,
  }
  export interface InitResponse {
    appInfo: AppInfo,
    routerInfo: RouterInfo,
    extra: any
  }
  export interface PageResponse {
    screenWidth: number,
    screenHeight: number,
  }
  export class LightWebCore {
    info: Info
    appInfo: AppInfo
    routerInfo: RouterInfo
    extra: any
    constructor(config: PageConfig, success: SuccessCallBack<InitResponse>, fail: ErrorCallBack)
    changePageConfig: (view: PageConfig, success: SuccessCallBack<PageResponse>, fail: ErrorCallBack) => void
    setClipboard: (text: string, success: SuccessCallBack<any>, fail: ErrorCallBack) => void
    getClipboard: (success: SuccessCallBack<string>, fail: ErrorCallBack) => void
    vibrate: (isLong: boolean, success: SuccessCallBack<any>, fail: ErrorCallBack) => void
    router: (action: RouterConfig, success: SuccessCallBack<any>, fail: ErrorCallBack) => void
  }
  export enum RouterActions {
    'push',
    'pop',
    'replace',
    'setPopExtra',
    'close',
    'restart'
  }
  export enum StyleTypes {
    light,
    dark
  }
  export enum BridgeEvents {
    active,
    backGround,
    show,
    hide,
    sceneMode
  }
}