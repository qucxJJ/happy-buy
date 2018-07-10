<template>
  <div class="user-info">
    <tab-header name="个人信息" en-name="Personal information"></tab-header>
    <ul class="info-list">
      <li class="info-item">
        <label>用户名</label>
        <input type="text" disabled v-model="userName">
      </li>
      <li class="info-item">
        <label>头像</label>
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="newAvatar.url" :src="newAvatar.url" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </li>
      <li class="info-item">
        <label>真实姓名</label>
        <input type="text" v-model="realName">
      </li>
      <li class="info-item">
        <label>性别</label>
        <input type="radio" name="sex" v-model="sex" :value="1">男
        <input type="radio" name="sex" v-model="sex" :value="2">女
      </li>
      <li class="info-item">
        <label>生日</label>
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </li>
      <li class="info-item">
        <div class="submit" @click="submitEdit">提交</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex';
import TabHeader from './header.vue';
import config from '@/common/js/config.js';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    TabHeader
  },
  data () {
    return {
      realName: '',
      sex: '',
      birthday: '',
      newAvatar: {
        name: '',
        url: ''
      },
      uploadAction: config.upLoadAvatarUrl
    };
  },
  computed: {
    ...mapGetters([
      'userName',
      'avatar'
    ])
  },
  created () {
    Service.get_user_extra_data().then(data => {
      this.newAvatar.url = data.avatar.url;
      console.log(this.newAvatar);
      this.newAvatar.name = data.avatar.name;
      this.realName = data.realName;
      this.sex = data.sex;
      this.birthday = data.birthday ? new Date(data.birthday) : '';
    });
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.newAvatar.url = URL.createObjectURL(file.raw);
      this.newAvatar.name = res.data;
    },
    submitEdit () {
      let birth = this.birthday ? new Date(this.birthday).getTime() : '';
      Service.set_user_extra_data({
        avatar: this.newAvatar.name,
        realName: this.realName,
        sex: this.sex,
        birthday: birth
      }).then(() => {
        this.setAvatar(`${config.host}${config.avatarPath}${this.newAvatar.name}`);
        Message.success({
          message: '修改成功'
        });
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    ...mapMutations({
      'setAvatar': 'SET_AVATAR'
    })
  },
  watch: {
    avatar (newVal) {
      this.newAvatar.url = newVal;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.user-info
  .info-list
    padding: 30px 20px;
    .info-item
      font-size: $font-size-normal;
      label
        display: inline-block;
        width: 100px;
        height: 80px;
        line-height: 80px;
        margin-right: 30px;
        font-size: $font-size-normal;
        font-weight: bold;
        text-align: right;
        color: #000;
      .avatar-uploader
        display: inline-block
        width: 100px;
        height: 100px;
        img
          display: inline-block;
          vertical-align: middle
          width: 100px;
          height: 100px;
      input[type='text']
        box-sizing: border-box;
        width: 220px;
        height: 40px;
        bordr-radius: 3px;
        padding-left: 10px;
      input[type='radio']
        margin: 0 10px 0 15px;
      .submit
        width: 220px;
        height: 40px;
        line-height: 40px;
        margin: 20px 0 0 135px;
        background: $color-theme;
        font-size: $font-size-normal-x;
        text-align: center;
        color: #fff;
        cursor: pointer;
</style>
