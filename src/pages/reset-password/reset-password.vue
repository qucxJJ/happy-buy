<template>
  <div class="reset-container">
    <simple-header word="找回密码"></simple-header>
    <div class="main">
      <div class="step-container">
        <el-steps :active="active" align-center>
          <el-step title="输入用户名">
            <i class="fa fa-user-o" slot="icon"></i>
          </el-step>
          <el-step title="密码提示问题">
            <i class="fa fa-question" slot="icon"></i>
          </el-step>
          <el-step title="输入新密码">
            <i class="fa fa-lock" slot="icon"></i>
          </el-step>
          <el-step title="密码重置成功">
            <i class="fa fa-check" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
      <div class="box" v-show="active === 0">
        <div class="tip">请输入用户名:</div>
        <br>
        <label>用户名</label>
        <input type="text" placeholder="请输入您的用户名" v-model="userName"><br>
        <div class="btn-next" @click="submitUserName">下一步</div>
      </div>
      <div class="box" v-show="active === 1">
        <div class="tip">密保问题为: {{question}}</div>
        <br>
        <div class="tip">请输入问题的答案：</div>
        <br>
        <label>答案</label>
        <input type="text" placeholder="请输入您的答案" v-model="answer"><br>
        <div class="btn-next" @click="submitAnswer">下一步</div>
      </div>
      <div class="box" v-show="active === 2">
        <div class="tip">请输入新密码:</div>
        <br>
        <label>密码</label>
        <input type="password" placeholder="请输入您的新密码" v-model="password"><br>
        <div class="btn-next" @click="submitNewPassword">下一步</div>
      </div>
      <div class="box" v-show="active === 3">
        <div class="msg">
          密码重置成功啦~&nbsp;&nbsp;
          <router-link class="to-btn" to="/login">去登陆</router-link>
          看看吧~
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SimpleHeader from '@/components/simple-header/simple-header.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      active: 0,
      userName: '',
      question: '',
      answer: '',
      password: ''
    };
  },
  components: {
    SimpleHeader
  },
  methods: {
    submitUserName () {
      if (!this.userName) {
        Message.error({
          message: '请输入用户名哦~'
        });
      } else {
        Service.get_reset_question({userName: this.userName}).then(data => {
          this.question = data.question;
          this.active++;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    submitAnswer () {
      if (!this.answer) {
        Message.error({
          message: '请输入答案哦~'
        });
      } else {
        Service.check_reset_answer({userName: this.userName, answer: this.answer}).then(() => {
          this.active++;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    submitNewPassword () {
      if (!this.password) {
        Message.error({
          message: '请输入新密码~'
        });
      } else {
        Service.reset_password({userName: this.userName, password: this.password}).then(() => {
          this.active++;
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.reset-container
  width: 100%;
  min-width: 1080px;
  .main
    box-sizing: border-box;
    width: 100%;
    padding: 40px;
    border-top: 1px solid $color-border;
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
        color: $color-text
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
