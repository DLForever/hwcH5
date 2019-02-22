<template>
  <div class="hello">
    <div class="list-box">
      <div class="box-list">
        <router-link to="/Store_ins">
          <img src="@/assets/s4.png">
        </router-link>
        <div class="box-text">入库</div>
      </div>
      <div class="box-list">
        <router-link to="/Put_Away">
          <img src="@/assets/s5.png">
        </router-link>
        <div class="box-text">上架</div>
      </div>
      <div class="box-list" @click="pickShow">
        <img src="@/assets/pick.png">
        <div class="box-text">拣货</div>
      </div>
      <div class="box-list" @click="showPackage">
        <img src="@/assets/package_done.png">
        <div class="box-text">完成打包</div>
      </div>
      <div class="box-list">
        <router-link to="/ProductDetails">
          <img src="@/assets/s6.png">
        </router-link>
        <div class="box-text">详情</div>
      </div>
      <div class="box-list">
        <router-link to="/WareHouse">
          <img src="@/assets/update.png">
        </router-link>
        <div class="box-text">更新库存</div>
      </div>
    </div>

    <div v-transfer-dom>
      <confirm v-model="pick_inputShow" title="拣货" @on-confirm="done_pick" :close-on-confirm="false">
          <input class="pick-input" v-model.trim="pickScancode" id="scanpickinput" placeholder="请扫描产品" />
      </confirm>
      <confirm v-model="package_inputShow" title="完成打包" @on-confirm="done_package" :close-on-confirm="false">
          <input class="package-input" v-model.trim="packageScancode" id="scanpackageinput" placeholder="请扫描产品" />
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm} from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      pick_inputShow: false,
      pickScancode: '',
      package_inputShow: false,
      packageScancode: ''
      // testimg: ''
    }
  },
  methods: {
    getPickFocus() {
      let scanpickinput = document.getElementById('scanpickinput')
      scanpickinput.focus()
    },
    getPackageFocus() {
      let scanpackageinput = document.getElementById('scanpackageinput')
      scanpackageinput.focus()
    },
    pickShow(){
      this.pickScancode = ''
      this.pick_inputShow = true
      setTimeout(this.getPickFocus, 300)
    },
    done_pick() {
      this.$axios.get('/admin/outbound_orders/' + this.pickScancode.split('_')[1] + '/done_pick' , {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.pickScancode = ''
          this.$vux.toast.show({
            text: '拣货成功',
            type: 'success'
          })
          this.pick_inputShow = false
        }else{
        }
      }).catch((res) => {

      })
    },
    showPackage() {
      this.packageScancode = ''
      this.package_inputShow = true
      setTimeout(this.getPackageFocus, 300)
    },
    done_package() {
      this.$axios.get('/admin/outbound_orders/' + this.packageScancode.split('_')[1] + '/done_change_label' , {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.packageScancode = ''
          this.pickScancode = ''
          this.$vux.toast.show({
            text: '换标成功',
            type: 'success'
          })
          this.package_inputShow = false
        }else{
        }
      }).catch((res) => {
        
      })
    },
    test() {
      console.log('in')
    },
  },
  components: {
    Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-box{
    /*padding: 15px 15px;*/
}
.box-list{
    display: inline-block;
    width: 7.5rem;
    height: 8rem;
    margin:0 1rem 1rem 0;
    border-radius: 1rem;
    text-align: center;
    background: #f5f6f5;
    background-color: #EAF1F5;
}

.box-list img{
  width: 5rem;
  height: 5rem
}

.box-list .box-text{
  font-size: 1.4rem;
  line-height: 1.4rem;
}
.package-input{
  width: 10rem;
  height: 2rem;
}
.pick-input{
  width: 10rem;
  height: 2rem;
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
  margin: 0 0.7rem;
}
a {
  color: #42b983;
}
</style>
