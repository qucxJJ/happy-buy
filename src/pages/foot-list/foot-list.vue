<template>
  <div class="foot-list">
    <detail-header></detail-header>
    <search></search>
    <breadcrumb :tags="breadData"></breadcrumb>
    <div class="main">
      <list-show
        :productData="footList"
        @detail="showProductDetail"
        @delete="showDialogConfirm"
        type="myinfo"></list-show>
    </div>
    <el-dialog title="删除收货地址" :visible.sync="dialogConfirmVisible" class="dialog">
      确认删除这条足迹信息吗？删除之后找起来很麻烦哦~
      <div slot="footer" class="dialog-footer">
        <span @click="dialogConfirmVisible = false" class="cancel">取 消</span>
        <span @click="deleteOne" class="confirm">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from '@/components/header/header.vue';
import Search from '@/components/search/search.vue';
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue';
import ListShow from '@/components/list-show/list-show.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    DetailHeader,
    Search,
    Breadcrumb,
    ListShow
  },
  data () {
    return {
      breadData: [
        {
          name: '我的足迹',
          path: ''
        }
      ],
      footList: [],
      deleteProductId: '',
      dialogConfirmVisible: false
    };
  },
  created () {
    this.getFootList();
  },
  methods: {
    getFootList () {
      Service.get_foot_list().then(data => {
        this.footList = data;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    showProductDetail (productId) {
      this.$router.push('/product-detail?productId=' + productId);
    },
    showDialogConfirm (productId) {
      this.dialogConfirmVisible = true;
      this.deleteProductId = productId;
    },
    deleteOne () {
      Service.delete_from_foot_list({
        productId: this.deleteProductId
      }).then(() => {
        Message.success({
          message: '删除成功'
        });
        this.getFootList();
        this.dialogConfirmVisible = false;
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
@import '~@/common/stylus/variable.styl'
.foot-list
  .main
    width: 1080px;
    margin: 0 auto;
  .dialog /deep/ .el-dialog
    .el-dialog__header
      border-bottom: 1px solid $color-theme;
    .dialog-footer
      span
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: $font-size-normal;
        box-sizing: border-box;
        border-radius: 3px;
        vertical-align: top;
        cursor: pointer;
        &.cancel
          color: $color-theme;
          border: 1px solid $color-theme;
        &.confirm
          color: #fff;
          background: $color-theme;
</style>
