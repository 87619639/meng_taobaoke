(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"34b9":function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return a})},4405:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"uni-badge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:String,default:""},size:{type:String,default:"normal"}},computed:{setClass:function(){var t=["uni-badge-"+this.type,"uni-badge--"+this.size];return!0===this.inverted&&t.push("uni-badge-inverted"),t.join(" ")}},methods:{onClick:function(){this.$emit("click")}}};e.default=u},"44d2":function(t,e,n){"use strict";n.r(e);var u=n("4405"),a=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);e["default"]=a.a},a998:function(t,e,n){},ad79:function(t,e,n){"use strict";var u=n("a998"),a=n.n(u);a.a},f14a:function(t,e,n){"use strict";n.r(e);var u=n("34b9"),a=n("44d2");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("ad79");var r=n("2877"),o=Object(r["a"])(a["default"],u["a"],u["b"],!1,null,null,null);e["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("f14a"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);                
