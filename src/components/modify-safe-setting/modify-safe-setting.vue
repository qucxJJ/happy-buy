<template>
  <div class="modify-frame">
    <div class="header">
      <i class="fa fa-angle-left" @click="toSafe"></i>修改{{name}}
    </div>
    <div class="step-container">
      <el-steps :active="active" align-center>
        <el-step :title="'输入原' + name">
          <i class="fa" :class="'fa-' + icon" slot="icon"></i>
        </el-step>
        <el-step :title="'输入新' + name">
          <i class="fa" :class="'fa-' + icon" slot="icon"></i>
        </el-step>
        <el-step :title="name + '修改成功'">
          <i class="fa fa-check" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
    <div class="box" v-show="active === 0">
      <div class="tip">请输入原{{name}}：</div>
      <br>
      <label>原{{name}}</label>
      <input :type="inputType" :placeholder="'请输入您原来的' + name" v-model="firstData"><br>
      <div class="btn-next" @click="handleFirstStep">下一步</div>
    </div>
    <div class="box" v-show="active === 1">
      <div class="tip">请输入新密码:</div>
      <br>
      <label>新{{name}}</label>
      <input :type="inputType" :placeholder="'请输入您的新' + name" v-model="secondData"><br>
      <div class="btn-next" @click="handleSecondStep">下一步</div>
    </div>
    <div class="box" v-show="active === 2">
      <div class="msg">
        {{successTip}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Message } from 'element-ui';
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    successTip: {
      type: String,
      default: ''
    },
    firstStepMethod: {
      type: Function,
      default: function () {
      }
    },
    secondStepMethod: {
      type: Function,
      default: function () {
      }
    }
  },
  data () {
    return {
      firstData: '',
      secondData: '',
      active: 0
    };
  },
  methods: {
    toSafe () {
      this.$router.push('/user-center/safe');
    },
    handleFirstStep () {
      if (!this.firstData) {
        Message.error({
          message: `请输入原${this.name}`
        });
        return;
      }
      let result = this.firstStepMethod(this.firstData);
      if (result) {
        result.then(() => {
          this.active++;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    handleSecondStep () {
      if (!this.secondData) {
        Message.error({
          message: `请输入新${this.name}`
        });
        return;
      }
      let result = this.secondStepMethod(this.secondData);
      if (result) {
        result.then(() => {
          this.active++;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.modify-frame
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  .header
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 10px;
    border-bottom: 1px solid $color-theme;
    font-size: $font-size-large;
    color: #000;
    i
      font-size: 22px;
      margin-right: 10px;
      font-weight: bold;
      cursor: pointer;
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
