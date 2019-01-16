import Vue from 'vue';
import Wxcontent from '@/components/baseymz/Wxcontent';     //引入组件
let WxcontentConstructor  = Vue.extend(Wxcontent) // 返回一个“扩展实例构造器”

let wxContent = ()=>{
    let wxContentDom = new WxcontentConstructor({
        el:document.createElement('div')
    })
    document.body.appendChild( wxContentDom.$el )
}
export default wxContent;