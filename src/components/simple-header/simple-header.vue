<template>
  <div class="simple-header">
    <span class="logo">SHOPPING</span>
    <span class="welcome">{{word}}</span>
    <span class="tip" v-if="word === '欢迎注册'">已有账号？<span class="btn">请登录</span></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    word: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.simple-header
  width: 1080px;
  margin: 0 auto;
  position: relative;
  height: 80px;
  .logo
    position: absolute
    display: block
    font-size: 36px
    color: $color-theme;
    left: 60px
    top: 25px
    font-weight: bold;
  .welcome
    position: absolute;
    left: 290px;
    top: 32px;
    font-size: 24px;
  .tip
    position: absolute;
    right: 0;
    bottom: 20px;
    font-size: $font-size-normal-x;
    color: #999;
    .btn
      color: #000;
      cursor: pointer;
</style>
