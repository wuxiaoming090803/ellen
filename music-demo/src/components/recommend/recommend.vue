<template>
  <div class="recommend" >
  	<div class="recommend-content" >
  		<div>
	  		<div v-if="recommends.length" class="slider-wrapper">
	  			<slider ref="slider">
	  				<div v-for="item in recommends">
		                <a :href="item.linkUrl">
		                  <img class="needsclick"  :src="item.picUrl" />
		                </a>
	            	</div>
	  			</slider>	
	  		</div>
  		</div>
  		<div class="musicList">
  			<h3>热门歌单推荐</h3>
  			<ul>
  				<li v-for="item in disList" class="item">
  					<div class="icon">
  						<img :src="item.imgurl"/>
  					</div>
  					<div class="musicContent">
  						<h5 v-html="item.creator.name"></h5>
  						<p v-html="item.dissname"></p>
  					</div>
  				</li>
  			</ul>
  		</div>
	</div>
  </div>
</template>

<script type="text/javascript">
  import Slider from '@/base/slider/slider'

  import {getRecommed,getDiscList} from "@/api/recommend"
	export default{
		data() {
	      return {
	        recommends: [],
	        disList:[]
	      }
   		},
		components:{
			Slider
			
		},
		created(){
			this._getRecommed();
			this._getDiscList();
		},
		methods:{
			_getRecommed(){
				getRecommed().then((res)=>{
					this.recommends = res.data.slider;
					
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					this.disList = res.data.list;
					console.log(res);
				})
			}
		}
	}
</script>
<style>
	.slider-wrapper{
		position: relative;
	}
	.needsclick{
		display: block;
		width: 100%;
	}
	.musicList .item{
		padding: 5px 50px 5px 20px;
		overflow: auto;
	}
	.musicList h3{
		text-align: center;
    	margin: 10px auto;
    	color: #ffcd32

	}
	.musicList .icon,.musicList .musicContent{
		float: left;
	}
	.musicList .icon img{
		height: 60px;
		width: 60px;
	}
	.musicList .musicContent{
		text-align: left;
		margin-left: 15px;
		width: calc(100% - 85px);
		font-size: 14px;
	}
	.musicList .musicContent h5{
		margin-bottom: 10px;
	}
	.musicList .musicContent p{
		color:hsla(0,0%,100%,.3)
	}
</style>
