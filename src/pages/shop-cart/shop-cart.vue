<template>
  <div class="shop-cart">
    <detail-header></detail-header>
    <search></search>
    <breadcrumb :tags="breadData"></breadcrumb>
    <div class="main">
      <table>
        <thead>
        <tr>
          <th></th>
          <th>商品信息</th>
          <th></th>
          <th>单价</th>
          <th>数量</th>
          <th>金额</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in cartList" :key="index">
          <td>
            <input type="checkbox" v-model="item.checked">
          </td>
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
            <span class="btn" @click="modifyNum(item.id, item.productId, 'minus')">-</span>
            <input type="text" v-model="item.num" class="num">
            <span class="btn" @click="modifyNum(item.id, item.productId, 'plus')">+</span>
          </td>
          <td>
            <span class="total-price">￥{{item.totalPrice}}</span>
          </td>
          <td>
            <span class="delete" @click="deleteFromCart(1, item.id)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="bottom">
        <span class="check-all"><input type="checkbox" v-model="checkAll">全选</span>
        <span class="delete-some" @click="deleteFromCart(2)">删除</span>
        <span class="num-price">已选商品
          <span class="total-num"> {{totalNum}} </span>件，合计金额：
          <span class="total-price"> ￥{{totalPrice}} </span>
        </span>
        <span class="btn" @click="toPayment">去结算</span>
      </div>
    </div>
    <el-dialog title="删除购物车商品" :visible.sync="dialogConfirmVisible" class="dialog">
      确认删除吗？
      <div slot="footer" class="dialog-footer">
        <span @click="dialogConfirmVisible = false" class="cancel">取 消</span>
        <span @click="deleteSome" class="confirm">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue';
import Service from '@/api';
import { Message } from 'element-ui';
import { mapMutations } from 'vuex';
export default {
  components: {
    DetailHeader,
    Search,
    Breadcrumb
  },
  data () {
    return {
      breadData: [
        {
          name: '我的购物车',
          path: ''
        }
      ],
      cartList: [],
      deleteId: '',
      checkAll: '',
      dialogConfirmVisible: false
    };
  },
  created () {
    this.getCartList();
  },
  methods: {
    getCartList () {
      Service.get_cart_list().then(data => {
        this.cartList = data;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    showProductDetail (productId) {
      this.$router.push(`/product-detail?productId=${productId}`);
    },
    modifyNum (id, productId, type) {
      Service.modify_cart_product_num({
        id,
        productId,
        type
      }).then(() => {
        this.getCartList();
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    deleteFromCart (type, id) {
      this.dialogConfirmVisible = true;
      if (type === 1) {
        this.deleteId = id;
      } else {
        this.deleteId = '';
      }
    },
    deleteSome () {
      let ids = [];
      if (this.deleteId) {
        ids.push(this.deleteId);
      } else {
        this.cartList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        });
      }
      Service.delete_from_cart({
        ids
      }).then(() => {
        Message.success({
          message: '删除成功'
        });
        this.getCartList();
        this.dialogConfirmVisible = false;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    toPayment () {
      let payList = [];
      this.cartList.forEach(item => {
        if (item.checked) {
          payList.push(item);
        }
      });
      this.setPayList(payList);
      this.$router.push('/order-confirm');
    },
    ...mapMutations({
      setPayList: 'SET_PAY_LIST'
    })
  },
  computed: {
    totalNum () {
      let num = 0;
      this.cartList.forEach(item => {
        if (item.checked) {
          num += item.num;
        }
      });
      return num;
    },
    totalPrice () {
      let price = 0;
      this.cartList.forEach(item => {
        if (item.checked) {
          price += item.totalPrice;
        }
      });
      return price;
    }
  },
  watch: {
    checkAll (newVal) {
      if (newVal) {
        this.cartList.forEach(item => {
          if (!item.checked) {
            item.checked = 1;
          }
        });
      } else {
        this.cartList.forEach(item => {
          if (item.checked) {
            item.checked = 0;
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.shop-cart
  .main
    width: 1080px;
    margin: 0 auto;
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
            input[type="checkbox"]
              vertical-align: top;
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
            .btn
              margin-top: 15px;
              vertical-align: top;
              display: inline-block;
              width: 30px;
              height: 30px;
              line-height: 30px;
              background: $color-border;
              color: #fff;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
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
            .delete
              display: inline-block;
              margin-top: 15px;
              vertical-align: top;
              font-size: $font-size-normal;
              width: 100%;
              height: 20px;
              line-height: 20px;
              text-align: center;
              cursor: pointer;
      td, th
        text-align: center;
        &:nth-child(1)
          width: 30px;
        &:nth-child(2)
          width: 400px;
        &:nth-child(3)
          width: 200px;
        &:nth-child(4)
          width: 100px;
        &:nth-child(5)
          width: 150px;
        &:nth-child(6)
          width: 100px;
        &:nth-child(7)
          width: 100px;
    .bottom
      width: 100%;
      height: 50px;
      line-height: 30px;
      background: #666;
      color: #fff;
      padding: 10px 15px;
      font-size: $font-size-normal;
      position: relative;
      box-sizing: border-box;
      .check-all
        display: inline-block;
        margin-right: 20px;
        input
          margin: 0 5px 0 0;
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
      .btn
        position: absolute;
        right: 0;
        top: 0
        width: 100px;
        height: 50px;
        line-height: 50px;
        background: $color-theme;
        color: #fff;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
  .dialog /deep/ .el-dialog
    .el-dialog__header
      border-bottom: 1px solid $color-theme;
    .dialog-footer
      span
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: $font-size-normal;
        box-sizing: border-box;
        border-radius: 3px;
        vertical-align: top;
        cursor: pointer;
        &.cancel
          color: $color-theme;
          border: 1px solid $color-theme;
        &.confirm
          color: #fff;
          background: $color-theme;
</style>
