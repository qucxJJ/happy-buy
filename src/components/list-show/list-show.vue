<template>
  <div class="list-show">
    <ul class="list-con">
      <li v-for="(item, index) in productData" :key="index" class="product" @click="showDetail(item.productId)">
        <span class="delete" v-if="type === 'myinfo'" @click.stop="deleteOne(item.productId)">
          <i class="fa fa-trash"></i>
        </span>
        <img v-lazy="item.mainImage" alt="">
        <div class="info">
          <span class="price">￥{{item.price}}</span>
          <span class="num" v-if="item.payNum !== undefined">{{item.payNum}}人付款</span>
        </div>
        <p class="name">{{item.productName}}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    productData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  methods: {
    showDetail (productId) {
      this.$emit('detail', productId);
    },
    deleteOne (productId) {
      this.$emit('delete', productId);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable.styl';
.list-show
  .list-con
    .product
      box-sizing: border-box;
      display: inline-block;
      width: 204px;
      height: 300px;
      margin: 0 15px 20px 0;
      border: 1px solid $color-border
      cursor: pointer;
      position: relative;
      &:nth-child(5n)
        margin-right: 0;
      img
        width: 202px;
        height: 202px;
      .info
        margin: 15px 0;
        padding: 0 10px;
        .price
          font-size: $font-size-large;
          font-weight: bold;
          color: $color-theme;
        .num
          display: inline-block;
          margin-left: 30px;
          font-size: $font-size-normal;
          color: $color-text
      &:hover
        .delete
          display: inline-block;
      .delete
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        width: 30px;
        height: 30px;
        line-height: 30;
        text-align: center;
        font-size: 20px;
        background: #666;
        color: #fff;
        i
          position: absolute;
          right: 7px;
          top: 4px;
      .name
        height: 30px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 5px;
        font-size: $font-size-small;
        color: $color-text;
</style>
