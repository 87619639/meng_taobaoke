(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"0c6f":function(t,e,n){},"5c57":function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return i})},"770b":function(t,e,n){"use strict";n.r(e);var u=n("ca14"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=i.a},"9f4c":function(t,e,n){"use strict";n.r(e);var u=n("5c57"),i=n("770b");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("d787");var r=n("2877"),c=Object(r["a"])(i["default"],u["a"],u["b"],!1,null,null,null);e["default"]=c.exports},ca14:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"uni-badge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:String,default:""},size:{type:String,default:"normal"}},computed:{setClass:function(){var t=["uni-badge-"+this.type,"uni-badge--"+this.size];return!0===this.inverted&&t.push("uni-badge-inverted"),t.join(" ")}},methods:{onClick:function(){this.$emit("click")}}};e.default=u},d787:function(t,e,n){"use strict";var u=n("0c6f"),i=n.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("9f4c"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);                
