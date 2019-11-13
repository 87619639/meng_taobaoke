<template>
	<view class="uni-tab-bar">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		<!-- 标题栏和状态栏占位符 -->
		<view class="titleNview-placing"></view>
		<!-- 优化使用nvue 实现  分类 -->
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab, index) in tabs" :key="index" class="swiper-tab-list" :class="{ active: tabIndex == index }" :id="'tab_' + tab.id" @click="tapTab(tab, index)">
				{{ tab.name }}
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper :current="tabIndex" class="swiper-box touch-action-none" skip-hidden-item-layout="true" :duration="300" @change="changeTab">
			<swiper-item v-for="(good, index) in goods" :key="index">
				<scroll-view
					class="good-list touch-action-none"
					:scroll-top="scrollTop"
					@scroll="scroll"
					scroll-y
					@scrolltolower="loadMore(good.cid)"
				>
				
					<!-- 头部轮播 -->
					<view class="carousel-section">

						<swiper class="carousel" circular @change="swiperChange">
							<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
								<image :src="item.src" />
							</swiper-item>
						</swiper>
						<!-- 自定义swiper指示器 -->
						<view class="swiper-dots">
							<text class="num">{{swiperCurrent+1}}</text>
							<text class="sign">/</text>
							<text class="num">{{swiperLength}}</text>
						</view>
					</view>
				
					<view v-if="good.cid == 0">
						<uni-swiper-dot v-if="banners.length > 0">
							<swiper class="banner-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item v-for="(banner, index) in banners" :key="index">
									<view class="banner-swiper-item"><image :src="banner.image" lazy-load mode="aspectFill" @click="bannerClick(banner)" /></view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
						<view class="grid-list"><uni-grid :options="activitys" :show-border="false" columnNum="4" @click="actClick"></uni-grid></view>
						<view class="active-title-image"><image :src="index_1.image" lazy-load mode="aspectFill" @click="bannerClick(index_1)"></image></view>
					</view>
					<view class="cate-grid-list" v-if="good.cid > 0">
						<uni-grid :options="gcategorys[index].sub_categorys" :show-border="false" columnNum="5" @click="tagClick"></uni-grid>
					</view>
					<block v-for="(g, idx) in good.data" :key="idx">
						<view class="uni-index-list-cell">
							<view class="uni-good-list" @click="goodClick(g)">
								<image class="uni-good-list-logo" lazy-load :src="g.main_pic"></image>
								<view class="uni-good-list-body">
									<view class="uni-good-list-text-top">{{ g.dtitle }}</view>
									<view class="uni-good-list-text-bottom">
										<text v-if="g.istmall" class="good-price-favour">天猫价￥{{ g.original_price }}</text>
										<text v-else class="good-price-favour">淘宝价￥{{ g.original_price }}</text>
										<text class="good-sell-number">已售{{ g.sales_num }}件</text>
									</view>
									<view class="uni-good-list-text-bottom">
										<text class="good-price">券后￥{{ g.price }}</text>
										<text class="good-quan">￥{{ g.coupon_price }}元券</text>
									</view>
								</view>
							</view>
						</view>
					</block>
					<uni-load-more :status="loadmoreStatue" :contentText="loadingText"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-floating-button :visible="showFloatButton" @click="gotTop()"></uni-floating-button>
	</view>
</template>

<script>
import uniFloatingButton from '@/components/uni-floating-button/uni-floating-button.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import { mapGetters } from 'vuex';
import { paseNum } from '@/common/util';

export default {
	components: {
		uniGrid,
		uniLoadMore,
		uniSwiperDot,
		uniFloatingButton
	},
	computed: {
		...mapGetters('category', {
			categorys: 'categorys'
		}),
		...mapGetters('category', {
			gcategorys: 'gcategorys'
		}),
		...mapGetters('good', {
			goods: 'goods'
		}),
		...mapGetters('banner', {
			banners: 'banners'
		}),
		...mapGetters('banner', {
			index_1: 'index_1'
		}),
		...mapGetters('activity', {
			activitys: 'activitys'
		})
	},
	onLoad: function(options) {
		this.getData();
	},

	data() {
		return {
			pullDownRefresh:true,
			tabs: [],
			showFloatButton: false,
			scrollTop: 0,
			oldScrollTop: 0,
			isClickChange: false,
			scrollLeft: 0,
			tabIndex: 0,
			loadmoreStatue: 'more',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			loadingText: {
				contentdown: '下拉加载更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			
			carouselList:[],
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0
		};
	},
	methods: {
		
		async loadMore(cid) {
			let item = this.goods[cid];
			let page = item.page + 1;
			this.loadmoreStatue = 'loading';
			this.$store
				.dispatch('good/GetGoods', { cid: cid, page: page, push: true })
				.then(() => {
					this.loadmoreStatue = 'more';
				})
				.catch(() => {
					this.loadmoreStatue = 'noMore';
				});
		},
		async getData() {
			//轮播图数据
			let carouselList = await this.$api.json('carouselList');
			this.titleNViewBackground = carouselList[0].background;
			this.swiperLength = carouselList.length;
			this.carouselList = carouselList;
			
			console.log(this.carouselList)
			
			uni.showLoading({
				title: '数据加载中...'
			});
			this.tabIndex = 0;
			if (this.categorys.length == 1) {
				await this.$store.dispatch('category/GetCategory');
				this.tabs = this.categorys;
			}
			await this.$store.dispatch('banner/GetBanner');
			await this.$store.dispatch('activity/GetActivity', {});
			await this.$store.dispatch('good/InitGoods', this.tabs);
			await this.$store.dispatch('good/GetGoods', { cid: 0, page: 1 });
			this.gotTop();
			// console.log(this.tabs)
			uni.hideLoading();
		},
		
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		
		async changeTab(e) {
			//TODO 切换做预加载
			let index = e.target.current;
			this.loadmoreStatue = 'loading';

			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabbar = await this.getElSize('tab-bar'),
				tabBarScrollLeft = tabbar.scrollLeft;
			let width = 0;
			for (let i = 0; i < index; i++) {
				let result = await this.getElSize('tab_' + this.tabs[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = await this.getElSize('tab_' + this.tabs[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index;

			let cid = this.categorys[this.tabIndex].id;
			if (this.goods[cid].data.length === 0) {
				uni.showLoading({
					title: '数据加载中...'
				});
				await this.$store.dispatch('good/GetGoods', { cid: cid, page: 1 });
				uni.hideLoading();
			}
			if (this.tabIndex > 0) {
				this.subCategorys = this.tabs[this.tabIndex].sub_categorys.map(item => {
					return {
						id: item.id,
						image: item.icon,
						text: item.name
					};
				});
			}
		},
		goodClick(g) {
			let params = {
				id: g.id,
				numm_id: g.goods_id
			};
			uni.showLoading({
				title: '数据加载中...'
			});
			this.$store
				.dispatch('good/GetGoodDetail', params)
				.then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/good/detail?id=' + g.id + '&nummId=' + g.goods_id
					});
				})
				.catch(() => {
					//TODO
					uni.hideLoading();
				});
		},
		getElSize(id) {
			//得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},
		async tapTab(tab, index) {
			if (this.tabIndex === index) {
				return false;
			} else {
				let tabBar = await this.getElSize('tab-bar'),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = index;

				if (this.goods[tab.id].data.length == 0) {
					uni.showLoading({
						title: '数据加载中...'
					});
					await this.$store.dispatch('good/GetGoods', { cid: tab.id, page: 1 });
					uni.hideLoading();
				}
				if (this.tabIndex > 0) {
					this.subCategorys = this.tabs[this.tabIndex].sub_categorys.map(item => {
						return {
							id: item.id,
							image: item.icon,
							text: item.name
						};
					});
				}
			}
		},
		actClick(e) {
			let act = this.activitys[e.index];
			const id = act.id;
			const name = act.text;
			uni.showLoading({
				title: '数据加载中...'
			});
			let params = {
				cid: 0,
				scid: 0,
				score: 1,
				page: 1,
				id: id
			};
			this.$store
				.dispatch('good/GetActGoods', params)
				.then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/activity/index?id=' + id + '&name=' + name
					});
				})
				.catch(() => {
					uni.hideLoading();
				});
		},
		bannerClick(banner) {
			if (banner.url != '') {
				if (banner.url.indexOf('https://') == 0) {
					// #ifdef APP-PLUS
					let link = banner.url;
					link = link.replace('https', 'taobao');

					plus.runtime.openURL(link, function(res) {
						uni.navigateTo({
							url: '/pages/web/index?url=' + escape(banner.url)
						});
					});

					// #endif
					// #ifdef H5
					uni.navigateTo({
						url: '/pages/web/index?url=' + escape(banner.url)
					});
					// #endif
				} else {
					uni.navigateTo({
						url: banner.url
					});
				}
			} else if (banner.activity_type > 0) {
				uni.navigateTo({
					url: '/pages/activity/index?id=' + banner.activity_type
				});
			}
		},
		scroll(e) {
			if(e.detail.scrollTop == 0){
				this.pullDownRefresh = true;
				this.disabledPullRefresh(true);
			}else{
				//保证只设置一次
				if(!this.pullDownRefresh){
					this.disabledPullRefresh(false);
				}
				this.pullDownRefresh = false;
			}
			
			this.disabledPullRefresh(e.detail.scrollTop == 0);
			
			if (e.detail.scrollTop > 1000) {
				this.showFloatButton = true;
			} else {
				this.showFloatButton = false;
			}
			this.oldScrollTop = e.detail.scrollTop;
		},
		gotTop() {
			this.scrollTop = this.oldScrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		},
		tagClick(e) {
			let cate = this.gcategorys[this.tabIndex];
			let scate = cate.sub_categorys[e.index];
			uni.showLoading({
				title: '数据加载中...'
			});
			this.params = {
				cid: cate.id,
				scid: scate.id,
				score: 1,
				page: 1,
				id: 0
			};
			this.$store
				.dispatch('good/GetActGoods', this.params)
				.then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/activity/index?id=0&name=' + scate.text + '&scid=' + scate.id + '&cid=' + cate.id
					});
				})
				.catch(() => {
					uni.hideLoading();
				});
		}
	},

	/**
	 * 当 searchInput 配置 disabled 为 true 时触发
	 */
	onNavigationBarSearchInputClicked(e) {
		console.log('事件执行了');
		uni.navigateTo({
			url: '/pages/search/index'
		});
	},
	/**
	 *  点击导航栏 buttons 时触发
	 */
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.getData();
		} else if (e.index == 1) {
			uni.navigateTo({
				url: '/pages/center/footprint'
			});
		}
	},
	onTabItemTap(e) {
		if (e.index == 0) {
			this.getData();
		}
	},
	onPullDownRefresh() {
		let cate = this.gcategorys[this.tabIndex];
		let item = this.goods[cate.id];
		let page = item.page + 1;

		this.$store
			.dispatch('good/GetGoods', { cid: cate.id, page: page, push: false })
			.then(() => {
				uni.stopPullDownRefresh();
			})
			.catch(() => {
				uni.stopPullDownRefresh();
			});
	}
};
</script>

<style>
		page{
			.carousel-section{
				padding: 0;
				.titleNview-placing {
					padding-top: 0;
					height: 0;
				}
				.carousel{
					.carousel-item{
						padding: 0;
					}
				}
				.swiper-dots{
					left:45upx;
					bottom:40upx;
				}
			}
		}
		
		/* 头部 轮播图 */
		.carousel-section {
			position: relative;
		
			.titleNview-placing {
				height: var(--status-bar-height);
				padding-top: 44px;
				box-sizing: content-box;
			}
		
			.titleNview-background {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 426upx;
				transition: .4s;
			}
		}
		.carousel {
			width: 100%;
			height: 350upx;
		
			.carousel-item {
				width: 100%;
				height: 100%;
				padding: 0 28upx;
				overflow: hidden;
			}
		
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		.carousel uni-image{
		    width: 100%;
		    height: 100%;
		  
		}
		.swiper-dots {
			display: flex;
			position: absolute;
			left: 60upx;
			bottom: 15upx;
			width: 72upx;
			height: 36upx;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
			background-size: 100% 100%;
		
			.num {
				width: 36upx;
				height: 36upx;
				border-radius: 50px;
				font-size: 24upx;
				color: #fff;
				text-align: center;
				line-height: 36upx;
			}
		
			.sign {
				position: absolute;
				top: 0;
				left: 50%;
				line-height: 36upx;
				font-size: 12upx;
				color: #fff;
				transform: translateX(-50%);
			}
		}
		/*轮播图结束*/
	
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}
		.touch-action-none {
			touch-action: none;
		}

		.good-quan {
			position: absolute;
			right: 4px;

			/* background-color: #ff3333; */
			color: #e80080;
			padding: 0 4px;
			border: 1px solid #e80080;
			/* border-radius: 2px; */
		}

		.good-price {
			color: #e80080;
			margin-left: 4px;
		}
		.good-sell-number {
			right: 4px;
			padding: 0 4px;
		}
		.good-price-favour {
			color: #888888;
			text-decoration: line-through;
			margin-left: 4px;
		}

		.uni-good-list-text-bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.cate-grid-list {
			background: #ffffff;
			padding-top: 10upx;
			margin-bottom: 20upx;
		}
</style>
