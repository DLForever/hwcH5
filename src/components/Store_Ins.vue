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
      <!-- <x-input placeholder="请输入批次号" v-model.trim="batch_number" class="batch-input" @click.native="test(1)" :show-clear="false"></x-input> -->
      <x-input placeholder="请输入批次号" v-model.trim="batch_number" class="batch-input" :show-clear="false"></x-input>
      <x-button class="storeins-button" text="确定" type="primary" @click.native="getData"></x-button>
    </group>
    <br>
    <div v-if="tableShow">
      <group>
        <!-- <input class="focus-input" id="focusInput" @keyup.enter="storeIns" v-model.trim="logistics_number" @click="test(2)"> -->
        <input class="focus-input" id="focusInput" @keyup.enter="storeIns" v-model.trim="logistics_number">
        <x-button class="storeins-button" text="入库" type="primary" @click.native="storeIns"></x-button>
      </group>
      <br>
      <x-table class="breakword">
        <thead>
          <tr>
            <th>序号</th>
            <th>编码</th>
            <th>数量</th>
            <th>入库</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in store_options">
          <tr v-if="item.status==4" style='background: #0CF850;'>
            <td style="width:2rem">{{index+1}}</td>
            <td>{{item.logistics_number}}</td>
            <td style="width:6rem">{{item.total_plan_sum}}</td>
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(item.logistics_number, index)"><img src="@/assets/upload.png" class="img-upload"></td>
          </tr>
          <tr v-else-if="item.status==8" style='background: #E66671;'>
            <td style="width:2rem">{{index+1}}</td>
            <td>{{item.logistics_number}}</td>
            <td style="width:6rem">{{item.total_plan_sum}}</td>
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(item.logistics_number, index)"><img src="@/assets/upload.png" class="img-upload"></td>
          </tr>
          <tr v-else>
            <td style="width:2rem">{{index+1}}</td>
            <td>{{item.logistics_number}}</td>
            <td style="width:6rem">{{item.total_plan_sum}}</td>
            <td style="cursor: pointer; width:2rem;" @click="showConfirm(item.logistics_number, index)"><img src="@/assets/upload.png" class="img-upload"></td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show" title="确定入库吗?" @on-confirm="upload">
        <x-table class="breakword">
        <thead>
          <tr>
            <th>fnsku</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in store_details">
          <tr>
            <td style="width:6rem">{{item.fnsku}}</td>
            <td style="width:6rem">
              <input style="width: 3rem;" v-model.trim="item.plan_sum" placeholder="数量" />
            </td>
          </tr>
        </tbody>
      </x-table>
      </confirm>
      <!-- <confirm v-model="pick_inputShow" title="拣货" @on-confirm="done_pick" :close-on-confirm="false">
          <input class="pick-input" v-model.trim="pickScancode" id="scanpickinput" placeholder="请扫描产品" />
      </confirm> -->
    </div>
  </div>

</template>

<script>
import { XInput, Group, XButton, XTable, Confirm} from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      batch_number: '',
      store_options: [],
      tableShow: false,
      logistics_number: '',
      scancodeTemp: [],
      myVal: [],
      show: false,
      logistics_number2: undefined,
      logistics_number_index: undefined,
      store_details: []
      // testimg: ''
    }
  },
  created(){
    // this.test()
  },
  watch: {
    // "$route": 'test3'
  },
  beforeRouteLeave(to, from, next) {
    this.test3()
    next()
  },
  methods: {
    tt() {
      console.log(this.dateFormatter(new Date()))
    },
    showConfirm(logistics_number, index) {
      this.store_details = []
      this.store_details = this.store_options[index].product_store_ins
      this.logistics_number2 = logistics_number
      this.logistics_number_index = index
      this.show = true
    },
    upload() {
      console.log(this.store_details)
      let sum = []
      let product_store_ins = []
      this.store_details.forEach((data) => {
        sum.push(parseInt(data.plan_sum))
        product_store_ins.push(data.id)
      })
      console.log(this.logistics_number)
      let params = {
        logistics_number: this.logistics_number2,
        date: this.dateFormatter(new Date()),
        sum: sum,
        product_store_ins: product_store_ins
      }
      this.$axios.post('/admin/store_ins/done_by_logistics_number', params,{
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.$vux.toast.show({
            text: '入库成功',
            type: 'success'
          })
          this.logistics_number = ''
          this.store_options[this.logistics_number_index]['status'] = 4
          this.store_options.splice(this.logistics_number_index, 1)
          // let audiosuccess = document.getElementById('audiosuccess')
          // audiosuccess.play()
        }else{
          this.logistics_number = ''
          this.store_options[this.logistics_number_index]['status'] = 8
          // let audioerr = document.getElementById('audioerr')
          // audioerr.play()
        }
        // let temp = this.store_options[this.logistics_number_index]
        
        // this.store_options.unshift(temp)
      }).catch((res) => {
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
      if(this.batch_number.trim() == ''){
        this.$vux.toast.show({
            text: '请输入批次号',
            type: 'warn'
          })
        return
      }
      this.store_options = []
      this.$axios.get('/admin/store_ins?batch_number=' + this.batch_number +'&status=7', {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          if(res.data.count != 0){
            for (let i = 0; i < Math.ceil(res.data.count / 20); i++) {
              this.getDataLoop(i+1)
            }
            this.tableShow = true
            // let temp = setInterval(this.test2, 100)
            // this.myVal.push(temp)
          }
          if(res.data.count == 0){
            this.$vux.toast.show({
              text: '暂无未入库单',
              type: 'warn'
            })
          }
        }else{
          this.store_options = []
          this.tableShow = false
        }
      }).catch((res) => {

      })
    },
    getDataLoop(page) {
      if(this.batch_number.trim() == ''){
        this.$vux.toast.show({
            text: '请输入批次号',
            type: 'warn'
          })
        return
      }
      this.$axios.get('/admin/store_ins?batch_number=' + this.batch_number + '&page=' + page +'&status=7' , {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.store_options = this.store_options.concat(res.data.data)
        }else{
          this.store_options = []
          this.tableShow = false
        }
      })
    },
    storeIns() {
      if(this.scancodeTemp.indexOf(this.logistics_number) != -1) {
        this.logistics_number = ''
        this.$vux.toast.show({
          text: '已扫描过',
          type: 'warn'
        })
        return
      }
      this.scancodeTemp.push(this.logistics_number)
      let resultIndex = undefined
      for(let i = 0; i < this.store_options.length; i++) {
        if(this.store_options[i]['logistics_number'] == this.logistics_number) {
          resultIndex = i
          break
        }
      }
      if(resultIndex == undefined) {
        this.$vux.toast.show({
          text: '请扫描正确物流单',
          type: 'warn'
        })
        this.logistics_number = ''
        return
      }
      this.store_details = []
      this.store_details = this.store_options[resultIndex].product_store_ins
      this.logistics_number2 = this.logistics_number
      this.logistics_number_index = resultIndex
      this.show = true
      // let params = {
      //   logistics_number: this.logistics_number,
      //   date: this.dateFormatter(new Date())
      // }
      // this.$axios.post('/admin/store_ins/done_by_logistics_number', params,{
      //   headers: {'Authorization': localStorage.getItem('token')}
      // }).then((res) => {
      //   if(res.data.code == 200) {
      //     this.$vux.toast.show({
      //       text: '入库成功',
      //       type: 'success'
      //     })
      //     this.store_options[resultIndex]['status'] = 4
      //     this.store_options.splice(resultIndex, 1)
      //     // let audiosuccess = document.getElementById('audiosuccess')
      //     // audiosuccess.play()
      //   }else{
      //     this.store_options[resultIndex]['status'] = 8
      //     // let audioerr = document.getElementById('audioerr')
      //     // audioerr.play()
      //   }
      //   // let temp = this.store_options[resultIndex]
        
      //   // this.store_options.unshift(temp)
      // }).catch((res) => {
      // }).finally((res) => {
      //   this.logistics_number = ''
      // })
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
    Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.batch-input {
  width: 10rem;
  display:inline;
  float: left;
}
.focus-input{
  width: 12.5rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.storeins-button {
  width:5.5rem;
  display:inline;
  float: right;
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
