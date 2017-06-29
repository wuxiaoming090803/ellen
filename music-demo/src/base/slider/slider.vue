<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots" >
    	<span class="dot" :class="{active : currentPageIndex == index}" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
import {hassClass,addClass} from "@/common/js/dom"
import BScroll from 'better-scroll'
	export default{
		name:"slider",
		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay: {
		        type: Boolean,
		        default: true
		      },
	      	interval: {
	        	type: Number,
	        	default: 4000
	      	}
		},
		data(){
			return {
				currentPageIndex:0,
				dots:[]
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initSilderWidth();
				this._initDots();
				this._initSlider();
		        if (this.autoPlay) {
		          this._play();
		        }
			},20)

			window.addEventListener('resize', function(){
		        if (!this.slider) {
		          return
		        }
		        clearTimeout(this.resizeTimer)
		        this.resizeTimer = setTimeout(() => {
		          if (this.slider.isInTransition) {
		            this._onScrollEnd()
		          } else {
		            if (this.autoPlay) {
		              this._play()
		            }
		          }
		          this.refresh()
		        }, 60)
		      })
		},
		methods:{
			_refresh(){
		        this._setSliderWidth(true)
		        this.slider.refresh()
			},
			_initSilderWidth(isResize){
				this.children = this.$refs.sliderGroup.children;
				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth;
				for(let i = 0;i < this.children.length;i++){
					let child = this.children[i];
					child.style.width = sliderWidth + "px";
					addClass(child,"slider-item");
					width += sliderWidth;				
				}
				if (this.loop && !isResize) {
		          width += 2 * sliderWidth;
		        }
				this.$refs.sliderGroup.style.width = width + "px";
			},
			_initSlider(){
				this.slider = new BScroll(this.$refs.slider,{
					  scrollX: true,
			          scrollY: false,
			          momentum: false,
			          snap: true,
			          snapLoop: this.loop,
			          snapThreshold: 0.3,
			          snapSpeed: 400
				})
				this.slider.on("scrollEnd",this._scrollEnd);
				this.slider.on("touch",()=>{
					if(this.autoPlay){
						this._play();
					}
				})
				this.slider.on("beforeScrollStart",this._beforeScrollStart);
			},
			_beforeScrollStart(){
				if (this.autoPlay) {
		            clearTimeout(this.timer)
		        }
			},
			_scrollEnd(){
				let pageIndex = this.slider.getCurrentPage().pageX;
				if(this.loop){
					pageIndex = pageIndex - 1;
				}
				this.currentPageIndex = pageIndex;
				if(this.autoPlay){
					this._play();
				}
			},
			_play() {
		        let pageIndex = this.currentPageIndex + 1
		        if (this.loop) {
		          pageIndex += 1
		        }
		        clearTimeout(this.timer)
		        this.timer = setTimeout(() => {
		          this.slider.goToPage(pageIndex, 0, 400)
		        }, this.interval)
		    },
		    _initDots(){
		    	this.dots = new Array(this.children.length);
		    }
		}
	}
</script>
<style scoped>
	.slider{
		min-height: 1px;
	}
	.slider .slider-group{
		overflow: hidden;
	}
	.slider-group .slider-item{
		float:left;
		overflow: hidden;
	}
	.dots{
		position: absolute;
		right: 0;
		left: 0;
		width: 100%;
		bottom: 12px;
		text-align: center;
	}
	.dots .dot{
		width: 8px;
		height: 8px;
		border-radius: 50%;
		display: inline-block;
		margin: 0 5px;
		background: hsla(0,0%,100%,.5)
	}
	.dots .dot.active{
		 width: 20px;
         border-radius: 5px;
         background: rgba(255, 255, 255, 0.8);
	}
</style>
