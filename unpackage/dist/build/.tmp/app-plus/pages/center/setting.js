(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/center/setting"],{3241:function(t,n,e){"use strict";(function(t,c){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"5adf"))},i=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"8ac3"))},o={components:{uniList:u,uniListItem:i},data:function(){return{clean:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"clean"}}},methods:{click:function(n){switch(console.log(t(n," at pages\\center\\setting.vue:25")),n){case 0:c.showModal({title:"提示",content:"是否清除缓存？",success:function(t){if(t.confirm)try{c.clearStorageSync(),c.showToast({title:"清除成功",duration:1e3})}catch(n){c.showToast({title:"清除失败请稍后重试",duration:1e3})}}});break;default:break}}}};n.default=o}).call(this,e("0de9")["default"],e("6e42")["default"])},3610:function(t,n,e){"use strict";e.r(n);var c=e("d695"),u=e("46cb");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("d38f");var o=e("2877"),a=Object(o["a"])(u["default"],c["a"],c["b"],!1,null,null,null);n["default"]=a.exports},"46cb":function(t,n,e){"use strict";e.r(n);var c=e("3241"),u=e.n(c);for(var i in c)"default"!==i&&function(t){e.d(n,t,function(){return c[t]})}(i);n["default"]=u.a},"5de4":function(t,n,e){"use strict";(function(t){e("5d0c"),e("921b");c(e("66fd"));var n=c(e("3610"));function c(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"7ce3":function(t,n,e){},d38f:function(t,n,e){"use strict";var c=e("7ce3"),u=e.n(c);u.a},d695:function(t,n,e){"use strict";var c=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return c}),e.d(n,"b",function(){return u})}},[["5de4","common/runtime","common/vendor"]]]);