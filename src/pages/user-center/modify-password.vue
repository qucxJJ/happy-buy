<template>
  <modify-safe-setting
    name="密码"
    icon="lock"
    input-type="password"
    success-tip="密码修改成功啦~"
    :firstStepMethod="checkOldPassword"
    :secondStepMethod="submitNewPassword"></modify-safe-setting>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { Message } from 'element-ui';
import ModifySafeSetting from '@/components/modify-safe-setting/modify-safe-setting.vue';
export default {
  components: {
    ModifySafeSetting
  },
  methods: {
    checkOldPassword (password) {
      return Service.check_old_password({oldPassword: password});
    },
    submitNewPassword (password) {
      if (password.length < 6 || password.length > 20) {
        Message.error({
          message: '密码长度不正确哦~'
        });
        return false;
      }
      return Service.modify_password({newPassword: password});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.modify-password
  .step-container
    padding: 30px 10px 10px 10px;
  .box
    padding: 20px;
    text-align: center;
    font-size: 0;
    .tip
      display: inline-block;
      width: 400px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
      font-size: $font-size-normal;
      text-align: left;
      color: $color-text
    label
      box-sizing: border-box;
      display: inline-block;
      width: 100px;
      height: 50px;
      line-height: 50px;
      border: 1px solid $color-border;
      border-right: none;
      text-align: center;
      vertical-align: top;
      font-size: $font-size-normal;
      color: $color-text;
      background: #fff;
    input
      box-sizing: border-box;
      width: 300px;
      height: 50px;
      margin-bottom: 20px;
      border: 1px solid $color-border;
      border-left: none;
      padding-left: 10px;
      font-size: $font-size-normal;
      outline: none;
    .btn-next
      display: inline-block;
      width: 400px;
      height: 50px;
      line-height: 50px;
      font-size: $font-size-normal-x;
      cursor: pointer;
      color: #fff;
      background: $color-theme;
    .msg
      color: $color-text;
      font-size: $font-size-large;
      text-align: center;
      .to-btn
        color: $color-theme;
        font-weight: bold;
</style>
