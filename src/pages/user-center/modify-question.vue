<template>
  <div class="modify-question">
    <div class="header">
      <i class="fa fa-angle-left" @click="toSafe"></i>修改安全问题
    </div>
    <div class="step-container">
      <el-steps :active="active" align-center>
        <el-step title="验证安全问题答案">
          <i class="fa fa-question" slot="icon"></i>
        </el-step>
        <el-step title="输入新安全问题和答案">
          <i class="fa fa-question" slot="icon"></i>
        </el-step>
        <el-step title="安全问题修改成功">
          <i class="fa fa-check" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
    <div class="box" v-show="active === 0">
      <div class="tip">您现在的安全问题为 <span class="question">{{oldQuestion}}</span>，请输入安全问题答案验证身份：</div>
      <br>
      <label>答案</label>
      <input type="text" placeholder="请输入您的安全问题的答案" v-model="oldAnswer"><br>
      <div class="btn-next" @click="checkOldAnswer">下一步</div>
    </div>
    <div class="box" v-show="active === 1">
      <div class="tip">请输入新的安全问题和答案:</div>
      <br>
      <label>安全问题</label>
      <input type="text" placeholder="'请输入新的安全问题" v-model="newQuestion"><br>
      <label>答案</label>
      <input type="text" placeholder="'请输入问题的答案" v-model="newAnswer"><br>
      <div class="btn-next" @click="submitNewQuestion">下一步</div>
    </div>
    <div class="box" v-show="active === 2">
      <div class="msg">
        安全问题修改成功啦~
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
      oldQuestion: '',
      oldAnswer: '',
      newQuestion: '',
      newAnswer: '',
      active: 0
    };
  },
  created () {
    Service.get_old_question().then(data => {
      this.oldQuestion = data;
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
  },
  methods: {
    toSafe () {
      this.$router.push('/user-center/safe');
    },
    checkOldAnswer () {
      if (!this.oldAnswer) {
        Message.error({
          message: '请输入答案'
        });
        return;
      }
      Service.check_old_answer({oldAnswer: this.oldAnswer}).then(() => {
        this.active++;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    submitNewQuestion () {
      if (!this.newQuestion) {
        Message.error({
          message: '请输入安全问题'
        });
        return;
      }
      if (!this.newAnswer) {
        Message.error({
          message: '请输入答案'
        });
        return;
      }
      Service.modify_question_and_answer({question: this.newQuestion, answer: this.newAnswer}).then(() => {
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
.modify-question
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
      .question {
        color: $color-theme;
        font-weight: bold;
      }
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
