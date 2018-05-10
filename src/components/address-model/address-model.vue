<template>
  <div class="address-model">
    <div class="address-list-con">
      <div class="add" @click="addNewAddress">添加新地址</div>
      <ul class="address-list" v-show="addressList.length > 0">
        <li
          class="address-item"
          v-for="(item, index) in addressList"
          :key="index"
          :class="{'active': index === selectedIndex}"
          @click="selectedAddress(item, index)">
          <div class="set-default" :class="{'is-default': item.default === 1}" @click="setDefault(item)">
            {{item.default === 1 ? '默认地址' : '设为默认'}}
          </div>
          <div class="top">
            <i class="fa fa-user"></i>
            <span class="name">{{item.receiveName}}</span>
            <i class="fa fa-mobile-phone"></i>
            <span class="phone">{{item.receivePhone}}</span>
          </div>
          <div class="middle">
            <p class="address">
              <i class="fa fa-map-marker"></i>{{item.addressDetail}}
            </p>
            <div class="post"><i class="fa fa-envelope-o"></i>{{item.postCode}}</div>
          </div>
          <div class="bottom">
            <span class="edit" @click="editAddress(item)">
              <i class="fa fa-edit"></i>
              编辑
            </span>|
            <span class="remove" @click="showRemoveDialog(item.addressId)">
              <i class="fa fa-trash"></i>
              删除
            </span>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="新增收货地址" :visible.sync="dialogFormVisible" class="dialog">
      <div class="main">
        <ul>
          <li class="form-item">
            <label>收货人姓名</label>
            <input type="text" placeholder="长度不能超过25个字符" v-model="info.receiveName">
          </li>
          <li class="form-item">
            <label>手机号码</label>
            <input type="text" placeholder="请输入手机号码" v-model="info.receivePhone">
          </li>
          <li class="form-item">
            <label>所在地区</label>
            <select v-model="info.selectedProvince">
              <option :value="0">请选择省份</option>
              <option :value="item.code" v-for="(item, index) in provinceList" :key="index">{{item.name}}</option>
            </select>
            <select v-model="info.selectedCity">
              <option :value="0">请选择城市</option>
              <option :value="item.code" v-for="(item, index) in citiesList" :key="index">{{item.name}}</option>
            </select>
            <select v-model="info.selectedCounty">
              <option :value="0">请选择县区</option>
              <option :value="item.code" v-for="(item, index) in countyList" :key="index">{{item.name}}</option>
            </select>
          </li>
          <li class="form-item">
            <label>详细地址</label>
            <textarea
              type="text"
              maxlength="100"
              v-model="info.detailArea"
              placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"
              style="resize: none;">
            </textarea>
          </li>
          <li class="form-item">
            <label>邮政编码</label>
            <input type="text" placeholder="如您不清楚邮递区号，请填写000000" v-model="info.postCode">
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <span @click="dialogFormVisible = false" class="cancel">取 消</span>
        <span @click="submitData" class="confirm">确 定</span>
      </div>
    </el-dialog>
    <el-dialog title="删除收货地址" :visible.sync="dialogConfirmVisible" class="dialog">
      确认删除这条地址吗？此操作不可逆哦~
      <div slot="footer" class="dialog-footer">
        <span @click="dialogConfirmVisible = false" class="cancel">取 消</span>
        <span @click="removeAddress" class="confirm">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      addressList: [],
      provinceList: [],
      citiesList: [],
      countyList: [],
      selectedIndex: 0,
      errorTip: '',
      info: {
        selectedProvince: 0,
        selectedCity: 0,
        selectedCounty: 0,
        receiveName: '',
        receivePhone: '',
        detailArea: '',
        postCode: ''
      },
      editAddressInfo: {},
      editFlag: 0,
      deleteAddressId: '',
      dialogFormVisible: false,
      dialogConfirmVisible: false
    };
  },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  created () {
    this.getAddressList();
    Service.get_province_list().then(data => {
      this.provinceList = data;
    }).catch(res => {
      Message.error({
        message: res.errStr
      });
    });
  },
  computed: {
    addressDetail () {
      let provinceIndex = this.provinceList.findIndex(item => {
        return item.code === this.info.selectedProvince;
      });
      let provinceTxt = this.provinceList[provinceIndex].name;
      let cityIndex = this.citiesList.findIndex(item => {
        return item.code === this.info.selectedCity;
      });
      let cityTxt = this.citiesList[cityIndex].name;
      let countyIndex = this.countyList.findIndex(item => {
        return item.code === this.info.selectedCounty;
      });
      let countyTxt = this.countyList[countyIndex].name;
      return provinceTxt + cityTxt + countyTxt + this.info.detailArea;
    }
  },
  methods: {
    selectedAddress (address, index) {
      if (this.page === 'pay') {
        this.selectedIndex = index;
        this.$emit('selected', address);
      }
    },
    editAddress (address) {
      this.editAddressInfo = address;
      this.editFlag = 2;
      this.info.receiveName = address.receiveName;
      this.info.receivePhone = address.receivePhone;
      this.info.selectedProvince = address.province;
      this.info.postCode = address.postCode;
      this.info.detailArea = address.detailArea;
      this.editAddressId = address.addressId;
      this.dialogFormVisible = true;
    },
    showRemoveDialog (addressId) {
      this.dialogConfirmVisible = true;
      this.deleteAddressId = addressId;
    },
    removeAddress () {
      Service.delete_address({ addressId: this.deleteAddressId }).then(() => {
        Message.success({
          message: '删除成功'
        });
        this.getAddressList();
        this.dialogConfirmVisible = false;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    setDefault (address) {
      if (!address.default) {
        Service.set_default_address({addressId: address.addressId}).then(() => {
          this.getAddressList();
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    getAddressList () {
      Service.get_address_list().then(data => {
        this.addressList = data;
      }).then(() => {
        this.selectedAddress(this.addressList[0], 0);
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    submitData () {
      if (!this.validateData()) {
        Message.error({
          message: this.errorTip
        });
      } else {
        let url = this.editFlag === 1 ? 'add_new_address' : 'edit_address_info';
        let obj = {
          receiveName: this.info.receiveName,
          receivePhone: this.info.receivePhone,
          postCode: this.info.postCode,
          province: this.info.selectedProvince,
          city: this.info.selectedCity,
          county: this.info.selectedCounty,
          detailArea: this.info.detailArea,
          addressDetail: this.addressDetail
        };
        console.log(typeof this.info.selectedProvince);
        if (this.editFlag === 2) {
          obj.addressId = this.editAddressInfo.addressId;
        }
        Service[url](obj).then(() => {
          Message.success({
            message: '添加成功'
          });
          this.getAddressList();
          this.dialogFormVisible = false;
        }).catch(res => {
          Message.success({
            message: res.errStr
          });
        });
      }
    },
    addNewAddress () {
      this.editFlag = 1;
      this.dialogFormVisible = true;
    },
    closeDialogAndReset () {
      this.dialogFormVisible = false;
      this.info.receiveName = '';
      this.info.receivePhone = '';
      this.info.detailArea = '';
      this.info.selectedProvince = 0;
      this.info.selectedCity = 0;
      this.info.selectedCounty = 0;
      this.info.postCode = '';
    },
    validateData () {
      if (!this.info.receiveName) {
        this.errorTip = '请输入收货人姓名';
        return false;
      }
      if (!this.info.receivePhone) {
        this.errorTip = '请输入收货人手机号';
        return false;
      }
      if (!this.info.selectedProvince) {
        this.errorTip = '请选择省份';
        return false;
      }
      if (!this.info.selectedCity) {
        this.errorTip = '请选择城市';
        return false;
      }
      if (!this.info.selectedCounty) {
        this.errorTip = '请选择县区';
        return false;
      }
      if (!this.info.detailArea) {
        this.errorTip = '请输入详细地址';
        return false;
      }
      if (!this.info.postCode) {
        this.errorTip = '请输入邮政编码';
        return false;
      }
      if (this.info.receiveName > 25) {
        this.errorTip = '收货人姓名不能大于25个字符';
        return false;
      }
      if (!/^1\d{10}$/.test(this.info.receivePhone)) {
        this.errorTip = '手机号码格式不正确';
        return false;
      }
      if (!/^\d{6}$/.test(this.info.postCode)) {
        this.errorTip = '邮政编码格式不正确';
        return false;
      }
      return true;
    }
  },
  watch: {
    'info.selectedProvince' (newVal) {
      if (newVal) {
        Service.get_cities_list({parentId: newVal}).then(data => {
          this.citiesList = data;
          this.countyList = [];
          this.info.selectedCity = this.editFlag === 2 && this.editAddressInfo.province === this.info.selectedProvince ? this.editAddressInfo.city : 0;
          this.info.selectedCounty = 0;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    'info.selectedCity' (newVal) {
      if (newVal) {
        Service.get_county_list({parentId: newVal}).then(data => {
          this.countyList = data;
          console.log(this.editAddressInfo);
          this.info.selectedCounty = this.editFlag === 2 && this.editAddressInfo.city === this.info.selectedCity ? this.editAddressInfo.county : 0;
        }).catch(res => {
          Message.error({
            message: res.errStr
          });
        });
      }
    },
    dialogFormVisible (newVal) {
      if (!newVal) {
        this.closeDialogAndReset();
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl'
.address-model
  width: 100%
  .address-list-con
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    .add
      width: 100px;
      height: 30px;
      line-height: 30px;
      font-size: $font-size-normal;
      background: $color-theme;
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
      cursor: pointer;
    .address-list
      width: 100%;
    .address-item
      display: inline-block;
      box-sizing: border-box;
      width: 252px;
      height: 151px;
      padding: 15px 10px;
      vertical-align: top;
      margin-right: 10px;
      margin-bottom: 10px;
      color: $color-text;
      position: relative;
      background: url(./images/peraddbg.png);
      &.active
        background: url(./images/peraddressbg.png);
      .set-default
        position: absolute;
        right: 0;
        top: 0;
        padding: 3px 3px;
        color: #fff;
        font-size: $font-size-small;
        border-bottom-left-radius: 5px;
        background: #f974ba;
        cursor: pointer;
        &.is-default
          background: #ee3495;
      .top
        height: 30px;
        line-height: 30px;
        font-size: $font-size-normal;
        span
          display: inline-block;
          height: 30px;
          line-height: 30px;
      .middle
        font-size: $font-size-normal;
        p
          line-height: 20px;
        .post
          height: 20px;
          line-height: 20px;
          i
            margin-right: 5px;
      .bottom
        position: absolute;
        bottom: 15px;
        right: 30px;
        font-size: $font-size-normal;
        color: #000;
        .edit
          display: inlline-block
          margin-right: 10px;
          cursor: pointer;
        .remove
          display: inline-block;
          margin-left: 10px;
          cursor: pointer;
  .dialog /deep/ .el-dialog
    .el-dialog__header
      border-bottom: 1px solid $color-theme;
    .main
      padding: 15px 20px;
      .form-item
        margin-bottom: 10px;
        label
          display: inline-block;
          width: 100px;
          height: 40px;
          line-height: 40px;
          font-size: $font-size-normal;
          text-align: right;
          margin-right: 20px;
          vertical-align: top;
        input
          width: 300px;
          height: 35px;
          border: 1px solid $color-border;
        textarea
          width: 300px;
          height: 70px;
        select
          width: 100px;
          height: 35px;
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
