<template>
  <div class="pay-success">
    <detail-header></detail-header>
    <div class="main">
      <div class="tip">
        <i class="fa fa-success"></i>订单提交成功啦~
      </div>
      <div class="btn-con">
        <span class="btn">我要去支付</span>
        <span class="btn">我要查看订单</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
export default {
  components: {
    DetailHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
