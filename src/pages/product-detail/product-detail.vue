<template>
  <div class="product-detail">
    <detail-header></detail-header>
    <search></search>
    <div class="main">
      <div class="top">
        <div class="picture-container">
          <div class="big-picture-container" ref="bigPicture">
            <div
              class="mark"
              ref="markBox"
              @mouseover="handleMouseover"
              @mouseout="handleMouseout"
              @mousemove="handleMousemove"></div>
            <div class="float-box" ref="floatBox"></div>
            <img
              :src="productInfo.mainImage"
              class="big-image"
              ref="bigImage">
          </div>
          <div class="big-picture-detail" ref="bigPictureDetail">
            <img :src="productInfo.mainImage" ref="detailImage">
          </div>
          <div class="small-picture-container">
            <img
              v-for="(item, index) in productInfo.attributes"
              :src="item.image"
              :key="index"
              @click="showSmallPicture(item.image,)">
          </div>
        </div>
        <ul class="simple-info-container">
          <li>
            <h2 class="title">{{productInfo.productName}}</h2>
          </li>
          <li class="price-con">
            <label class="label">价格</label>
            <span class="price"><span class="sign">￥</span>{{productInfo.price}}</span>
          </li>
          <li class="box-con">
            <div class="box">
              <label>累计销量</label> <span class="all-num">{{productInfo.payNum}}</span>
            </div>
            <div class="box">
              <label>累计评价</label> <span class="all-num">{{productInfo.evaluationNum}}</span>
            </div>
          </li>
          <li class="size-con">
            <label>尺码</label>
            <div class="size-container">
              <span
                v-for="(item, index) in productInfo.sizes"
                :key="index"
                class="size"
                @click="selectSize(item)"
                :class="{'cur': selectedSize === item}">{{item}}</span>
            </div>
          </li>
          <li class="attr-con">
            <label>属性</label>
            <span class="attr-container">
              <img
                v-for="(item, index) in productInfo.attributes"
                :key="index"
                :src="item.image"
                :title="item.name"
                @click="showSmallPicture(item.image, item.name)"
                :class="{'cur': selectedAttr === item.name}">
            </span>
          </li>
          <li class="num-con">
            <label>数量</label>
            <span class="num-container">
              <div class="num">{{selectedNum}}</div>
              <div class="sign">
                <span class="up" @click="increaseNum"><i class="fa fa-angle-up"></i></span>
                <span class="down" @click="decreaseNum"><i class="fa fa-angle-down"></i></span>
              </div>
              <span class="info">库存{{productInfo.stockNum}}件</span>
            </span>
          </li>
          <li class="collec-con" :class="{'like': productInfo.collectStatus === 1}" @click="toggleCollect">
            <i class="fa fa-star"></i>
            {{productInfo.collectStatus === 1 ? '取消收藏' : '收藏'}}
          </li>
          <li class="btn-con">
            <div class="buy-now btn" :class="{'disable': productInfo.stockNum <= 0}">立即购买</div>
            <div class="add-cart btn" @click="addToCart" :class="{'disabled': productInfo.stockNum <= 0}"><i class="fa fa-shopping-cart"></i>&nbsp;加入购物车</div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="tab-btn-container">
          <div class="tab" :class="{'cur': showType === 1}" @click="showType = 1">商品详情</div>
          <div class="tab" :class="{'cur': showType === 2}" @click="getEvals">累计评价{{productInfo.evaluationNum}}</div>
          <div class="tab" :class="{'cur': showType === 3}" @click="showType = 3">猜你喜欢</div>
        </div>
        <div class="tab-content detail" v-show="showType === 1">
          <h2 class="title">产品参数：</h2>
          <ul class="top">
            <li v-for="(item, index) in productInfo.params" :key="index" class="item">
              <label>{{item.name}}：</label>
              <span>{{item.value}}</span>
            </li>
          </ul>
          <h2 class="title">商品详情：</h2>
          <div class="detail-info" v-html="productInfo.detail"></div>
        </div>
        <div class="tab-content evaluation" v-show="showType === 2">
          <div class="eval-tab">
            <div class="good-rate">
              <span>{{rates.goodRate}}%</span>好评率
            </div>
            <ul class="tab-con">
              <li :class="{'cur': evalType === 0}">全部评价（{{rates.total}}）</li>
              <li :class="{'cur': evalType === 1}">好评（{{rates.good}}）</li>
              <li :class="{'cur': evalType === 2}">中评（{{rates.middle}}）</li>
              <li :class="{'cur': evalType === 3}">差评（{{rates.bad}}）</li>
            </ul>
          </div>
          <div class="eval-content">
            <ul>
              <li v-for="(item, index) in evals" :key="index" class="eval-item">
                <img :src="item.avatar" alt="" class="avatar">
                <div class="content">
                  <div class="title">{{item.userName}}&nbsp;&nbsp;&nbsp;({{evalTypeTxt[item.type - 1].txt}})&nbsp;&nbsp;&nbsp;&nbsp;评论于{{getDate(item.createTime)}}</div>
                  <div class="text">
                    <p class="txt">
                      {{item.content}}
                    </p>
                    <ul class="pics" v-if="item.pics.length">
                      <li v-for="(pic, index1) in item.pics" :key="index1"><img :src="pic" alt=""></li>
                    </ul>
                  </div>
                  <div class="product-info">颜色分类：{{item.attr}} 尺码：{{item.size}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content recommend" v-show="showType === 3">
          猜你喜欢
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    DetailHeader,
    Search
  },
  data () {
    return {
      productId: '',
      productInfo: '',
      selectedSize: '',
      selectedNum: 1,
      selectedAttr: '',
      showType: 1,
      evalType: 0,
      evals: [],
      rates: {
        good: '',
        middle: '',
        bad: '',
        total: '',
        goodRate: ''
      },
      evalTypeTxt: [{
        value: 1,
        txt: '好评'
      }, {
        value: 2,
        txt: '中评'
      }, {
        value: 3,
        txt: '差评'
      }],
    };
  },
  created () {
    this.productId = this.$route.query.productId;
    this.getProductDetail();
  },
  methods: {
    getEvals () {
      this.showType = 2;
      Service.get_product_eval({
        type: this.evalType,
        productId: this.productId
      }).then(data => {
        this.evals = data.list;
        this.rates.good = data.goodNum;
        this.rates.middle = data.middleNum;
        this.rates.bad = data.badNum;
        this.rates.goodRate = parseInt((data.goodNum / data.totalNum) * 100);
        this.rates.total = data.totalNum;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    getProductDetail () {
      Service.get_product_detail({productId: this.productId}).then(data => {
        this.productInfo = data;
      });
    },
    handleMouseover () {
      this.$refs.floatBox.style.display = 'inline-block';
      this.$refs.bigPictureDetail.style.display = 'inline-block';
    },
    handleMouseout () {
      this.$refs.floatBox.style.display = 'none';
      this.$refs.bigPictureDetail.style.display = 'none';
    },
    handleMousemove (event) {
      let floatBox = this.$refs.floatBox;
      let mark = this.$refs.markBox;
      let img = this.$refs.detailImage;
      let bigBox = this.$refs.bigPictureDetail;
      let left = event.clientX - 50 - floatBox.offsetWidth / 2;
      let top = event.clientY - 50 - floatBox.offsetHeight / 2;
      if (left < 0) {
        left = 0;
      } else if (left > mark.offsetWidth - floatBox.offsetWidth) {
        left = mark.offsetWidth - floatBox.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > mark.offsetHeight - floatBox.offsetHeight) {
        top = mark.offsetHeight - floatBox.offsetHeight;
      }
      floatBox.style.left = `${left}px`;
      floatBox.style.top = `${top}px`;
      let percentX = left / (mark.offsetWidth - floatBox.offsetWidth);
      let percentY = top / (mark.offsetHeight - floatBox.offsetHeight);
      img.style.left = -percentX * (img.offsetWidth - bigBox.offsetWidth) + 'px';
      img.style.top = -percentY * (img.offsetHeight - bigBox.offsetHeight) + 'px';
    },
    showSmallPicture (url, name) {
      this.$refs.bigImage.src = url;
      this.$refs.detailImage.src = url;
      if (name) {
        this.selectedAttr = name;
      }
      console.log(this.selectedAttr);
    },
    selectSize (size) {
      this.selectedSize = size;
    },
    increaseNum () {
      if (this.selectedNum < this.productInfo.stockNum) {
        this.selectedNum++;
      }
    },
    decreaseNum () {
      if (this.selectedNum > 1) {
        this.selectedNum--;
      }
    },
    toggleCollect () {
      Service.toggle_collection_status({
        productId: this.productId
      }).then(() => {
        Message.success({
          message: this.productInfo.collectStatus === 1 ? '已取消收藏' : '收藏成功'
        });
        this.getProductDetail();
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    addToCart () {
      if (!this.selectedSize) {
        Message.error({
          message: '选择尺码信息才能加入购物车哦~'
        });
        return;
      }
      if (!this.selectedAttr) {
        Message.error({
          message: '选择属性后才能加入购物车哦~'
        });
        return;
      }
      if (this.productInfo.stockNum <= 0) {
        Message.error({
          message: '这件商品库存不足哦~'
        });
        return;
      }
      Service.add_to_cart({
        productId: this.productId,
        num: this.selectedNum,
        size: this.selectedSize,
        attr: this.selectedAttr
      }).then(() => {
        Message.success({
          message: '加入购物车成功啦~'
        });
      }).catch(res => {
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
.product-detail
  .main
    width: 1080px;
    margin: 0 auto;
    .top
      .picture-container
        width: 400px;
        display: inline-block;
        position: relative;
        .big-picture-container
          width: 400px;
          height: 400px;
          display: inline-block;
          border: 1px solid $color-border;
          margin-bottom: 6px;
          position: relative;
          .mark
            position: absolute;
            background: #fff;
            display: inline-block;
            width: 400px;
            height: 400px;
            z-index: 10;
            opacity: 0;
            cursor: move;
          .float-box
            width: 250px;
            height: 250px;
            position: absolute;
            background: #ffffcc;
            border: 1px solid #cccccc;
            opacity: 0.5;
            display: none;
          .big-image
            width: 400px;
            height: 400px;
        .big-picture-detail
          display: none;
          position: absolute;
          top: 0;
          left: 410px;
          width: 400px;
          height: 400px;
          border: 1px solid $color-border;
          z-index: 3;
          overflow: hidden;
          img
            width: 640px;
            height: 640px;
            position: absolute;
            z-index: 5;
        .small-picture-container
          width: 400px;
          height: 60px;
          img
            width: 60px;
            height: 60px;
            box-sizing: border-box;
            border: 1px solid $color-border;
            display: inline-block;
            margin-right: 6px;
            cursor: pointer;
      .simple-info-container
        display: inline-block;
        margin-left: 30px;
        width: 645px;
        vertical-align: top;
        .title
          padding: 8px 0;
          text-align: left;
          font-size: $font-size-large;
          font-weight: 700;
          line-height: 25px;
        .price-con
          width: 100%;
          height: 50px;
          line-height: 35px;
          padding: 8px 15px 8px;
          text-align: left;
          background: #F7F7F7;
          box-sizing: border-box;
          label
            display: inline-block;
            width: 70px;
            height: 21px;
            line-height: 21px;
            font-size: $font-size-normal;
            color: #888;
          .price
            font-size: 24px;
            color: $color-theme;
            font-weight: bold;
            display: inline-block;
            .sign
              font-size: 14px;
              font-weight: normal;
        .box-con
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          padding: 10px 0;
          border-top: 1px dashed $color-border;
          border-bottom: 1px dashed $color-border;
          margin-top: 10px;
          .box
            flex: 1;
            text-align: center;
            font-size: $font-size-normal;
            label
              color: $color-text;
            span
              color: $color-theme;
            &:first-child
              border-right: 1px solid #ccc;
        .size-con
          width: 100%;
          margin-top: 20px;
          label
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            color: #888;
            font-size: 14px;
          .size-container
            display: inline-block;
            width: 570px;
            line-height: 34px;
            .size
              display: inline-block;
              box-sizing: border-box;
              height: 30px;
              min-width: 30px;
              line-height: 28px;
              border: 2px solid $color-border;
              padding: 0 5px;
              margin-right: 8px;
              font-size: $font-size-small;
              text-align: center;
              cursor: pointer;
              &:hover
                box-sizing: border-box;
                border: 2px solid $color-theme;
              &.cur
                border: 2px solid $color-theme;
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
        .attr-con
          width: 100%;
          margin-top: 10px;
          label
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            color: #888;
            font-size: 14px;
            vertical-align: top;
          .attr-container
            display: inline-block;
            width: 570px;
            img
              width: 38px;
              height: 38px;
              border: 2px solid $color-border;
              margin-right: 5px;
              margin-bottom: 5px;
              cursor: pointer;
              &.cur
                border: 2px solid $color-theme;
        .num-con
          width: 100%;
          margin-top: 10px;
          label
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            color: #888;
            font-size: 14px;
            vertical-align: top;
          .num-container
            display: inline-block;
            .num
              display: inline-block
              box-sizing: border-box;
              width: 41px;
              height: 30px;
              border: 1px solid $color-border;
              text-align: center;
              vertical-align: top;
              line-height: 28px;
              color: $color-text;
            .sign
              width: 20px;
              height: 30px;
              display: inline-block;
              position: relative;
              font-size: 0;
              vertical-align: top;
              span
                font-size: $font-size-small;
                position: absolute;
                left: 0;
                width: 20px;
                height: 13px;
                box-sizing: border-box;
                border: 1px solid $color-border;
                line-height: 11px;
                text-align: center;
                cursor: pointer;
              .up
                top: 0;
              .down
                bottom: 0;
            .info
              display: inline-block;
              font-size: $font-size-small;
              height: 30px;
              line-height: 30px;
              margin-left: 15px;
              color: $color-text;
        .collec-con
          margin-top: 20px;
          height: 30px;
          line-height: 30px;
          font-size: $font-size-normal;
          color: $color-text;
          cursor: pointer;
          &.like
            color: $color-theme;
        .btn-con
          margin-top: 20px;
          .btn
            display: inline-block;
            width: 180px;
            height: 40px;
            line-height: 38px;
            box-sizing: border-box;
            font-size: $font-size-normal-x;
            text-align: center;
            cursor: pointer;
            &.disabled
              cursor: not-allowed;
          .buy-now
            border: 1px solid $color-theme;
            background: #ffeded;
            color: $color-theme;
            margin-right: 20px;
          .add-cart
            border: 1px solid $color-theme;
            background: $color-theme;
            color: #fff;
    .bottom
      width: 100%;
      margin-top: 30px;
      .tab-btn-container
        width: 100%;
        border: 1px solid $color-border;
        display: flex;
        height: 50px;
        box-sizing: border-box;
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
      .tab-content
        width: 100%;
        border: 1px solid $color-border;
        border-top: none;
        box-sizing: border-box;
      .detail
        padding: 10px 94px;
        .title
          width: 80px;
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid $color-theme;
        .top
          width: 100%;
          padding: 0 20px 18px 20px;
          .item
            display: inline-block;
            width: 339px;
            height: 20px;
            line-height: 20px;
            font-size: $font-size-normal;
            color: $color-text;
            margin-top: 10px;
        .detail-info
          margin-top: 10px;
          text-aign: center;
      .evaluation
        padding: 10px 100px;
        .eval-tab
          height: 100px;
          padding: 10px;
          box-sizing: border-box;
          border-bottom: 1px solid $color-theme;
          .good-rate
            width: 150px;
            height: 100px;
            display: inline-block;
            text-align: center;
            line-height: 30px;
            color: $color-theme
            font-weight: bold;
            font-size: $font-size-large;
            span
              display: inline-block;
              width: 100%;
              line-height: 50px;
              font-size: 40px;
              font-weight: bold;
              color: $color-theme;
          .tab-con
            vertical-align: top;
            display: inline-block;
            width: 500px;
            height: 100%;
            line-height: 100%;
            box-sizing: border-box;
            padding: 20px 0;
            li
              display: inline-block;
              width: 120px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: $font-size-normal;
              cursor: pointer;
              &.cur
                color: #fff;
                background: $color-theme
                border-radius: 5px;
        .eval-content
          .eval-item
            margin: 15px 0;
            .avatar
              display: inline-block;
              width: 50px;
              height: 50px;
              margin-top: 10px;
              vertical-align: top;
            .content
              box-sizing: border-box;
              display: inline-block;
              width: 800px;
              margin-left: 23px;
              border: 1px solid $color-border;
              .title
                height: 35px;
                line-height: 35px;
                width: 100%;
                border-bottom: 1px solid $color-border;
                background: #eee;
                font-size: $font-size-normal;
                padding-left: 10px
              .text
                padding: 15px;
                .txt
                  line-height: 20px;
                .pics
                  display: inline-block;
                  width: 100%;
                  li
                    display: line-block;
                    width: 50px;
                    height: 50px;
                    margin-right: 5px;
                    img
                      width: 100%;
                      height: 100%;
              .product-info
                font-size: $font-size-normal;
                line-height: 30px;
                padding-left: 15px;
                color: #999;

</style>
