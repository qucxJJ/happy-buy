<template>
  <div class="breadcrumb">
    <div class="stable-width">
      <el-breadcrumb separator-class="fa fa-angle-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(tag, index) in tags" :key="index" :to="{ path: tag.path }">{{tag.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    tags: {
      type: Array,
      default: function () {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable.styl';
.breadcrumb
  width: 100%;
  height: 50px;
  border-top: 2px solid $color-theme;
  .stable-width
    width: 1080px;
    margin: 0 auto;
    & /deep/ .el-breadcrumb
      height: 50px;
      line-height: 50px;
      .el-breadcrumb__inner
        font-size: $font-size-normal;
</style>
