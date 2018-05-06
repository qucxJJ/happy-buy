<template>
  <div class="container">
    <detail-header></detail-header>
    <search></search>
    <div class="main">
      <div class="top">
        <side-nav class="aside"></side-nav>
        <div class="slider">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in sliderPics" :key="index">
              <img :src="item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
      <!--<ul class="floor-container">-->
        <!--<li class="floor-item" v-for="(category, index) in categoryData" :key="index">-->
          <!--<h2 class="floor-item-title">{{category.categoryName}}</h2>-->
          <!--<ul class="floor-item-con">-->
            <!--<li class="item" v-for="(item,index1) in category.list" :key="index1">-->
              <!--<p class="name">{{item.key}}</p>-->
              <!--<img :src="`http://localhost:3000${item.imgUrl}`" alt="">-->
            <!--</li>-->
          <!--</ul>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header';
import Search from '@/components/search/search';
import SideNav from '@/components/side-nav/side-nav.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Service from '@/api';
import config from '@/common/js/config';
export default {
  data () {
    return {
      categoryData: [],
      sliderPics: [],
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination'
        },
        centeredSlides: true,
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        keyboard: true,
        mousewheelControl: true
      }
    };
  },
  components: {
    DetailHeader,
    Search,
    SideNav,
    swiper,
    swiperSlide
  },
  computed: {
  },
  mounted () {
    Service.get_slider_pic().then(data => {
      this.sliderPics = data.list.map(item => {
        return `${config.host}${item}`;
      });
    });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.container
  background: #f6f6f6;
  .main
    width: 100%;
    margin: 0 auto;
    .top
      height: 405px;
      width: 100%;
      position: relative;
      margin-top: 45px;
      .aside
        position: absolute;
        left: 135px;
        top: -45px;
        z-index: 3;
      .slider
        display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
        background: #666;
        .swiper-slide
          height: 405px;
          img
            width: 100%;
            height: 100%;
    .floor-container
      width: 1080px;
      margin: 20px auto;
      .floor-item
        width: 100%;
        height: 300px;
        margin-top: 20px;
        .floor-item-title
          position: relative;
          width: 150px;
          height: 45px;
          font-size: 28px;
          text-align: center;
          line-height: 45px;
          padding: 0 50px;
          margin: 0 auto 20px;
          overflow: hidden;
          color: #222;
          &::before
            content: '';
            position: absolute;
            width: 50px;
            height: 3px;
            display: block;
            background: #222;
            top: 21px;
            left: 0;
          &::after
            content: '';
            position: absolute;
            width: 50px;
            height: 3px;
            display: block;
            background: #222;
            top: 21px;
            right: 0;
        .floor-item-con
          display: flex;
          width: 100%;
          .item
            flex: 1;
            height: 220px;
            margin-right: 20px;
            position: relative;
            cursor: pointer
            background: #fff;
            &:last-child
              margin-right: 0;
            .name
              position: absolute;
              left: 20px;
              top: 12px;
              font-size: $font-size-normal-x;
              color: $color-text;
            img
              position: absolute;
              right: 15px;
              bottom: 10px;
              width: 160px;
              height: 165px;
</style>
