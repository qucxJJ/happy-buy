<template>
  <div class="user-center-content">
    <div class="my-info">
      <img :src="avatar">
      <span class="name">{{userName}}</span>
    </div>
    <ul class="my-order">
      <li class="item">待付款</li>
      <li class="item">待发货</li>
      <li class="item">待收货</li>
      <li class="item">待评价</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'userName',
      'avatar'
    ])
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.user-center-content
  .my-info
    padding: 20px;
    img
      width: 100px;
      height: 100px;
      border-radius: 50px;
    .name
      display: inline-block;
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      color: $color-text;
      font-weight: bold;
      vertical-align: top;
      margin-left: 30px;
  .my-order
    width: 100%;
    display: flex;
    height: 50px;
    padding: 15px 0;
    margin-top: 30px;
    box-sizing: border-box;
    .item
      flex: 1;
      height: 20px;
      line-height: 20px;
      font-size: $font-size-normal-x;
      text-align: center;
      cursor: pointer;
</style>
