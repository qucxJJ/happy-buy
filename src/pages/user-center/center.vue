<template>
  <div class="user-center-content">
    <div class="my-info">
      <img :src="avatar">
      <span class="name">{{userName}}</span>
    </div>
    <h2 class="title">我的订单</h2>
    <ul class="my-order">
      <router-link tag="li" to="/user-center/order-list?type=1" class="item">
        <img src="./images/pay.png" alt="">
        待付款{{payNum > 0 ? payNum : ''}}
      </router-link>
      <router-link tag="li" to="/user-center/order-list?type=2" class="item">
        <img src="./images/send.png" alt="">
        待发货{{sendNum > 0 ? sendNum : ''}}
      </router-link>
      <router-link tag="li" to="/user-center/order-list?type=3" class="item">
        <img src="./images/receive.png" alt="">
        待收货{{receiveNum > 0 ? receiveNum : ''}}
      </router-link>
      <router-link tag="li" to="/user-center/order-list?type=4" class="item">
        <img src="./images/comment.png" alt="">
        待评价{{evalNum > 0 ? evalNum : ''}}
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  computed: {
    ...mapGetters([
      'userName',
      'avatar'
    ])
  },
  data () {
    return {
      payNum: 0,
      sendNum: 0,
      receiveNum: 0,
      evalNum: 0
    };
  },
  created () {
    Service.get_order_num().then(data => {
      this.payNum = data.payNum;
      this.sendNum = data.sendNum;
      this.receiveNum = data.receiveNum;
      this.evalNum = data.evalNum;
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
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
  .title
    height: 30px;
    font-size: $font-size-large;
    padding-left: 30px;
    font-weight: bold;
  .my-order
    width: 100%;
    display: flex;
    height: 50px;
    padding: 15px 0;
    margin-top: 30px;
    box-sizing: border-box;
    .item
      flex: 1;
      height: 50px;
      line-height: 50px;
      font-size: $font-size-normal-x;
      text-align: center;
      cursor: pointer;
      border: 1px solid $color-border;
      img
        width: 30px;
        height: 30px;
        vertical-align: middle;
</style>
