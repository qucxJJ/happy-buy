<template>
  <div class="product-list">
    <detail-header></detail-header>
    <search></search>
    <breadcrumb :tags="breadData"></breadcrumb>
    <div class="main">
      <div class="sort-conf">
        <span class="btn">
          价格
          <span class="hide">
            <span @click="changeSortType('price', 1)">价格由低到高</span>
            <span @click="changeSortType('price', -1)">价格由高到低</span>
          </span>
        </span>
        <span class="price-input">
          <input type="text" placeholder="￥" v-model="search.startPrice">
          - <input type="text" placeholder="￥" v-model="search.endPrice">
          <span class="confirm" @click="searchPriceSection">确定</span>
        </span>
        <span class="btn" @click="changeSortType('payNum')">销量 <i class="fa" :class="payNumIcon"></i></span>
      </div>
      <list-show :productData="productData" @detail="showProductDetail"></list-show>
      <div class="pager">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="search.page"
          layout="total, prev, pager, next"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue';
import ListShow from '@/components/list-show/list-show.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    DetailHeader,
    Search,
    Breadcrumb,
    ListShow
  },
  data () {
    return {
      breadData: [
        {
          name: '商品列表',
          path: ''
        }
      ],
      productData: [],
      search: {
        page: 0,
        pageSize: 50,
        sort: {
          name: 'payNum',
          type: -1
        },
        startPrice: '',
        endPrice: ''
      },
      priceIcon: 'fa-long-arrow-down',
      payNumIcon: 'fa-long-arrow-down',
      totalNum: 0
    };
  },
  created () {
    this.getProductList();
  },
  methods: {
    handleCurrentChange () {
      this.getProductList();
    },
    searchPriceSection () {
      if (parseInt(this.search.startPrice) > parseInt(this.search.endPrice)) {
        Message.error({
          message: '查找的最低价格必须小于最高价格哦~'
        });
        return;
      }
      this.getProductList();
    },
    changeSortType (name, value) {
      if (name === 'payNum') {
        this.search.sort.name = 'payNum';
        this.payNumIcon = this.payNumIcon === 'fa-long-arrow-up' ? 'fa-long-arrow-down' : 'fa-long-arrow-up';
        this.search.sort.type = this.payNumIcon === 'fa-long-arrow-up' ? 1 : -1;
      } else if (name === 'price') {
        this.search.sort.name = 'price';
        this.search.sort.type = value;
        console.log(value, this.search.sort);
      }
      this.getProductList();
    },
    showProductDetail (productId) {
      this.$router.push('/product-detail?productId=' + productId);
    },
    getProductList () {
      Service.get_product_list({
        keyword: this.$route.query.keyword,
        page: this.search.page,
        pageSize: this.search.pageSize,
        sort: this.search.sort,
        startPrice: this.search.startPrice ? this.search.startPrice : 0,
        endPrice: this.search.endPrice ? this.search.endPrice : Number.MAX_VALUE
      }).then(data => {
        this.productData = data.list;
        this.totalNum = data.totalNum;
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
      height: 40px;
      font-size: 0;
      margin-bottom: 30px;
      .btn
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        height: 40px;
        width: 70px;
        line-height: 38px;
        border: 1px solid $color-border;
        font-size: $font-size-normal;
        text-align: center;
        cursor: pointer;
        &:first-child
          border-right: none;
        &:hover
          .hide
            display: inline-block;
        .hide
          display: none;
          position: absolute;
          left: 0;
          top: 40px;
          width: 100px;
          font-size: 0;
          line-height: 20px;
          z-index: 3;
          span
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-bottom: 1px solid #fff;
            font-size: $font-size-small;
            cursor: pointer;
            color: #fff;
            background: $color-theme;
      .price-input
        display: inline-block;
        box-sizing: border-box;
        height: 40px;
        width: 220px;
        line-height: 38px;
        border: 1px solid $color-border;
        border-right: none;
        font-size: $font-size-normal;
        text-align: center;
        input
          width: 70px;
          height: 25px;
          border: 1px solid $color-border;
        .confirm
          display: inline-block;
          width: 45px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          font-size: $font-size-small;
          color: #fff;
          background: $color-theme;
          cursor: pointer;
    .pager
      margin-top: 30px;
      .el-pagination
        text-align: center;
</style>
