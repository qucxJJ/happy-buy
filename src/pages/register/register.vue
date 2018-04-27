<template>
  <div class="register-container">
    <simple-header word="欢迎注册"></simple-header>
    <div class="main">
      <ul class="form-container">
        <li class="form-item" v-for="(item, index) in infoArr" :key="index">
          <label>{{item.label}}</label>
          <input :type="item.type" class="info" :placeholder="item.placeholder" v-model="user[item.model]" @keyup="checkInfo(item.model)">
          <span class="tip">{{item.tip}}</span>
          <div
            class="check-info"
            :class="{'green': item.checkInfo.type === 1, 'red': item.checkInfo.type === 2}"
            v-show="item.checkInfo.txt">
            <i class="fa"
               :class="{'fa-check-circle green': item.checkInfo.type === 1, 'fa-info-circle': item.checkInfo.type === 2}"
               v-show="item.checkInfo.type"></i>
            {{item.checkInfo.txt}}
          </div>
        </li>
        <li class="form-item">
          <div class="sub-btn" @click="submitRegister">立即注册</div>
        </li>
      </ul>
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
      infoArr: [
        {
          label: '用户名',
          placeholder: '您的账户名和登录名',
          type: 'text',
          tip: '支持中文、字母、数字、"_"、"-"的组合，4-20个字符',
          model: 'userName',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '设置密码',
          placeholder: '建议至少使用两种字符组合',
          type: 'password',
          tip: '建议使用字母、数字和符号两种及以上的组合，6-20个字符',
          model: 'password',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '确认密码',
          placeholder: '请再次输入密码',
          type: 'password',
          tip: '请再次输入密码',
          model: 'passwordAgain',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '手机号码',
          placeholder: '建议使用常用手机',
          type: 'text',
          tip: '绑定手机号码',
          model: 'phone',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '电子邮箱',
          placeholder: '建议使用常用邮箱',
          type: 'text',
          tip: '绑定邮箱',
          model: 'email',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '密保问题',
          placeholder: '用于找回密码的问题',
          type: 'text',
          tip: '该问题可用于找回密码和密码重置',
          model: 'question',
          checkInfo: {txt: '', type: ''}
        },
        {
          label: '问题答案',
          placeholder: '请输入问题的答案',
          type: 'text',
          tip: '密保问题的答案',
          model: 'answer',
          checkInfo: {txt: '', type: ''}
        }
      ],
      user: {
        userName: '',
        password: '',
        passwordAgain: '',
        phone: '',
        email: '',
        question: '',
        answer: ''
      }
    };
  },
  components: {
    SimpleHeader
  },
  methods: {
    checkInfo (info) {
      switch (info) {
        case 'userName':
          Service.check_name_avail({userName: this.user.userName}).then(data => {
            this.validateUsername();
          }).catch(res => {
            if (res.errNo === 1) {
              this.infoArr[0].checkInfo.txt = '用户名已存在';
              this.infoArr[0].checkInfo.type = 2;
            }
          });
          break;
        case 'password':
          this.validatePassword();
          break;
        case 'passwordAgain':
          this.validatePasswordAgain();
          break;
        case 'phone':
          let flag = this.validatePhone();
          if (flag) {
            Service.check_phone_avail({phone: this.user.phone}).then(() => {
              this.infoArr[3].checkInfo.txt = '手机号码可用';
              this.infoArr[3].checkInfo.type = 1;
            }).catch(res => {
              if (res.errNo === 1) {
                this.infoArr[3].checkInfo.txt = res.errStr;
                this.infoArr[3].checkInfo.type = 2;
              }
            });
          }
          break;
        case 'email':
          let eFlag = this.validateEmail();
          if (eFlag) {
            Service.check_email_avail({email: this.user.email}).then(() => {
              this.infoArr[4].checkInfo.txt = '邮箱可用';
              this.infoArr[4].checkInfo.type = 1;
            }).catch(res => {
              if (res.errNo === 1) {
                this.infoArr[4].checkInfo.txt = res.errStr;
                this.infoArr[4].checkInfo.type = 2;
              }
            });
          }
          break;
      }
    },
    validateUsername () {
      if (!/[\u4e00-\u9fa5_\-a-zA-Z0-9]/.test(this.user.userName)) {
        this.infoArr[0].checkInfo.txt = '用户名格式不正确哦~';
        this.infoArr[0].checkInfo.type = 2;
        return false;
      } else if (this.user.userName.length < 4 || this.user.userName.length > 20) {
        this.infoArr[0].checkInfo.txt = '用户名长度不正确哦~';
        this.infoArr[0].checkInfo.type = 2;
        return false;
      } else {
        this.infoArr[0].checkInfo.txt = '用户名可用';
        this.infoArr[0].checkInfo.type = 1;
        return true;
      }
    },
    validatePassword () {
      if (this.user.password.length < 6 || this.user.password.length > 20) {
        this.infoArr[1].checkInfo.txt = '密码长度不正确哦~';
        this.infoArr[1].checkInfo.type = 2;
        return false;
      } else {
        this.infoArr[1].checkInfo.txt = '密码格式正确';
        this.infoArr[1].checkInfo.type = 1;
        return true;
      }
    },
    validatePasswordAgain () {
      if (this.infoArr[1].checkInfo.type === 2) {
        this.infoArr[2].checkInfo.txt = '第一次输入的密码还未改正哦~';
        this.infoArr[2].checkInfo.type = 2;
        return false;
      } else if (this.user.password !== this.user.passwordAgain) {
        this.infoArr[2].checkInfo.txt = '两次输入的密码不相同哦~';
        this.infoArr[2].checkInfo.type = 2;
        return false;
      } else {
        this.infoArr[2].checkInfo.txt = '两次输入的密码相同';
        this.infoArr[2].checkInfo.type = 1;
        return true;
      }
    },
    validatePhone () {
      if (!/^1\d{10}$/.test(this.user.phone)) {
        this.infoArr[3].checkInfo.txt = '手机号码格式不正确哦~';
        this.infoArr[3].checkInfo.type = 2;
        return false;
      }
      return true;
    },
    validateEmail () {
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.user.email)) {
        this.infoArr[4].checkInfo.txt = '邮箱格式不正确哦~';
        this.infoArr[4].checkInfo.type = 2;
        return false;
      }
      return true;
    },
    submitRegister () {
      for (let key in this.user) {
        if (!this.user[key]) {
          Message.error({
            message: '请完善必填信息哦~'
          });
          return;
        }
      }
      if (!this.validateUsername() || !this.validatePassword() || !this.validatePasswordAgain() || !this.validatePhone() || !this.validateEmail()) {
        Message.error({
          message: '请检查必填信息格式是否正确~'
        });
        // eslint-disable-next-line
        return;
      } else {
        Service.register(Object.assign({}, this.user, {createTime: Date.now()})).then(() => {
          Message.success({
            message: '注册成功'
          });
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        }).catch(res => {
          if (res.errNo === 1) {
            Message.error({
              message: '注册失败'
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.register-container
  width: 100%;
  min-width: 1080px;
  .main
    box-sizing: border-box;
    width: 100%;
    border-top: 1px solid $color-border;
    .form-container
      width: 800px;
      padding: 40px;
      margin: 0 auto;
      .form-item
        height: 80px;
        margin-bottom: 30px;
        font-size: 0;
        label
          display: inline-block;
          box-sizing: border-box;
          width: 110px;
          height: 50px;
          line-height: 50px;
          border: 1px solid $color-border;
          border-right: none;
          padding-left: 20px;
          vertical-align: top
          text-align: justify;
          font-size: $font-size-normal;
          color: $color-text;
        .info
          box-sizing: border-box;
          width: 300px;
          height: 50px;
          line-height: 50px;
          padding-left: 10px;
          border: 1px solid $color-border;
          border-left: none;
          outline: none;
          font-size: $font-size-normal;
          color: $color-text;
        .tip
          display: inline-block;
          height: 50px;
          line-height: 50px;
          margin-left: 20px;
          font-size: $font-size-normal;
          color: $color-tip;
        .sub-btn
          width: 410px;
          height: 50px;
          line-height: 50px;
          font-size: $font-size-normal-x;
          font-weight: bold;
          text-align: center
          cursor: pointer;
          color: #fff;
          background: $color-theme;
        .check-info
          font-size: $font-size-small;
          height: 30px;
          width: 410px;
          line-height: 30px;
          text-align: center
          &.green
            color: #5daf34;
          &.red
            color: $color-theme;
</style>
