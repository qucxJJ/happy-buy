<template>
  <div class="detail-header">
    <div class="stable-width">
      <div class="user-info" v-show="!isLogin">
        <span class="btn" @click="login">亲，请登录</span>
        <span class="btn" @click="register">免费注册</span>
      </div>
      <div class="user-info" v-show="isLogin">
        <span class="btn">欢迎 {{userName}}</span>
        <span class="btn" @click="logout">退出</span>
      </div>
      <ul class="right-list">
        <li @click="toIndex">首页</li>
        <li @click="toShopCart">购物车（{{cartNum}}）</li>
        <li @click="toUserCenter">个人中心</li>
        <li @click="toCollectionList">收藏夹</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import {mapGetters, mapMutations} from 'vuex';
export default {
  mounted () {
    Service.get_user_info().then(data => {
      this.setUserName(data.userName);
      this.setCartNum(data.cartNum);
      this.setAvatar(data.avatar);
      this.setIsLogin(true);
    }).catch(res => {
      if (res.errNo && res.errNum === 1) {
        this.setUserName('');
        this.setCartNum(0);
        this.setAvatar('');
        this.setIsLogin(false);
      }
    });
  },
  computed: {
    ...mapGetters([
      'userName',
      'cartNum',
      'isLogin'
    ])
  },
  methods: {
    login () {
      this.$router.push('/login');
    },
    logout () {
      Service.logout().then(() => {
        this.setUserName('');
        this.setCartNum(0);
        this.setAvatar('');
        this.setIsLogin(false);
      });
      this.$router.push('/');
    },
    register () {
      this.$router.push('/register');
    },
    toIndex () {
      this.$router.push('/');
    },
    toUserCenter () {
      this.userName ? this.$router.push('/user-center') : this.$router.push('/login');
    },
    toCollectionList () {
      this.userName ? this.$router.push('/collection-list') : this.$router.push('/login');
    },
    toShopCart () {
      this.userName ? this.$router.push('/shop-cart') : this.$router.push('/login');
    },
    ...mapMutations({
      'setUserName': 'SET_USER_NAME',
      'setCartNum': 'SET_CART_NUM',
      'setAvatar': 'SET_AVATAR',
      'setIsLogin': 'SET_IS_LOGIN'
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.detail-header
  wdith: 100%;
  height: 36px;
  background: #eee;
  .stable-width
    position: relative;
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    .user-info
      display: inline-block;
      .btn
        height: 100%;
        line-height: 36px;
        margin-right: 10px;
        font-size: $font-size-small;
        color: #3c3c3c;
        cursor: pointer;
    .right-list
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      li
        display: inline-block;
        margin-left: 10px;
        height: 100%;
        line-height: 36px;
        font-size: $font-size-small;
        color: #3c3c3c;
        cursor: pointer;
</style>
