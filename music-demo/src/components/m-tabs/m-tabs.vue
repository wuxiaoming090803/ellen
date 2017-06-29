<template>
	<div class="tab">
		<router-link tag="div" class="tab-item" to="/recommend">
			<div class="tab-link">推荐</div>
		</router-link>
		<router-link tag="div" class="tab-item" to="/singer">
			<div class="tab-link">歌手</div>
		</router-link>
		<router-link tag="div" class="tab-item" to="/rank">
			<div class="tab-link">排行</div>
		</router-link>
		<router-link tag="div" class="tab-item" to="/search">
			<div class="tab-link">搜索</div>
		</router-link>
	</div>
</template>
<script type="text/javascript">
	export default {

 	 }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
	.tab
		height: 44px
		line-height: 44px
		font-size: 14px
		.tab-item
			text-align:center
			display:inline-block
			width:24%
			.tab-link
		        padding-bottom: 5px
		        color: $color-text-l	
		    &.router-link-active
		    .tab-link
		     color:$color-theme
		     border-bottom:2px solid $color-theme
			
</style>