<template>
  <modify-safe-setting
    name="邮箱"
    icon="envelope"
    input-type="text"
    success-tip="邮箱换绑成功啦~"
    :firstStepMethod="checkOldEmail"
    :secondStepMethod="submitNewEmail"></modify-safe-setting>
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
    checkOldEmail (email) {
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
        Message.error({
          message: '邮箱格式不正确哦~'
        });
        return false;
      }
      return Service.check_old_email({oldEmail: email});
    },
    submitNewEmail (email) {
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
        Message.error({
          message: '邮箱格式不正确哦~'
        });
        return false;
      }
      return Service.modify_email({newEmail: email});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
