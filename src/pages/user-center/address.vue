<template>
  <div class="user-address">
    <tab-header name="地址管理" en-name="Address manage"></tab-header>
    <address-model></address-model>
  </div>
</template>

<script type="text/ecmascript-6">
import TabHeader from './header.vue';
import AddressModel from '@/components/address-model/address-model.vue';
export default {
  components: {
    TabHeader,
    AddressModel
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
