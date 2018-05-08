<template>
  <div class="product-list">
    <detail-header></detail-header>
    <search></search>
    <breadcrumb :tags="breadData"></breadcrumb>
    <div class="main">
      <div class="sort-conf">
        <span>默认排序</span>
        <span>价格</span>
        <span>销量</span>
      </div>
      <ul class="list-con">
        <li v-for="(item, index) in productData" :key="index" class="product" @click="showProductDetail(item.productId)">
          <img v-lazy="item.imageHost + item.mainImage" alt="">
          <div class="info">
            <span class="price">￥{{item.price}}</span>
            <span class="num">{{item.payNum}}人付款</span>
          </div>
          <p class="name">{{item.productName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue';
import Service from '@/api';
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
          name: '商品列表',
          path: ''
        }
      ],
      productData: []
    };
  },
  created () {
    this.getProductList();
  },
  methods: {
    showProductDetail (productId) {
      console.log(productId);
      this.$router.push('/product-detail?productId=' + productId);
    },
    getProductList () {
      Service.get_product_list({
        keyword: this.$route.query.keyword
      }).then(data => {
        this.productData = data;
        console.log(this.productData);
      });
    }
  },
  watch: {
    '$route.query.keyword' () {
      this.getProductList();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable.styl';
.product-list
  width: 100%;
  min-width: 1080px;
  margin: 0 auto;
  .main
    width: 1080px;
    margin: 0 auto;
    .sort-conf
      height: 50px;
      line-height: 50px;
    .list-con
      .product
        box-sizing: border-box;
        display: inline-block;
        width: 204px;
        height: 300px;
        margin: 0 15px 20px 0;
        border: 1px solid $color-border
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
        .name
          height: 30px;
          line-height: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 5px;
          font-size: $font-size-small;
          color: $color-text;
</style>
