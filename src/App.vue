<template>
  <div id="app">
    <detail-header v-if="showHeader"></detail-header>
    <search v-if="showSearch" ref="search"></search>
    <router-view/>
    <common-footer></common-footer>
  </div>
</template>

<script>
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import '@/common/stylus/reset.styl';
import '@/common/stylus/font.styl';
import CommonFooter from '@/components/footer/footer.vue';
export default {
  name: 'App',
  components: {
    CommonFooter,
    DetailHeader,
    Search
  },
  data () {
    return {
      noHeader: ['/login', '/register', '/reset-password'],
      hasSearch: ['/', '/index', '/product-list', '/product-detail', '/foot-list', '/collection-list']
    };
  },
  created () {
    this.$root.eventHub.$on('keyword', (keyword) => {
      this.$refs.search.changeKeyword(keyword);
    });
  },
  computed: {
    showHeader () {
      return !(this.noHeader.indexOf(this.$route.path) > -1);
    },
    showSearch () {
      return this.hasSearch.indexOf(this.$route.path) > -1;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
