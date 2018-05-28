<template>
  <div class="payment">
    <detail-header></detail-header>
    <div class="main">
      <div class="address-part">
        <h2 class="title">选择收货地址</h2>
        <address-model page="pay" @selected="selectAddress"></address-model>
      </div>
      <div class="express-part">
        <h2 class="title">选择物流方式</h2>
        <ul class="express-list">
          <li
            v-for="(item, index) in expressList"
            :key="index"
            @click="selectExpress(item)"
            :class="{'active': selectedExpress.expressId === item.expressId}"
            class="express-item">
            <img :src="item.pic" alt=""><span class="name">{{item.expressName}}</span>
          </li>
        </ul>
      </div>
      <div class="product-part">
        <h2 class="title">确认订单信息</h2>
        <table>
          <thead>
          <tr>
            <th>商品信息</th>
            <th></th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in payList" :key="index">
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
          </tr>
          </tbody>
        </table>
        <div class="bottom">
          <span class="msg">买家留言：<input type="text" placeholder="选填，建议填写和卖家达成一致的说明" v-model="userMsg"></span>
          <span class="num-price">
            共
            <span class="total-num"> {{totalNum}} </span>件商品，合计金额：
            <span class="total-price"> ￥{{totalPrice}} </span>
          </span>
        </div>
        <div class="btn-con">
          <div class="button" @click="submitOrder">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import AddressModel from '@/components/address-model/address-model.vue';
import Service from '@/api';
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
export default {
  components: {
    DetailHeader,
    AddressModel
  },
  data () {
    return {
      addressList: [],
      expressList: [],
      selectedAddress: {},
      selectedExpress: {},
      userMsg: ''
    };
  },
  created () {
    console.log(this.payList);
    this.getExpressList();
  },
  methods: {
    getExpressList () {
      Service.get_express_list().then(data => {
        this.expressList = data;
        console.log(this.expressList);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    selectAddress (address) {
      this.selectedAddress = address;
    },
    selectExpress (express) {
      this.selectedExpress = express;
    },
    submitOrder () {
      if (!this.selectedExpress.expressId) {
        Message.error({
          message: '要选择快物流方式才能提交哦~'
        });
        return;
      }
      console.log(this.payList.map(item => {
        return item.id;
      }));
      let tempObj = {
        addressId: this.selectedAddress.addressId,
        expressId: this.selectedExpress.expressId,
        userMsg: this.userMsg,
        totalPrice: this.totalPrice
      };
      let ids = this.payList.map(item => {
        return item.id;
      });
      if (ids[0]) {
        tempObj.payListIds = ids;
      } else {
        tempObj.productInfo = this.payList[0];
      }
      Service.submit_order(tempObj).then(() => {
        this.$router.push('/pay-success?type=order-confirm');
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    }
  },
  computed: {
    totalNum () {
      let num = 0;
      this.payList.forEach(item => {
        num += item.num;
      });
      return num;
    },
    totalPrice () {
      let price = 0;
      this.payList.forEach(item => {
        price += item.totalPrice;
      });
      return price;
    },
    ...mapGetters([
      'payList'
    ])
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.payment
  .main
    width: 1080px;
    margin: 0 auto
  .title
    height: 40px;
    line-height: 40px;
    font-size: $font-size-normal-x;
    font-weight: bold;
  .express-list
    width: 100%;
    margin-bottom: 30px;
    .express-item
      display: inline-block;
      box-sizing: border-box;
      width: 170px;
      height: 48px;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid #fff;
      &.active
        border: 1px solid $color-theme;
        position: relative;
        &::after
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-block;
          width: 0;
          height: 0;
          border-right: 4px solid $color-theme;
          border-bottom: 4px solid $color-theme;
          border-top: 4px solid rgba(255,255,255,0);
          border-left: 4px solid rgba(255,255,255,0);
        &::before
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-block;
          width: 4px;
          height: 4px;
          border: 2px solid #fff;
          border-bottom: none;
          border-right: none;
          z-index: 2;
          transform: rotate(218deg);
      .name
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin-left: 15px;
        font-size: $font-size-normal;
        vertical-align: top;
  .product-part
    table
      thead
        tr
          height: 40px;
          line-height: 40px;
          background: #666;
          color: #fff;
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
              width: 285px;
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
      td, th
        text-align: center;
        &:nth-child(1)
          width: 450px;
        &:nth-child(2)
          width: 240px;
        &:nth-child(3)
          width: 130px;
        &:nth-child(4)
          width: 130px;
        &:nth-child(5)
          width: 130px;
    .bottom
      width: 100%;
      height: 50px;
      line-height: 30px;
      color: #000;
      padding: 10px 15px;
      font-size: $font-size-normal;
      position: relative;
      box-sizing: border-box;
      .msg
        font-size: $font-size-normal;
        input
          width: 240px;
          height: 20px;
          padding-left: 5px;
          font-size: $font-size-small;
          border: 1px solid $color-border;
      .num-price
        display: inline-block
        position: absolute;
        right: 120px;
        top: 10px;
        .total-num
          font-size: $font-size-large;
          font-weight: bold;
        .total-price
          font-size: $font-size-large;
          font-weight: bold;
          color: $color-theme;
    .btn-con
      position: relative;
      width: 100%;
      height: 50px;
      margin-bottom: 30px;
      .button
        position: absolute;
        right: 0;
        top: 0;
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: $font-size-normal-x;
        font-weight: bold;
        text-align: center;
        color: #fff;
        background: $color-theme;
        cursor: pointer;
</style>
