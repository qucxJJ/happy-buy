<template>
  <div class="user-address">
    {{addressList}}
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      addressList: []
    };
  },
  created () {
    Service.get_address_list().then(data => {
      this.addressList = data;
      console.log(this.addressList);
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
