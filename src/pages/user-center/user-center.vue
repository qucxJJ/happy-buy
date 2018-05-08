<template>
  <div class="user-center">
    <detail-header></detail-header>
    <div class="main">
      <ul class="aside">
        <li class="aside-group">
          <h2 class="title">
            <router-link to="/user-center/center">个人中心</router-link>
          </h2>
        </li>
        <li class="aside-group">
          <ul class="group">
            <li class="menu">
              <h2 class="title">个人资料</h2>
            </li>
            <li class="menu">
              <router-link to="/user-center/info">个人信息</router-link>
            </li>
            <li class="menu">
              <router-link to="/user-center/safe">安全设置</router-link>
            </li>
            <li class="menu">
              <router-link to="/user-center/address">收货地址</router-link>
            </li>
          </ul>
        </li>
        <li class="aside-group">
          <ul class="group">
            <li class="menu">
              <h2 class="title">我的交易</h2>
            </li>
            <li class="menu">
              <router-link to="/user-center/order">订单管理</router-link>
            </li>
          </ul>
        </li>
        <li class="aside-group">
          <ul class="group">
            <li class="menu">
              <h2 class="title">我的足迹</h2>
            </li>
            <li class="menu">
              <router-link :to="{path: '/user-center/collection'}">收藏</router-link>
            </li>
            <li class="menu">
              <router-link to="/user-center/foot">足迹</router-link>
            </li>
            <li class="menu">
              <router-link to="/user-center/evaluation">评价</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    DetailHeader
  },
  computed: {
    ...mapGetters([
      'userName',
      'avatar'
    ])
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'
.user-center
  width: 100%;
  .main
    width: 1080px;
    margin: 30px auto 0;
    .aside
      display: inline-block;
      width: 150px;
      background: #eee;
      border-top: 3px solid $color-theme;
      padding: 0 10px;
      margin-right: 20px;
      .aside-group
        .router-link-active
          color: $color-theme;
        .title
          height: 50px;
          line-height: 50px;
          font-size: $font-size-normal;
          text-align: center;
          .a
            color: $color-text;
            &:hover
              color: $color-theme;
        .group
          width: 100%;
          padding: 10px 0;
          border-top:  1px solid $color-border;
          .menu
            height: 40px;
            line-height: 40px;
            font-size: $font-size-normal;
            text-align: center;
            .router-link-active
              color: $color-theme;
            a
              color: $color-text;
              &:hover
                color: $color-theme;
            .title
              font-weight: bold;
              color: #000;
    .content
      display: inline-block;
      width: 885px;
      vertical-align: top;
      background: #eee;
      min-height: 516px;
</style>
