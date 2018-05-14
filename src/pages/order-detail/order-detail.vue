<template>
  <div class="order-detail">
    <detail-header></detail-header>
    <div class="main">
      <div class="top">
        <ul>
          <li>
            <div class="btn" v-if="order.status === 1" @click="showPayDialog">立即付款</div>
            <div class="btn" v-if="order.status === 1" @click="showCancelDialog">取消订单</div>
            <div class="btn" v-if="order.status === 3" @click="showReceivedDialog">确认收货</div>
          </li>
          <li>
            <label>订单编号</label>
            <span>{{order.orderNumber}}</span>
          </li>
          <li>
            <label>订单状态</label>
            <span>{{orderStatus[order.status - 1]}}</span>
          </li>
          <li>
            <label>收货人信息</label>
            <ul v-if="order.address">
              <li>{{order.address.addressDetail}}</li>
              <li>{{order.address.receiveName}}</li>
              <li>{{order.address.receivePhone}}</li>
            </ul>
          </li>
          <li>
            <label>快递信息</label>
            <span v-if="order.express">{{order.express.expressName}}</span>
          </li>
          <li>
            <label>{{order.status === 1 ? '应付金额' : '实付金额'}}</label>
            <span>{{order.totalPrice}}元</span>
          </li>
          <li>
            <label>订单创建时间</label>
            <span>{{getDate(order.createTime)}}</span>
          </li>
          <li v-if="order.payTime">
            <label>订单支付时间</label>
            <span>{{getDate(order.payTime)}}</span>
          </li>
          <li v-if="order.sendTime">
            <label>订单发货时间</label>
            <span>{{getDate(order.sendTime)}}</span>
          </li>
          <li v-if="order.turnoverTime">
            <label>订单完成时间</label>
            <span>{{getDate(order.turnoverTime)}}</span>
          </li>
        </ul>
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
            <th v-if="order.isEvalAll === 0">操作</th>
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
            <td v-if="order.isEvalAll === 0">
              <span class="btn" v-if="item.isEval === 1">已评价</span>
              <span class="btn" v-if="item.isEval === 0" @click="toEvaluate(item)">评价</span>
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
      <el-dialog title="付款" :visible.sync="payConfirmVisible" class="dialog">
        请确认好您的订单信息后点击 确定 按钮进行付款哦~
        <div slot="footer" class="dialog-footer">
          <span @click="payConfirmVisible = false" class="cancel">取 消</span>
          <span @click="payNow" class="confirm">确 定</span>
        </div>
      </el-dialog>
      <el-dialog title="取消订单" :visible.sync="cancelConfirmVisible" class="dialog">
        确认取消该订单吗？
        <div slot="footer" class="dialog-footer">
          <span @click="cancelConfirmVisible = false" class="cancel">取 消</span>
          <span @click="cancelOrder" class="confirm">确 定</span>
        </div>
      </el-dialog>
      <el-dialog title="确认收货" :visible.sync="receivedConfirmVisible" class="dialog">
        确认您已经收到货物了吗？
        <div slot="footer" class="dialog-footer">
          <span @click="receivedConfirmVisible = false" class="cancel">取 消</span>
          <span @click="receivedOrder" class="confirm">确 定</span>
        </div>
      </el-dialog>
      <el-dialog title="填写评价" :visible.sync="dialogFormVisible" class="dialog" width="60%">
        <div class="main">
          <ul>
            <li class="form-item">
              <label class="label">满意度</label>
              <div class="right">
                好评<input type="radio" v-model="eval.type" :value="1">
                中评<input type="radio" v-model="eval.type" :value="2">
                差评<input type="radio" v-model="eval.type" :value="3">
              </div>
            </li>
            <li class="form-item">
              <label class="label">评价内容</label>
              <textarea
                type="text"
                v-model="eval.content"
                placeholder="请填写评价内容"
                style="resize: none;">
              </textarea>
            </li>
            <li class="form-item">
              <label class="label">图片上传</label>
              <el-upload
                class="upload-pic"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="eval.pics"
                :on-success="handlePicUploadSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog title="图片预览" :visible.sync="detailPicDialogVisible">
                <img width="100%" :src="detailDialogImageUrl" alt="">
              </el-dialog>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <span @click="dialogFormVisible = false" class="cancel">取 消</span>
          <span @click="submitEval" class="confirm">确 定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import config from '@/common/js/config.js';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    DetailHeader
  },
  data () {
    return {
      order: {},
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],
      payConfirmVisible: false,
      cancelConfirmVisible: false,
      receivedConfirmVisible: false,
      evalType: [{
        value: 1,
        txt: '好评'
      }, {
        value: 2,
        txt: '中评'
      }, {
        value: 3,
        txt: '差评'
      }],
      uploadAction: config.uploadEvalUrl,
      detailDialogImageUrl: '',
      detailPicDialogVisible: false,
      eval: {
        type: 1,
        content: '',
        pics: []
      },
      dialogFormVisible: false,
      evalProduct: {}
    };
  },
  created () {
    let orderNumber = this.$route.query.orderNumber;
    this.getOrderDetail(orderNumber);
  },
  methods: {
    submitEval (product) {
      let tempObj = {
        orderNumber: this.order.orderNumber,
        type: this.eval.type,
        content: this.eval.content,
        pics: this.eval.pics.map(item => {
          return item.response.data;
        }),
        productId: this.evalProduct.productId,
        size: this.evalProduct.size,
        attr: this.evalProduct.attr,
        num: this.evalProduct.num,
        pic: this.evalProduct.pic.split('/')[5]
      };
      Service.submit_eval(tempObj).then(() => {
        Message.success({
          message: '评价成功啦~'
        });
        this.dialogFormVisible = false;
        this.getOrderDetail(this.order.orderNumber);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    toEvaluate (item) {
      this.evalProduct = item;
      this.dialogFormVisible = true;
    },
    handleRemove (file, fileList) {
      this.eval.pics = fileList;
      console.log(this.eval.pics);
    },
    handlePictureCardPreview (file) {
      this.detailDialogImageUrl = file.url;
      this.detailPicDialogVisible = true;
    },
    handlePicUploadSuccess (res, file, fileList) {
      this.eval.pics = fileList;
      console.log(this.eval.pics);
    },
    receivedOrder () {
      Service.received_order({
        orderNumber: this.order.orderNumber
      }).then(() => {
        Message.success({
          message: '收获成功啦~快去评价吧'
        });
        this.receivedConfirmVisible = false;
        this.getOrderDetail(this.order.orderNumber);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    showReceivedDialog () {
      this.receivedConfirmVisible = true;
    },
    cancelOrder () {
      Service.cancel_order({
        orderNumber: this.order.orderNumber
      }).then(() => {
        Message.success({
          message: '订单取消成功'
        });
        this.cancelConfirmVisible = false;
        this.getOrderDetail(this.order.orderNumber);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    showCancelDialog () {
      this.cancelConfirmVisible = true;
    },
    payNow () {
      Service.pay_order({
        orderNumber: this.order.orderNumber
      }).then(() => {
        Message.success({
          message: '付款成功啦~'
        });
        this.payConfirmVisible = false;
        this.getOrderDetail(this.order.orderNumber);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    showPayDialog () {
      this.payConfirmVisible = true;
    },
    getOrderDetail (orderNumber) {
      Service.get_order_detail({
        orderNumber
      })
        .then(data => {
          this.order = data;
          console.log(this.order);
        })
        .catch(res => {
          Message.error({
            message: res.errStr
          });
        });
    },
    getDate (time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 + '';
      let day = date.getDate() + '';
      let hour = date.getHours() + '';
      let minutes = date.getMinutes() + '';
      let seconds = date.getSeconds() + '';
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.order-detail
  .main
    width: 1080px;
    margin: 0 auto;
    .top
      margin-top: 40px;
      li
        line-height: 40px;
        .btn
          display: inline-block;
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: $color-theme;
          color: #fff;
          font-size: $font-size-large;
          font-weighr: bold;
          cursor: pointer;
          margin-left: 20px;
        label
          display: inline-block;
          width: 120px;
          text-align: right;
          font-size: $font-size-normal;
          margin-right: 20px;
          font-weight: bold;
        span
          display: inline-block;
          font-size: $font-size-normal;
        ul
          display: inline-block;
          font-size: $font-size-normal;
          vertical-align: top;
    .table-con
      table
        width: 100%;
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
                padding: 15px 0 0 0;
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
            width: 45%;
          &:nth-child(2)
            width: 20%;
          &:nth-child(3)
            width: 10%;
          &:nth-child(4)
            width: 10%;
          &:nth-child(5)
            width: 10%;
          &:nth-child(6)
            width: 5%;
        td
          border: 1px solid #ccc;
  .dialog /deep/ .el-dialog
    .el-dialog__header
      border-bottom: 1px solid $color-theme;
    .main
      padding: 15px 20px;
      .form-item
        margin-bottom: 10px;
        .label
          display: inline-block;
          width: 100px;
          height: 40px;
          line-height: 40px;
          font-size: $font-size-normal;
          text-align: right;
          margin-right: 20px;
          vertical-align: top;
        .right
          display: inline-block;
          height: 40px;
          line-height: 40px;
          font-size: $font-size-normal;
        textarea
          width: 500px;
          height: 70px;
        .upload-pic
          display: inline-block;
          width: 600px;
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
