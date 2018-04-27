<template>
  <div class="detail-header">
    <div class="stable-width">
      <div class="user-info" v-show="!isLogin">
        <span class="btn" @click="login">亲，请登录</span>
        <span class="btn" @click="register">免费注册</span>
      </div>
      <div class="user-info" v-show="isLogin">
        <span class="btn">{{userName}}</span>
        <span class="btn" @click="logout">退出</span>
      </div>
      <ul class="right-list">
        <li>购物车（{{cartNum}}）</li>
        <li>个人中心</li>
        <li>收藏夹</li>
        <li>关于我们</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import {mapGetters, mapMutations} from 'vuex';
export default {
  data () {
    return {
      isLogin: false,
      cartNum: 0
    };
  },
  mounted () {
    Service.get_user_info().then(data => {
      this.setUserName(data.userName);
      this.cartNum = data.cartNum;
      this.isLogin = true;
    }).catch(res => {
      if (res.errNo && res.errNum === 1) {
        this.userName = '';
        this.cartNum = 0;
        this.isLogin = false;
      }
    });
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  methods: {
    login () {
      this.$router.push('/login');
    },
    logout () {
      Service.logout().then((data) => {
        this.setUserName('');
        this.cartNum = 0;
        this.isLogin = false;
      });
    },
    register () {
      this.$router.push('/register');
    },
    ...mapMutations({
      'setUserName': 'SET_USER_NAME'
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
