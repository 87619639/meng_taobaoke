(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/index"],{4744:function(t,e,i){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(i("a34a")),s=i("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i,o,n,s,r){try{var a=t[s](r),c=a.value}catch(h){return void i(h)}a.done?e(c):Promise.resolve(c).then(o,n)}function c(t){return function(){var e=this,i=arguments;return new Promise(function(o,n){var s=t.apply(e,i);function r(t){a(s,o,n,r,c,"next",t)}function c(t){a(s,o,n,r,c,"throw",t)}r(void 0)})}}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},o=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),o.forEach(function(e){u(t,e,i[e])})}return t}function u(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var l=function(){return i.e("components/uni-drawer/uni-drawer").then(i.bind(null,"3aba"))},d=function(){return i.e("components/uni-floating-button/uni-floating-button").then(i.bind(null,"95ae"))},f=function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"28d6"))},p=function(){return i.e("components/uni-tag/uni-tag").then(i.bind(null,"2986"))},g={computed:h({},(0,s.mapGetters)("search",{goods:"goods"}),(0,s.mapGetters)("search",{hotSearchList:"searchs"})),components:{uniTag:p,uniLoadMore:f,uniDrawer:l,uniFloatingButton:d},data:function(){return{pullDownRefresh:!0,showFloatButton:!1,scrollTop:0,oldScrollTop:0,canFix:!0,startPrice:"",endPrice:"",showDrawer:!1,params:{},selectIndex:0,historyList:[],isHistory:!0,world:"",loadmoreStatue:"more",loadingText:{contentdown:"下拉加载更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},conditions:[{param:"score",name:"人气"},{param:"time",name:"最新"},{param:"sales_num",name:"销量"},{param:"price",name:"价格"},{param:"",name:"筛选"}]}},onLoad:function(){this.getData()},methods:{goodClick:function(e){var i={id:e.id,numm_id:e.goods_id};t.showLoading({title:"数据加载中..."}),this.$store.dispatch("good/GetGoodDetail",i).then(function(){t.hideLoading(),t.navigateTo({url:"/pages/good/detail?id="+e.id+"&nummId="+e.goods_id})}).catch(function(){t.hideLoading()})},closeDrawer:function(t){this.showDrawer=!1},loadMore:function(){console.log(o("loadMore"," at pages\\search\\index.vue:187")),this.params.page=this.goods.page+1,this.params.push=!0,this.loadmoreStatue="loading";var t=this;this.$store.dispatch("search/SearchGoods",this.params).then(function(){t.loadmoreStatue="more"}).catch(function(){t.loadmoreStatue="noMore"})},getData:function(){var e=c(n.default.mark(function e(){return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"数据加载中..."}),e.next=3,this.$store.dispatch("search/GetSearch");case 3:this.getLocalHistory(),t.hideLoading();case 5:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),clearSearch:function(){var e=this;t.showModal({title:"提示",content:"是否清理全部搜索历史？该操作不可逆。",success:function(t){t.confirm&&e.clearLocalHistory()}})},search:function(){var e=c(n.default.mark(function e(i){var o;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.selectIndex=0,!1!==this.isHistory||this.params.world!=i){e.next=3;break}return e.abrupt("return");case 3:t.showLoading({title:"数据加载中..."}),this.params["world"]=i,this.params["page"]=1,this.params["score"]=1,this.params["push"]=!0,o=this,this.$store.dispatch("search/SearchGoods",this.params).then(function(){t.hideLoading(),o.isHistory=!1,o.addLocalHistory(i),o.world=i,o.setSearchInputText(i)}).catch(function(){o.isHistory=!1,t.hideLoading()});case 10:case"end":return e.stop()}},e,this)}));function i(t){return e.apply(this,arguments)}return i}(),conditionClick:function(e){if(e!=this.conditions.length-1){this.selectIndex=e;var i=this.conditions[e],n={};n["world"]=this.world,n["page"]=1,n[i.param]=1==this.params[i.param]?2:1,n["push"]=!0,this.params=n,console.log(o(this.params," at pages\\search\\index.vue:265")),t.showLoading({title:"数据加载中..."}),this.$store.dispatch("search/SearchGoods",this.params).then(function(){t.hideLoading()}).catch(function(){t.hideLoading()}),this.gotTop()}else this.showDrawer=!0},getLocalHistory:function(){try{this.historyList=t.getStorageSync("search-history-list"),console.log(o(this.historyList," at pages\\search\\index.vue:282"))}catch(e){this.historyList=[]}},addLocalHistory:function(e){this.historyList.length>=20&&(this.historyList=this.historyList.slice(1));for(var i=[],o=0,n=this.historyList.length;o<n;o++){var s=this.historyList[o];s!=e&&i.push(s)}i.push(e),this.historyList=i,t.setStorageSync("search-history-list",this.historyList)},clearLocalHistory:function(){t.removeStorageSync("search-history-list"),this.historyList=[]},historyTagClick:function(t){var e=this.historyList[t];this.search(e),console.log(o(this.historyList[t]," at pages\\search\\index.vue:309"))},hotTagClick:function(t){var e=this.hotSearchList[t].world;this.search(e),console.log(o(this.hotSearchList[t]," at pages\\search\\index.vue:314"))},setSearchInputText:function(t){var e=this.$mp.page.$getAppWebview();e.setTitleNViewSearchInputText(t)},setSearchInputPlaceholder:function(t){},onKeyInput:function(t){},reset:function(){console.log(o(this.startPrice," at pages\\search\\index.vue:325")),console.log(o(this.endPrice," at pages\\search\\index.vue:326")),this.startPrice="",this.endPrice=""},fix:function(){var e=this;if(this.endPrice<this.startPrice)this.canFix=!1;else{this.canFix=!0;var i={};i["world"]=this.world,i["page"]=1,i["start_price"]=this.startPrice,i["end_price"]=this.endPrice,i["push"]=!0,this.params=i,t.showLoading({title:"数据加载中..."}),this.$store.dispatch("search/SearchGoods",this.params).then(function(){t.hideLoading(),e.showDrawer=!1}).catch(function(){t.hideLoading(),e.showDrawer=!0})}},scroll:function(t){0==t.detail.scrollTop?(this.pullDownRefresh=!0,this.disabledPullRefresh(!0)):(this.pullDownRefresh||this.disabledPullRefresh(!1),this.pullDownRefresh=!1),t.detail.scrollTop>1e3?this.showFloatButton=!0:this.showFloatButton=!1,this.oldScrollTop=t.detail.scrollTop},gotTop:function(){this.scrollTop=this.oldScrollTop,this.$nextTick(function(){this.scrollTop=0})}},onBackPress:function(t){return this.showDrawer?(this.showDrawer=!1,!0):!this.isHistory&&(this.isHistory=!0,!0)},onNavigationBarSearchInputChanged:function(t){this.world=t.text},onNavigationBarSearchInputConfirmed:function(t){this.search(t.text)},onNavigationBarButtonTap:function(){this.search(this.world)},onPullDownRefresh:function(){this.params.page=this.goods.page+1,this.params.push=!1;this.$store.dispatch("search/SearchGoods",this.params).then(function(){t.stopPullDownRefresh()}).catch(function(){t.stopPullDownRefresh()})}};e.default=g}).call(this,i("6e42")["default"],i("0de9")["default"])},"607b":function(t,e,i){"use strict";i.r(e);var o=i("84f6"),n=i("8773");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("63a3");var r=i("2877"),a=Object(r["a"])(n["default"],o["a"],o["b"],!1,null,null,null);e["default"]=a.exports},"63a3":function(t,e,i){"use strict";var o=i("96f9"),n=i.n(o);n.a},"84f6":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},8773:function(t,e,i){"use strict";i.r(e);var o=i("4744"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=n.a},"96f9":function(t,e,i){},b994:function(t,e,i){"use strict";(function(t){i("5d0c"),i("921b");o(i("66fd"));var e=o(i("607b"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])}},[["b994","common/runtime","common/vendor"]]]);