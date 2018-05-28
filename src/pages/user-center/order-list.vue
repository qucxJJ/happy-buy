<template>
  <div class="order-list">
    <tab-header name="订单管理" en-name="Order manage"></tab-header>
    <div class="main">
      <div class="tab-btn-container">
        <div class="tab" :class="{'cur': showType === 0}" @click="showType = 0">全部订单</div>
        <div class="tab" :class="{'cur': showType === 1}" @click="showType = 1">待付款</div>
        <div class="tab" :class="{'cur': showType === 2}" @click="showType = 2">待发货</div>
        <div class="tab" :class="{'cur': showType === 3}" @click="showType = 3">待收货</div>
        <div class="tab" :class="{'cur': showType === 4}" @click="showType = 4">待评价</div>
      </div>
      <div class="table-con">
        <table>
          <thead>
          <tr>
            <th>商品信息</th>
            <th></th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
            <th>操作</th>
          </tr>
          </thead>
        </table>
        <table v-for="(order, index) in orderList" :key="index">
          <thead>
          <tr>
            <th>
              {{getDate(order.createTime)}}&nbsp;&nbsp;
              订单编号：{{order.orderNumber}}
            </th>
            <th>
              订单状态：{{orderStatus[order.status - 1]}}
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index1) in order.productList" :key="index1">
            <td>
              <img :src="item.pic" alt="">
              <p class="name" @click="showProductDetail(item.productId)">{{item.productName}}</p>
            </td>
            <td>
              <div class="con">
                <p class="info">颜色分类：{{item.attr}}</p>
                <p class="info">尺码信息：{{item.size}}</p>
              </div>
            </td>
            <td>
              <span class="price">￥{{item.price}}</span>
            </td>
            <td>
              <span class="price">{{item.num}}</span>
            </td>
            <td>
              <span class="total-price">￥{{item.totalPrice}}</span>
            </td>
            <td :rowspan="order.productList.length" v-if="index1 === 0">
              <router-link tag="span" :to="'/order-detail?orderNumber=' + order.orderNumber" class="btn">查看订单</router-link>
              <router-link tag="span" :to="'/order-detail?orderNumber=' + order.orderNumber" class="btn" v-if="order.status === 1">立即付款</router-link>
              <span class="btn" v-if="order.status === 1">取消订单</span>
              <span class="btn" v-if="order.status === 3">确认收货</span>
              <router-link tag="span" :to="'/evaluate-order?orderNumber=' + order.orderNumber" class="btn" v-if="order.status === 4 && order.isEvalAll === 0">去评价</router-link>
            </td>
          </tr>
          <tr v-if="order.userMsg">
            <td colspan="6">
              <div class="msg-con">
                <label>留言：</label>
                <span>{{order.userMsg}}</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TabHeader from './header.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    TabHeader
  },
  data () {
    return {
      showType: 0,
      orderList: [],
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消']
    };
  },
  created () {
    this.showType = this.$route.query.type ? parseInt(this.$route.query.type) : 0;
    this.getOrderList();
  },
  methods: {
    getOrderList () {
      Service.get_order_list({
        type: this.showType
      }).then(data => {
        this.orderList = data;
        console.log(this.orderList);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    getDate (time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  },
  watch: {
    showType () {
      this.getOrderList();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.order-list
  .main
    .tab-btn-container
      width: 100%;
      border: 1px solid $color-border;
      display: flex;
      height: 50px;
      box-sizing: border-box;
      margin-top: 20px;
      .tab
        flex: 1;
        height: 50px;
        line-height: 20px;
        padding: 15px 0;
        box-sizing: border-box;
        font-size: $font-size-normal;
        color: $color-text;
        text-align: center;
        position: relative;
        cursor: pointer;
        &.cur
          border-top: 2px solid $color-theme;
          border-left: 1px solid $color-border;
          border-right: 1px solid $color-border;
          &::after
            content: "";
            width: 0;
            height: 0;
          &::before
            content: "";
            width: 0;
            height: 0;
            border: 6px solid rgba(0,0,0,0);
            border-top: 6px solid $color-theme;
            position: absolute;
            left: 50%;
            transform: translateX(-3px);
            top: 0;
        &:after
          content: "";
          display: inline-block;
          width: 1px;
          height 20px;
          position: absolute;
          top: 15px;
          right: -1px;
          background: $color-border;
        &:last-child
          &::after
            content: "";
            width: 0;
            heighht: 0;
    .table-con
      table
        margin-top: 20px;
        border-bottom: 1px solid #ccc;
        thead
          tr
            height: 40px;
            line-height: 40px;
            background: #666;
            color: #fff;
            th
              font-size: $font-size-normal;
        tbody
          tr
            border-bottom: 1px solid $color-border;
            td
              padding: 10px 0;
              font-size: 0;
              img
                width: 80px;
                height: 80px;
              .name
                display: inline-block;
                width: 250px;
                text-align: left;
                vertical-align: top;
                padding: 15px 0 0 0
                margin-left: 15px;
                font-size: $font-size-normal;
                line-height: 20px;
                color: #333;
                cursor: pointer;
              .con
                display: inline-block;
                vertical-align: top;
                padding-top: 10px;
                .info
                  vertical-align: top;
                  display: inline-block;
                  line-height: 25px;
                  width: 100%;
                  font-size: $font-size-normal;
                  color: #ccc;
              .price
                margin-top: 20px;
                vertical-align: top;
                display: inline-block;
                width: 100%;
                font-size: $font-size-normal;
                text-align: center;
                font-weight: bold;
              .num
                margin-top: 15px;
                box-sizing: border-box;
                width: 50px;
                height: 30px;
                border: 1px solid $color-border;
                vertical-align: top;
                font-size: $font-size-small;
                text-align: center;
              .total-price
                display: inline-block;
                margin-top: 15px;
                vertical-align: top;
                font-size: $font-size-normal-x;
                color: $color-theme;
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
              .btn
                display: inline-block;
                vertical-align: top;
                width: 100%;
                font-size: $font-size-small;
                height: 25px;
                line-height: 25px;
                color: $color-theme;
                text-align: center;
                cursor: pointer;
              .msg-con
                text-align: left;
                padding-left: 20px;
                font-size: $font-size-normal;
                label, span
                  display: inline-block;
                  height: 25px;
                  line-height: 25px;
        td, th
          text-align: center;
          &:nth-child(1)
            width: 350px;
          &:nth-child(2)
            width: 150px;
          &:nth-child(3)
            width: 100px;
          &:nth-child(4)
            width: 70px;
          &:nth-child(5)
            width: 100px;
          &:nth-child(6)
            width: 115px;
        td
          border: 1px solid #ccc;
</style>
