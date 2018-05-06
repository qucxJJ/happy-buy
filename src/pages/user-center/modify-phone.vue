<template>
  <modify-safe-setting
    name="手机"
    icon="mobile-phone"
    input-type="text"
    success-tip="手机换绑成功啦~"
    :firstStepMethod="checkOldPhone"
    :secondStepMethod="submitNewPhone"></modify-safe-setting>
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
    checkOldPhone (phone) {
      if (!/^1\d{10}$/.test(phone)) {
        Message.error({
          message: '手机号码格式不正确哦~'
        });
        return false;
      }
      return Service.check_old_phone({oldPhone: phone});
    },
    submitNewPhone (phone) {
      if (!/^1\d{10}$/.test(phone)) {
        Message.error({
          message: '手机号码格式不正确哦~'
        });
        return false;
      }
      return Service.modify_phone({newPhone: phone});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
