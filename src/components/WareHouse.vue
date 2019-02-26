<template>
  <div class="hello">
    <group>
      <input id="scanfnsku" class="scanfnsku-input" v-model.trim="ware" @keyup.enter="getData" placeholder="请扫描库位">
      <x-button class="getdata-button" text="确定" type="primary" @click.native="getData"></x-button>
    </group>
    <group v-if="ware_id_temp != ''">
      <input id="scanfnsku" class="warefnsku-input" v-model.trim="add_fnsku" placeholder="请扫描fnsku">
      <input id="scanfnsku" class="waresum-input" v-model.trim="add_sum" placeholder="请输入数量">
      <x-button class="getdata-button" text="增加" type="primary" @click.native="addWare"></x-button>
      <span style="float: left; clear: both">当前库位：{{ware_temp}}</span>
    </group>
    <br>
    <div class="tableinfo">
      <x-table class="breakword">
        <thead v-if="fnskuwaredetails.length != 0">
          <tr style="background-color: #F7F7F7">
            <th>fnsku</th>
            <th>数量</th>
            <th>库位</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in fnskuwaredetails">
          <tr>
            <td>
              <swipeout>
                <swipeout-item transition-mode="follow">
                  <div slot="left-menu">
                    <swipeout-button type="primary" @click.native="undateWare(item.id, item.ware_house_id, item.sum)">更新</swipeout-button>
                  </div>
                  <div slot="content">
                    {{item.fnsku}}
                  </div>
                </swipeout-item>
              </swipeout>
            </td>
            <td>
              <input v-model="item.sum" style="width: 5rem" />
            </td>
            <td @click="removeWareConfirm(item, index)">
              <swipeout>
                <swipeout-item transition-mode="follow">
                  <div slot="right-menu">
                    <swipeout-button type="warn" @click.native="deleteWareConfirm(item.id, item.ware_house_id, index)">删除</swipeout-button>
                  </div>
                  <div slot="content">
                    {{item.ware_house_name}}
                  </div>
                </swipeout-item>
              </swipeout>
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- <swipeout>
      <swipeout-item transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="content">
          88888
        </div>
      </swipeout-item>
    </swipeout> -->
    <div v-transfer-dom>
      <confirm v-model="ware_inputShow" title="删除不可恢复，确认删除吗？" @on-confirm="deleteWare">
      </confirm>
      <confirm v-model="removeware_Show" :title="'确认移除' + removewareName + '库位吗？'" @on-confirm="removeWare">
        <input class="scanware-input" v-model.trim="removewareName2" id="scanwareinput" placeholder="请扫描移入库位" />
      </confirm>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, XTable, Confirm, Checklist, Icon, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      ware: '',
      fnsku_options: [],
      tableShow: false,
      logistics_number: '',
      scancodeTemp: [],
      myVal: [],
      show: false,
      logistics_number2: undefined,
      logistics_number_index: undefined,
      putawaySelected: [],
      selectAllStatus: false,
      ware_inputShow: false,
      scanware: '',
      fnsku_index: '',
      fnskuwaredetails: [],
      putawayShow: false,
      putawayIndex: undefined,
      ware_id: '',
      ware_house_id: '',
      ware_index: '',
      ware_id_temp: '',
      add_fnsku: '',
      add_sum: '',
      ware_temp: '',
      removeware_Show: false,
      removewareName: '',
      removewareName2: '',
      ware_id: '',
      ware_house_id: '',
      removeIndex: ''
    }
  },
  created(){
  },
  watch: {
  },
  mounted() {
    this.getFnskuFocus()
  },
  beforeRouteLeave(to, from, next) {
    this.test3()
    next()
  },
  methods: {
    removeWare() {
      let params = {
        cwh_id: this.ware_id,
        warehouse: this.removewareName2
      }
      this.$axios.post('/admin/warehouses/' + this.ware_house_id + '/move', params,{
         headers: {
            'Authorization': localStorage.getItem('token')
        }
      }).then((res) => {
        if(res.data.code == 200) {
            this.fnskuwaredetails.splice(this.removeIndex, 1)
            this.$vux.toast.show({
              text: '移库成功',
              type: 'success'
            })
        }
      }).catch((res) => {

      }).finally(() => {
      })
    },
    getFocus(){
      let scanwareinput = document.getElementById('scanwareinput')
      scanwareinput.focus()
    },
    removeWareConfirm(item, index) {
      this.removewareName2 = ''
      this.removewareName = item.ware_house_name
      this.ware_id = item.id
      this.ware_house_id = item.ware_house_id
      this.removeIndex = index
      this.removeware_Show = true
      setTimeout(this.getFocus,300)
    },
    undateWare(id, ware_house_id, sum) {
      let params = {
        cargo_ware_house_id: id,
        sum: sum
      }
      this.$axios.patch('/admin/warehouses/' + ware_house_id, params,{
           headers: {
              'Authorization': localStorage.getItem('token')
          }
      }).then((res) => {
          if(res.data.code == 200) {
              // this.getData()
              this.$vux.toast.show({
                text: '修改成功',
                type: 'success'
              })
          }
      }).catch((res) => {

      }).finally(() => {
      })
    },
    deleteWareConfirm(id, ware_house_id, ware_index) {
      this.ware_id = id
      this.ware_house_id = ware_house_id
      this.ware_index = ware_index
      this.ware_inputShow = true
    },
    deleteWare() {
      let params = {
          cargo_ware_house_id: this.ware_id
      }
      this.$axios.delete('/admin/warehouses/' + this.ware_house_id, {
           headers: {
              'Authorization': localStorage.getItem('token')
          },
          params
      }).then((res) => {
          if(res.data.code == 200) {
              this.fnskuwaredetails.splice(this.ware_index, 1);
              // this.getData()
              this.$vux.toast.show({
                text: '删除成功',
                type: 'success'
              })
          }
      }).catch(() => {
          
      })
    },
    getFnskuFocus(){
      let scanfnsku = document.getElementById('scanfnsku')
      scanfnsku.focus()
    },
    addWare() {
      let params = {
          id: this.ware_id_temp,
          sum: this.add_sum,
          fnsku: this.add_fnsku
      }
      this.$axios.post('/admin/warehouses', params,{
           headers: {
              'Authorization': localStorage.getItem('token')
          }
      }).then((res) => {
          if(res.data.code == 200) {
            this.ware = this.ware_temp
            this.getData()
            this.add_sum = ''
            this.add_fnsku = ''
            this.$vux.toast.show({
              text: '创建成功',
              type: 'success'
            })
          }
      }).catch((res) => {

      })
    },
    test3(){
      this.myVal.forEach((id) => {
        clearInterval(id)
      })
    },
    getData() {
      if(this.ware.trim() == ''){
        this.$vux.toast.show({
            text: '请输入库位',
            type: 'warn'
          })
        this.fnskuwaredetails = []
        return
      }
      this.ware_temp = this.ware
      this.store_options = []
      this.$axios.get('/admin/warehouses?page=1&name=' + this.ware, {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.ware_id_temp = res.data.data[0].id
          console.log(this.ware_id_temp)
          if(res.data.count !=0){
            res.data.data.forEach((data, index) => {
              data.cargo_ware_houses.forEach((data2) => {
                data.originalSum = data2.sum
              })
              this.fnskuwaredetails = data.cargo_ware_houses
            })

          }else{
            this.$vux.toast.show({
              text: '请输入正确的库位',
              type: 'warn'
            })
            this.fnskuwaredetails = []
          }
        }else{
        }
      }).catch((res) => {

      }).finally((res) => {
        this.ware = ''
      })
    },
    dateFormatter(date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      let second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    XTable,
    Confirm,
    Checklist,
    Icon,
    Swipeout,
    SwipeoutButton,
    SwipeoutItem,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.waresum-input {
  width: 4.2rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.warefnsku-input {
  width: 8rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.scanfnsku-input {
  width: 12.5rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.focus-input{
  width: 18rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.select-button {
  width:5.5rem;
  display:inline;
  float: left;
}
.getdata-button {
  width:5.5rem;
  display:inline;
  float: right;
}
.putaway-button {
  width:5.5rem;
}

.img-upload{
  width: 1rem;
  height: 1rem;
}

.breakword{
  word-break:break-all;
  word-wrap:break-word;
  table-layout: fixed;
}
.scanware-input{
  height: 2rem;
  border: hidden;
}
.tableinfo{
  margin: 0.2rem;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
