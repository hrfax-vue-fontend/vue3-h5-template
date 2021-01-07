/*
 * @Author: your name
 * @Date: 2020-12-17 11:40:12
 * @LastEditTime: 2020-12-28 11:35:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole';
import { Form, Field, Cell, CellGroup, Popup, RadioGroup, Radio, DatetimePicker, Uploader, ImagePreview, Icon, NavBar, Button } from 'vant'

// 全局引入vant样式
import 'vant/lib/index.css'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

declare const WeixinJSBridge: any;
// 微信环境，安卓调整字体大小
(function() {
  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
     handleFontSize();
   } else {
     document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
   }
   function handleFontSize() {
     // 设置网页字体为默认大小
     WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
     // 重写设置网页字体大小的事件
     WeixinJSBridge.on('menu:setfont', function() {
       WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
     });
   }
})();

//开发环境增加 vconsole 显示
if(process.env.NODE_ENV === 'development'){
  new VConsole();
}

const app = createApp(App) // 创建实例

app.use(Form).use(Field).use(Cell).use(CellGroup).use(Popup).use(RadioGroup).use(Radio).use(DatetimePicker).use(Uploader).use(ImagePreview).use(Icon).use(NavBar).use(Button)
app.use(store).use(router).mount('#app')
