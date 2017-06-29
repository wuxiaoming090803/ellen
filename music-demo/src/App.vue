<template>
  <div id="app">
    <m-header></m-header> 
    <m-tabs></m-tabs>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from '@/components/m-header/m-header'
import MTabs from '@/components/m-tabs/m-tabs'
export default {
  components:{
    MHeader,
    MTabs
  }
}
</script>

<style>

</style>
