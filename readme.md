## 概念
通过把开发的 web 端 文件打包成 zip 包，下载到 native 层去执行。
以单例类为中心实现 `core` 内容，继承添加 **方法** 为扩展（ UI，HTTP，file ）

## core 功能实现: 九个方法，五个事件
* Bridge Function
  * init
  * page config
  * vibrate
  * Clipboard
  * Local Router System
    * push
    * pop
    * replace
    * setPopExtra
    * restart
* Event Function
  * app show
  * app background
  * view show
  * view hidden
  * sceneMode

## 实现
  * `Bridge Function` 通过 `js Bridge native` 方法去实现，而记录递增 ID 作为回调 ID，native 通过 exec JS 方法从而消耗（可不消耗） ID —— 执行回调。
  * Event Function 则是 js 通过 sub 执行的 Event。等待 native 层 exec puh JS 方法来执行 sub 的 方法。（sub 时候 会 return unSub 方法，执行即可解除 sub）。 其中 sub function 内部实现依靠 key & 递增 ID 作为依据保存 function  
  以上方法都应该尽量避免在 **回调中** 使用外层数据减少内存消耗。

## 约束
每个方法和参数都可以是随意的，但为了方便，在 core 里面的 exec 和 sub 的参数都带上约束
```javascript
const conf = {
  isHideNav: false,
  statusStyle:ThemeTypes.light,
  title: 'demo',
  titleColor: '#ffffff',
  navBackgroundColor: '#000000',
  backgroundColor: '#f1f1f1',
  bounces: true,
  showCapsule:false,
}
const success = (res)=>{
  // 标准返回值下 state = 0
  const {data,state} = res
}
const fail = (err)=>{
  // 标准返回值下 state ！= 0
  const {errorMsg,state} = err
}
// LightWebCore 为单例，多次 new 获取的实例都是一样的。而且和 native 互通的 init 方法只在第一次 new 时候执行
const lightWeb = new LightWebCore(conf,(res)=>{
  // 标准返回值下
  const {data,state} = res
  // native 返回的三个信息
  console.log(lightWeb.appInfo) 
  console.log(lightWeb.routerInfo)
  console.log(lightWeb.extra)
},fail)

// 修改页面配置
lightWeb.changePageConfig(conf,(res)=>{
  const {data,state} = res
  // native 返回的信息
  console.log(lightWeb.appInfo) 
},fail)
```


### router & sub event 
1. `push` & `replace` 操作，A 页面带数据给 B 页面。在 B 页面的 init 回调可以获取
2. `pop` 操作，B 页面带数据给 A 页面。在 A 页面的 onShow 回调可以获取
2. `pop` 操作有 API 操作 和 nav back button 操作。前者可以由 API 中设置 Extra。而后者只能通过 `setPopExtra` 来设置

## 试用
1. 下载 PC 端调试工具：[light-web-electron](https://github.com/amazingCoding/light-web-electron)
2. 下载 开发 demo : [light-web-demo](https://github.com/amazingCoding/light-web-demo)
3. 下载 该仓库代码
4. 把 demo 代码中的 `package.json` 中的 `"light-web-core": "file:../light-web"` 改成本地路径
5. 运行 light-web-electron 和 light-web-demo 即可。
