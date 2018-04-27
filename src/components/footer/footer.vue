<template>
  <div class="footer-container">
    <div class="main">
      <div class="links">
        <a href="https://www.taobao.com" class="link" target="_blank">淘宝</a>|
        <a href="https://www.tmall.com" class="link" target=_blank>天猫</a>|
        <a href="https://www.jd.com" class="link" target=_blank>京东</a>|
        <a href="https://www.vip.com" class="link" target=_blank>唯品会</a>|
        <a href="https://www.pinduoduo.com" class="link" target=_blank>拼多多</a>
      </div>
      <p class="copyright">
        Copyright &copy; 2018 shopping.com All Right Reserved
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.footer-container
  width: 100%;
  min-width: 1080px;
  .main
    width: 1080px;
    height: 70px;
    padding: 10px 0;
    margin: 0 auto;
    .links
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-small;
      color: #999;
      .link
        display: inline-block;
        margin: 0 10px;
    .copyright
      height: 30px;
      line-height: 30px;
      font-size: $font-size-small;
      text-align: center;
      color: #999;
</style>
