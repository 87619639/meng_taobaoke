(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/center/index"],{"33d3":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},4062:function(t,n,e){"use strict";e.r(n);var o=e("33d3"),a=e("40f4");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("8a68");var c=e("2877"),s=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},"40f4":function(t,n,e){"use strict";e.r(n);var o=e("8967"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},8967:function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"5adf"))},i=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"8ac3"))},c={components:{uniList:a,uniListItem:i},data:function(){return{versionName:"v1.0.0",infofilled:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"guanyu"},download:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"gengxin"},share:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"fenxiang"},help:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"bangzhu"},chat:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"lianxikefu"},zuji:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"zuji"},setting:{fontclass:"text-icons",color:"#ff80ab",size:"22",type:"shezhi"}}},onLoad:function(){this.versionName="版本:"+this.$config.versionName},methods:{goLogin:function(){t.navigateTo({url:"/pages/center/login"})},goRegister:function(){t.navigateTo({url:"/pages/center/register"})},goAbout:function(){t.navigateTo({url:"/pages/about/about"})},click:function(n){switch(console.log(o(n," at pages\\center\\index.vue:103")),n){case 0:t.navigateTo({url:"/pages/center/footprint"});break;case 1:t.showModal({title:"联系客服",content:"QQ群:200910943"});break;case 4:this.checkVersion().catch(function(){t.showToast({title:"已经是最新",duration:1e3})});break;case 5:t.navigateTo({url:"/pages/center/about"});break;default:break}}},onNavigationBarButtonTap:function(){t.navigateTo({url:"/pages/center/setting"})}};n.default=c}).call(this,e("6e42")["default"],e("0de9")["default"])},"8a68":function(t,n,e){"use strict";var o=e("f7a4"),a=e.n(o);a.a},b4da:function(t,n,e){"use strict";(function(t){e("5d0c"),e("921b");o(e("66fd"));var n=o(e("4062"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},f7a4:function(t,n,e){}},[["b4da","common/runtime","common/vendor"]]]);