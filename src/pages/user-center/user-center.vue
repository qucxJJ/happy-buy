<template>
  <div class="user-center">
    <breadcrumb :tags="breadData"></breadcrumb>
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
              <router-link to="/user-center/order-list">订单管理</router-link>
            </li>
          </ul>
        </li>
        <li class="aside-group">
          <ul class="group">
            <li class="menu">
              <h2 class="title">我的足迹</h2>
            </li>
            <li class="menu">
              <router-link to="/collection-list">收藏</router-link>
            </li>
            <li class="menu">
              <router-link to="/foot-list">足迹</router-link>
            </li>
            <li class="menu">
              <router-link to="/user-center/eval-list">评价</router-link>
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
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      breadData: [
        {
          name: '个人中心',
          path: '/user-center/center'
        }
      ]
    };
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'userName',
      'avatar'
    ])
  },
  created () {
    this.changeBreadData(this.$route.path);
  },
  watch: {
    '$route.path' (newVal) {
      this.changeBreadData(newVal);
    }
  },
  methods: {
    changeBreadData (newVal) {
      switch (newVal) {
        case '/user-center/info':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '个人信息',
              path: ''
            }];
          break;
        case '/user-center/safe':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '安全设置',
              path: ''
            }];
          break;
        case '/user-center/safe/modify-password':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '安全设置',
              path: '/user-center/safe'
            },
            {
              name: '修改密码',
              path: ''
            }];
          break;
        case '/user-center/safe/modify-phone':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '安全设置',
              path: '/user-center/safe'
            },
            {
              name: '修改手机',
              path: ''
            }];
          break;
        case '/user-center/safe/modify-email':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '安全设置',
              path: '/user-center/safe'
            },
            {
              name: '修改邮箱',
              path: ''
            }];
          break;
        case '/user-center/safe/modify-question':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '安全设置',
              path: '/user-center/safe'
            },
            {
              name: '修改安全问题',
              path: ''
            }];
          break;
        case '/user-center/address':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '收货地址',
              path: ''
            }];
          break;
        case '/user-center/order-list':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '订单管理',
              path: ''
            }];
          break;
        case '/user-center/eval-list':
          this.breadData = [
            {
              name: '个人中心',
              path: '/user-center/center'
            },
            {
              name: '评价',
              path: ''
            }];
          break;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'
.user-center
  width: 100%;
  .main
    width: 1080px;
    margin: 10px auto 0;
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
