// 广告幻灯片组件
Vue.component('ad-slider', {
	props:{
		ad_data:Array,
		width:{type:Number,default:600},
		height:{type:Number,default:200},
		delay:{type:Number,default:3000}
	},
	data: function(){return{
		ad_id: 0,
		ad_timer: null
	}},
	mounted: function(){
		this.ad_timer = setTimeout(this.adSlide,this.delay,1);
	},
	methods:{
		adSlide: function(v){
			clearTimeout(this.ad_timer);
			this.ad_id = (this.ad_id + this.ad_data.length + v) % this.ad_data.length;
			this.ad_timer = setTimeout(this.adSlide,this.delay,1);
		},
		adSlideTo: function(v){
			clearTimeout(this.ad_timer);
			this.ad_id = v;
			this.ad_timer=setTimeout(this.adSlide,this.delay,1);
		},
		adClick: function(url){
			this.$emit("ad_click",url);
		}
	},
	template: '\
		<div class="adbox" v-bind:style="\'width:\' + width + \'px;height:\'+height+\'px\'">\
			<template v-for="(ad,index) in ad_data">\
			<transition name="ad"><img v-if="ad_id==index" v-bind:src="ad.img" v-on:click="adClick(ad.url)" class="ad_item" v-bind:style="\'width:\'+width+\'px;height:\'+height+\'px\'"></transition>\
			</template>\
			<span class="btn left" v-on:click="adSlide(-1)" v-bind:style="\'top:\'+(height/2-20)+\'px\'"></span>\
			<span class="btn right" v-on:click="adSlide(1)" v-bind:style="\'top:\'+(height/2-20)+\'px\'"></span>\
			<div class="dots">\
			<span v-for="(ad,index) in ad_data" v-bind:key="index" v-bind:class="[\'dot\',ad_id==index ? \'active\':\'\']" v-on:click="adSlideTo(index)"></span>\
			</div>\
		</div>\
	'
});
