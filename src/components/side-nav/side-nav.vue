<template>
  <div class="nav-side">
    <div class="header">全部分类</div>
    <ul>
      <li v-for="(item,index ) in asideData" :key="index" class="name-list">
        <div class="title" @mouseover="currentIndex=index" @mouseout="handleMouseout">{{item.name.join(' / ')}} <i class="fa fa-angle-right more"></i></div>
        <div class="content" v-show="currentIndex === index" @mouseover="currentIndex=index" @mouseout="handleMouseout">
          <div class="item-list" v-for="(name, index1) in item.name" :key="index1">
            <h2 class="sub-title">{{name}}</h2>
            <div class="cate-con">
              <span
                v-for="(cate, index2) in item.list[index1]"
                :key="index2" class="item"
                @click="toProductList(cate)">
                {{cate}}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      currentIndex: '',
      asideData: []
    };
  },
  created () {
    this.getCategoryList();
  },
  methods: {
    handleMouseout () {
      this.currentIndex = '';
    },
    getCategoryList () {
      Service.get_category_list().then(data => {
        for (let i = 0; i < data.list.length; i += 3) {
          this.asideData.push({
            name: [data.list[i].categoryName, data.list[i + 1].categoryName, data.list[i + 2].categoryName],
            list: [data.list[i].children, data.list[i + 1].children, data.list[i + 2].children]
          });
        }
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    toProductList (keyword) {
      this.$router.push(`/product-list?keyword=${keyword}`);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable.styl';
.nav-side
  display: inline-block;
  width: 180px;
  height: 450px;
  position: relative;
  .header
    width: 220px;
    height: 45px;
    line-height: 45px;
    font-size: $font-size-normal-x;
    text-align: center;
    background: $color-theme;
    color: #fff;
  .name-list
    box-sizing: border-box;
    width: 220px;
    height: 45px;
    line-height: 45px;
    border-top: 1px solid #333;
    border-bottom: 1px solid #252525;
    text-align: center;
    font-size: $font-size-normal-x;
    cursor: pointer;
    color: #fff;
    background: #2b2b2b;
    .title
      position: relative;
      text-align: left;
      padding: 0 15px;
      font-size: $font-size-normal;
      .more
        display: inline-block;
        position: absolute;
        right: 15px;
        top: 13px;
    .content
      box-sizing: border-box;
      position: absolute
      left: 220px;
      top: 45px;
      width: 600px;
      height: 405px;
      padding: 20px;
      border: 1px solid $color-border;
      border-left: none;
      background: #fff;
      color: #000;
      .item-list
        margin-bottom: 20px;
        .sub-title
          height: 20px;
          line-height: 20px;
          text-align: left;
          padding-left: 10px;
          border-left: 3px solid $color-theme;
          margin-bottom: 10px;
          font-size: $font-size-normal;
          font-weight: bold;
          color: $color-theme;
        .cate-con
          text-align: left;
          .item
            display: inline-block;
            height: 18px;
            line-height: 18px;
            margin-right: 10px;
            font-size: $font-size-normal;
            cursor: pointer;
            color: $color-text;
            &:hover
              color: $color-theme;
</style>
