<template>
  <div class="user-safe">
    <div class="safe-con">
      <tab-header name="安全设置" en-name="Set up Safety"></tab-header>
      <ul class="safe-list">
        <li class="safe-item">
          <div class="left">
            <i class="fa fa-lock"></i>
          </div>
          <div class="middle">
            <h2 class="name">登录密码</h2>
            <p class="tip">为保证您购物安全，建议您定期更改密码以保护账户安全。</p>
          </div>
          <div class="right">
            <router-link class="btn" to="/user-center/safe/modify-password" tag="div">修改</router-link>
          </div>
        </li>
        <li class="safe-item">
          <div class="left">
            <i class="fa fa-mobile-phone"></i>
          </div>
          <div class="middle">
            <h2 class="name">手机验证</h2>
            <p class="tip">您验证的手机：{{phone}} 若已丢失或停用，请立即更换。</p>
          </div>
          <div class="right">
            <router-link class="btn" to="/user-center/safe/modify-phone" tag="div">换绑</router-link>
          </div>
        </li>
        <li class="safe-item">
          <div class="left">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="middle">
            <h2 class="name">邮箱验证</h2>
            <p class="tip">您验证的邮箱：{{email}} 可用于快速找回登录密码。</p>
          </div>
          <div class="right">
            <router-link class="btn" to="/user-center/safe/modify-email" tag="div">换绑</router-link>
          </div>
        </li>
        <li class="safe-item">
          <div class="left">
            <i class="fa fa-briefcase"></i>
          </div>
          <div class="middle">
            <h2 class="name">安全问题</h2>
            <p class="tip">保护账户安全，验证您身份的工具之一。</p>
          </div>
          <div class="right">
            <router-link class="btn" to="/user-center/safe/modify-question" tag="div">修改</router-link>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import TabHeader from './header.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      phone: '',
      email: ''
    };
  },
  components: {
    TabHeader
  },
  created () {
    Service.get_email_phone().then(data => {
      this.phone = data.phone;
      this.email = data.email;
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.user-safe
  position: relative;
  .safe-con
    .safe-list
      .safe-item
        height: 100px;
        line-height: 100px;
        display: flex;
        padding: 30px 20px;
        box-sizing: border-box;
        .left
          flex: 0 0 40px;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          border-radius: 20px;
          text-align: center;
          color: #fff;
          background: $color-theme;
        .middle
          flex: 1;
          height: 40px;
          padding-left: 20px;
          .name
            height: 20px;
            line-height: 20px;
            font-size: $font-size-normal-x;
            font-weight: bold;
          .tip
            height: 15px;
            line-height: 15px;
            margin-top: 5px;
            font-size: $font-size-normal;
        .right
          flex: 0 0 100px;
          height: 30px;
          line-height: 30px;
          margin-top: 5px;
          text-align: center;
          background: $color-theme;
          color: #fff;
          font-size: $font-size-normal;
          cursor: pointer;
</style>
