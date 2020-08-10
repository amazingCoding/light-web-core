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
  export type EventCallBack = (res: any) => void
  export type EventRemove = () => void

  export interface PageConfig {
    isHideNav?: boolean,
    statusStyle?: ThemeTypes,
    theme?: ThemeConfig,
    title?: string
    titleColor?: string,
    navBackgroundColor?: string,
    backgroundColor?: string,
    bounces?: boolean,
    showCapsule?: boolean,
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
    webWidth: number,
    webHeight: number,
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
  export interface RouterPushConfig {
    name: string,
    extra?: any,
  }
  export interface RouterPopConfig {
    isToRoot?: boolean,
    pos?: number,
    extra?: any,
  }
  export interface RouterReplaceConfig {
    name: string,
    pos?: number,
    extra?: any,
  }
  export interface RouterPopExtraConfig {
    extra: any,
  }

  export interface InitResponse {
    appInfo: AppInfo,
    routerInfo: RouterInfo,
    currentTheme: ThemeTypes,
    extra: any
  }
  export interface PageResponse {
    webWidth: number,
    webHeight: number,
    currentTheme: ThemeTypes
  }
  export class LightWebCore {
    info: Info
    currentTheme: ThemeTypes
    themeConfig: ThemeConfig
    appInfo: AppInfo
    routerInfo: RouterInfo
    extra: any
    constructor(config: PageConfig, success: SuccessCallBack<InitResponse>, fail: ErrorCallBack)
    sub: (key: BridgeEvents, fn: EventCallBack) => EventRemove
    changePageConfig: (view: PageConfig, success: SuccessCallBack<PageResponse>, fail: ErrorCallBack) => void
    setClipboard: (text: string, success: SuccessCallBack<any>, fail: ErrorCallBack) => void
    getClipboard: (success: SuccessCallBack<string>, fail: ErrorCallBack) => void
    vibrate: (isLong: boolean, success: SuccessCallBack<any>, fail: ErrorCallBack) => void
    push: (config: RouterPushConfig, success: SuccessCallBack<boolean>, fail: ErrorCallBack) => void
    pop: (config: RouterPopConfig, fail: ErrorCallBack) => void
    replace: (config: RouterReplaceConfig, fail: ErrorCallBack) => void
    setPopExtra: (config: RouterPopExtraConfig, success: SuccessCallBack<boolean>, fail: ErrorCallBack) => void
    restart: (fail: ErrorCallBack) => void
  }
  export enum ThemeTypes {
    light,
    dark
  }
  export enum ThemeConfig {
    auto,
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