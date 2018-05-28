<template>
  <div class="eval-list">
    <tab-header name="评价列表" en-name="Evaluation list"></tab-header>
    <table>
      <thead>
      <tr>
        <th>评价</th>
        <th>商品</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in evalList" :key="index">
        <td>
          <p class="content">
            <span class="type" :class="'type' + item.type">{{evalType[item.type - 1].txt}}</span>
            {{item.content.length ? item.content : '无评价内容'}}
          </p>
          <ul>
            <li v-for="(pic, index1) in item.pics" :key="index1"><img :src="pic" alt=""></li>
          </ul>
          <div class="time">{{getDate(item.createTime)}}</div>
        </td>
        <td>
          <img :src="item.productInfo.pic" alt="">
          <router-link tag="div" :to="'/product-detail?productId=' + item.productId" class="name">{{item.productInfo.productName}}</router-link>
          <div class="info">
            <p class="attr">颜色分类：{{item.productInfo.attr}}</p>
            <p class="attr">尺码：{{item.productInfo.size}}</p>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
import TabHeader from './header.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    TabHeader
  },
  data () {
    return {
      evalList: [],
      evalType: [{
        value: 1,
        txt: '好评'
      }, {
        value: 2,
        txt: '中评'
      }, {
        value: 3,
        txt: '差评'
      }]
    };
  },
  created () {
    Service.get_user_eval().then(data => {
      this.evalList = data;
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
  },
  methods: {
    getDate (time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 + '';
      let day = date.getDate() + '';
      let hour = date.getHours() + '';
      let minutes = date.getMinutes() + '';
      let seconds = date.getSeconds() + '';
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
.eval-list
  table
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    thead
      tr
        height: 40px;
        line-height: 40px;
        background: #666;
        color: #fff;
        th
          font-size: $font-size-normal;
    tbody
      tr
        border-bottom: 1px solid $color-border;
        td
          &:nth-child(1)
            width: 40%;
          &:nth-child(2)
            width: 60%;
        td
          padding: 10px 0 30px 0;
          font-size: 0;
          position: relative
          .content
            display: inline-block;
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            font-size: $font-size-normal;
            vertical-align: top;
            .type
              display: inline-block;
              width: 50px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              border-radius: 3px;
              &.type1
                background: $color-theme;
                color: #fff;
              &.type2
                background: #f4ac14;
                color: #fff;
              &.type3
                background: #969186;
                color: #fff;
          ul
            width: 100%;
            padding: 0 10px;
            li
              display: inline-block;
              width: 40px;
              height: 40px;
              img
                width: 40px;
                height: 40px;
          .time
            padding: 5px 10px;
            font-size: $font-size-small;
            color: #666;
            position: absolute;
            left: 0;
            bottom: 3px;
          img
            width: 80px;
            height: 80px;
          .name
            display: inline-block;
            width: 250px;
            text-align: left;
            vertical-align: top;
            padding: 15px 0 0 0;
            margin-left: 15px;
            font-size: $font-size-normal;
            line-height: 20px;
            color: #333;
            cursor: pointer;
          .info
            display: inline-block;
            width: 150px;
            vertical-align: top;
            .attr
              display: inline-block;
              width: 100%;
              height: 30px;
              line-height: 30px;
              font-size: $font-size-normal;
              text-align: center;
              color: #666;
              vertical-align: center;
</style>
