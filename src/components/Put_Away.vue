<template>
  <div class="hello">
    <!-- <audio id="audioerr" src="http://47.74.177.128/h5/error.mp3" preload autoplay>
      <source src="@/assets/error.mp3" type="audio/mpeg">
      <source src="http://47.74.177.128/h5/error.mp3" type="audio/mpeg">
    </audio>
    <audio id="audiosuccess" src="http://47.74.177.128/h5/success.mp3" preload autoplay>
      <source src="http://47.74.177.128/h5/success.mp3" type="audio/mpeg">
    </audio> -->
    <group>
      <input id="scanfnsku" class="scanfnsku-input" v-model.trim="fnsku" @keyup.enter="getData" placeholder="请扫描Fnsku">
      <!-- <x-input id="scanfnsku" placeholder="请输入Fnsku" v-model.trim="fnsku" @keyup.enter="getData" class="batch-input" :show-clear="false"></x-input> -->
      <x-button class="getdata-button" text="确定" type="primary" @click.native="getData"></x-button>
    </group>
    <br>
    <div v-if="fnsku_options.length != 0" class="tableinfo">
      <!-- <x-button class="putaway-button" text="上架" type="primary" @click.native="putaway"></x-button>
      <br/> -->
      <x-table class="breakword">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>上架</th>
            <!-- <th v-if="selectAllStatus == false" @click="selectAll"><icon type="circle"></icon></th>
            <th v-else @click="selectAll"><icon type="success"></icon></th> -->
            <th>fnsku</th>
            <th>库位</th>
            <th>数量</th>
            <th>不良品</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in fnsku_options">
          <tr v-if="item.status==4" style='background: #0CF850;'>
            <!-- <td style="width:2rem">{{index+1}}</td> -->
            <!-- <td v-if="item.selected == false" style="width:2rem" @click="selectedchange(index)"><icon type="circle"></icon></td>
            <td v-else style="width:2rem" @click="selectedchange(index)"><icon type="success"></icon></td> -->
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(index)"><img src="@/assets/upload.png" class="img-upload"></td>
            <td style="width:10rem; word-wrap:break-word;">{{item.fnsku}}</td>
            <td style="width:5rem;cursor: pointer;" @click="showWareInput(index)">{{item.ware}}</td>
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.arrive_sum"></input></td>
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.bad_product"></input></td>
          </tr>
          <tr v-else-if="item.status==8" style='background: #E66671;'>
            <!-- <td style="width:2rem">{{index+1}}</td> -->
            <!-- <td v-if="item.selected == false" style="width:2rem" @click="selectedchange(index)"><icon type="circle"></icon></td>
            <td v-else style="width:2rem" @click="selectedchange(index)"><icon type="success"></icon></td> -->
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(index)"><img src="@/assets/upload.png" class="img-upload"></td>
            <td style="width:10rem; word-wrap:break-word;">{{item.fnsku}}</td>
            <td style="width:5rem;cursor: pointer;" @click="showWareInput(index)">{{item.ware}}</td>
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.arrive_sum"></input></td>
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.bad_product"></input></td>
          </tr>
          <tr v-else>
            <!-- <td style="width:2rem">{{index+1}}</td> -->
            <!-- <td v-if="item.selected == false" style="width:2rem" @click="selectedchange(index)"><icon type="circle"></icon></td>
            <td v-else style="width:2rem" @click="selectedchange(index)"><icon type="success"></icon></td> -->
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(index)"><img src="@/assets/upload.png" class="img-upload"></td>
            <td style="word-wrap:break-word;">{{item.fnsku}}</td>
            <td style="cursor: pointer;" @click="showWareInput(index)">{{item.ware}}</td>
            <!-- <td style="cursor: pointer;"><x-input v-model.trim="item.arrive_sum" :show-clear="false"></x-input></td> -->
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.arrive_sum"></input></td>
            <td style="cursor: pointer;"><input style="width: 3rem;" v-model.trim="item.bad_product"></input></td>
          </tr>
        </tbody>
      </x-table>

      <br><br>
      <x-table class="breakword">
        <thead v-if="fnskuwaredetails.length != 0">
          <tr style="background-color: #F7F7F7">
            <th>fnsku</th>
            <th>库位</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody v-for="item in fnskuwaredetails">
          <tr>
            <td>{{item.fnsku}}</td>
            <td>{{item.ware_house_name}}</td>
            <td>{{item.sum}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div v-transfer-dom>
      <confirm v-model="ware_inputShow" title="请扫描库位" @on-confirm="addWare">
          <input class="scanware-input" v-model.trim="scanware" @keyup.enter="addWare" id="scanwareinput" placeholder="请扫描库位" />
      </confirm>
      <confirm v-model="putawayShow" title="确定上架吗?" @on-confirm="putaway">
      </confirm>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, XTable, Confirm, Checklist, Icon} from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      fnsku: '',
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
      putawayIndex: undefined
      // testimg: ''
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
    showConfirm(index) {
      this.putawayIndex = index
      if(this.fnsku_options[index].ware == '') {
        this.$vux.toast.show({
            text: '请扫描库位',
            type: 'warn'
          })
          return
      }
      this.putawayShow = true
    },
    getFnskuFocus(){
      let scanfnsku = document.getElementById('scanfnsku')
      scanfnsku.focus()
    },
    getFocus(){
      let scanwareinput = document.getElementById('scanwareinput')
      scanwareinput.focus()
    },
    addWare() {
      this.fnsku_options[this.fnsku_index].ware = this.scanware
      this.ware_inputShow = false
    },
    showWareInput(index) {
      this.scanware = ''
      this.fnsku_index = index
      this.ware_inputShow = true
      setTimeout(this.getFocus,300)
    },
    putaway() {
      // if(this.putawaySelected.length==0) {
      //   this.$vux.toast.show({
      //     text: '请至少选择一个fnsku',
      //     type: 'warn'
      //   })
      //   return
      // }
      // let isWare = 1
      // this.putawaySelected.forEach((data) => {
      //   if(data.ware == '') {
      //     isWare = 0
      //     this.$vux.toast.show({
      //       text: '请扫描库位',
      //       type: 'warn'
      //     })
      //     return
      //   }
      // })
      // if(!isWare){
      //   return
      // }
      let fnsku = []
      let ware_house_name = []
      let sum = []
      let defect = []
      // this.putawaySelected.forEach((data) => {
      //   fnsku.push(data.fnsku)
      //   ware_house_name.push(data.ware)
      //   sum.push(data.arrive_sum)
      // })
      fnsku.push(this.fnsku_options[this.putawayIndex].fnsku)
      ware_house_name.push(this.fnsku_options[this.putawayIndex].ware)
      sum.push(this.fnsku_options[this.putawayIndex].arrive_sum)
      defect.push(this.fnsku_options[this.putawayIndex].bad_product)
      let params = {
        fnsku: fnsku,
        ware_house_name: ware_house_name,
        sum: sum,
        defect: defect,
        date: this.dateFormatter(new Date())
      }
      this.$axios.post('/admin/cargos/putaway_fnsku', params,{
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          let temp = this.fnsku_options[this.putawayIndex]
          this.fnsku_options[this.putawayIndex].status = 4
          this.fnsku_options.splice(this.putawayIndex, 1)
          this.fnsku_options.unshift(temp)
          this.$vux.toast.show({
            text: '上架成功',
            type: 'success'
          })
          // this.fnsku_options.forEach((data, index) => {
          //   let temp = data
          //   if(data.selected ==true) {
          //     data.status = 4
          //     this.fnsku_options.splice(index, 1)
          //     this.fnsku_options.unshift(temp)
          //   }
          // })
        }else{
          let temp = this.fnsku_options[this.putawayIndex]
          this.fnsku_options[this.putawayIndex].status = 8
          this.fnsku_options.splice(this.putawayIndex, 1)
          this.fnsku_options.unshift(temp)
          // this.fnsku_options.forEach((data, index) => {
          //   let temp = data
          //   if(data.selected ==true) {
          //     data.status = 8
          //     this.fnsku_options.splice(index, 1)
          //     this.fnsku_options.unshift(temp)
          //   }
          // })
        }
      }).catch((res) => {

      }).finally((res) => {
        this.fnsku_options.forEach((data) => {
          data.selected = false
        })
        this.putawaySelected = []
      })
    },
    selectAll() {
      this.putawaySelected = []
      this.selectAllStatus = !this.selectAllStatus
      this.fnsku_options.forEach((data) => {
        data.selected = this.selectAllStatus
        if(this.selectAllStatus == true){
          this.putawaySelected.push(data)
        }
      })
      if(this.selectAllStatus == false) {
        this.putawaySelected = []
      }
    },
    selectedchange(index) {
      console.log(this.fnsku_options[index].selected)
      this.putawaySelected = []
      this.fnsku_options[index].selected = !this.fnsku_options[index].selected
      this.fnsku_options.forEach((data) => {
        if(data.selected) {
          this.putawaySelected.push(data)
        }
      })
    },
    test3(){
      this.myVal.forEach((id) => {
        console.log('kill')
        clearInterval(id)
      })
    },
    test2(){
      let inputEle = document.getElementById('focusInput');
      if(inputEle != null) {
        inputEle.focus()
      }
    },
    test(e) {
      if(e==1) {
        this.myVal.forEach((id) => {
          clearInterval(id)
        })
        this.myVal = []
        return
      }
      let temp = setInterval(this.test2, 100)
      this.myVal.push(temp)
    },
    getData() {
      if(this.fnsku.trim() == ''){
        this.$vux.toast.show({
            text: '请输入fnsku',
            type: 'warn'
          })
        this.fnskuwaredetails = []
        return
      }
      this.store_options = []
      this.$axios.get('/admin/cargos/search_by_fnsku?query=' + this.fnsku, {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          if(res.data.count !=0){
            res.data.data.forEach((data, index) => {
              if(data.fnsku == this.fnsku) {
                data.ware = ''
                data.bad_product = 0
                data.selected = false
                this.fnskuwaredetails = data.cargo_ware_houses
                this.fnsku_options = this.fnsku_options.concat(res.data.data[index])
              }
            })

          }else{
            this.$vux.toast.show({
              text: '请输入正确的fnsku',
              type: 'warn'
            })
            this.fnskuwaredetails = []
          }
        }else{
        }
      }).catch((res) => {

      }).finally((res) => {
        this.fnsku = ''
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
