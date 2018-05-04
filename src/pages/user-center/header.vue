<template>
  <div class="tab-header">
    {{name}}/ <span>{{enName}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    enName: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.tab-header
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  line-height: 70px;
  padding: 0 10px;
  border-bottom: 1px solid $color-theme;
  font-size: $font-size-large;
  color: #000;
</style>
