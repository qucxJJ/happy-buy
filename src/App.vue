<template>
  <div id="app">
    <router-view/>
    <common-footer></common-footer>
  </div>
</template>

<script>
import '@/common/stylus/reset.styl';
import '@/common/stylus/font.styl';
import CommonFooter from '@/components/footer/footer.vue';
export default {
  name: 'App',
  components: {
    CommonFooter
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
