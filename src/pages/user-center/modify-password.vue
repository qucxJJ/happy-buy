<template>
  <div class="modify-password">
    <div class="step-container">
      <el-steps :active="active" align-center>
        <el-step title="输入原密码">
          <i class="fa fa-lock" slot="icon"></i>
        </el-step>
        <el-step title="输入新密码">
          <i class="fa fa-lock" slot="icon"></i>
        </el-step>
        <el-step title="密码修改成功">
          <i class="fa fa-check" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
    <div class="box" v-show="active === 0">
      <div class="tip">请输入原密码：</div>
      <br>
      <label>原密码</label>
      <input type="password" placeholder="请输入您原来的密码" v-model="oldPassword"><br>
      <div class="btn-next" @click="checkOldPassword">下一步</div>
    </div>
    <div class="box" v-show="active === 1">
      <div class="tip">请输入新密码:</div>
      <br>
      <label>新密码</label>
      <input type="password" placeholder="请输入您的新密码" v-model="newPassword"><br>
      <div class="btn-next" @click="submitNewPassword">下一步</div>
    </div>
    <div class="box" v-show="active === 2">
      <div class="msg">
        密码修改成功啦~
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      active: 0,
      oldPassword: '',
      newPassword: ''
    };
  },
  methods: {
    checkOldPassword () {
      Service.check_old_password({oldPassword: this.oldPassword}).then(() => {
        this.active++;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    submitNewPassword () {
      Service.modify_password({newPassword: this.newPassword}).then(() => {
        this.active++;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
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
