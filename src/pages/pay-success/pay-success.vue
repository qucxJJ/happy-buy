<template>
  <div class="pay-success">
    <detail-header></detail-header>
    <div class="main">
      <div class="tip">
        <i class="fa fa-check-circle-o"></i>{{this.text}}
      </div>
      <div class="btn-con" v-if="this.type === 'order-confirm'">
        <router-link tag="span" class="btn" to="/order-detail">我要去支付</router-link>
        <router-link tag="span" class="btn" to="/user-center/order-list">我要查看订单</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
export default {
  components: {
    DetailHeader
  },
  data () {
    return {
      type: '',
      text: ''
    };
  },
  created () {
    this.type = this.$route.query.type;
    switch (this.type) {
      case 'order-confirm':
        this.text = '订单提交成功啦~';
        break;
      case 'pay':
        this.text = '支付成功啦~';
        break;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.pay-success
  .main
    width: 1080px;
    margin: 0 auto;
    .tip
      margin-top: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: $font-size-large;
      font-weight: bold;
      color: $color-theme;
    .btn-con
      text-align: center;
      .btn
        display: inline-block;
        width: 200px;
        height: 40px;
        line-height: 40px;
        font-size: $font-size-normal-x;
        font-weight: bold;
        background: $color-theme;
        color: #fff;
        cursor: pointer;
</style>
