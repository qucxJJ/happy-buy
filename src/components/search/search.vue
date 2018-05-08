<template>
  <div class="search-container">
    <a class="logo">SHOPPING</a>
    <input type="text" class="key-input" v-model="keyword" @keyup.13="searchProduct">
    <span class="search-btn" @click="searchProduct">搜索</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      keyword: ''
    };
  },
  methods: {
    searchProduct () {
      this.$router.push(`/product-list?keyword=${this.keyword}`);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.search-container
  width: 1080px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  .logo
    position: absolute;
    display: block;
    font-size: 36px;
    color: $color-theme;
    left: 60px;
    top: 34px;
    font-weight: bold;
  .key-input
    position: absolute;
    left: 300px;
    top: 30px;
    width: 550px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border: 2px solid $color-theme;
    font-size: $font-size-normal-x;
    outline: none;
  .search-btn
    position: absolute;
    left: 864px;
    top: 30px;
    height: 44px;
    width: 80px;
    line-height: 44px;
    text-align: center;
    font-size: $font-size-large;
    font-weight: bold;
    color: #fff;
    background: $color-theme;
</style>
