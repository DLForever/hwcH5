<template>
  <div class="hello">
    <group>
      <input id="logistics" class="scanlogistics-input" v-model.trim="logistics_number" @keyup.enter="getData" placeholder="请扫描物流单">
      <x-button class="storeins-button" text="确定" type="primary" @click.native="getData"></x-button>
    </group>
    <br>
    <div v-if="tableShow">
      <x-table>
        <thead>
          <tr>
            <th>物流单</th>
            <th>批次</th>
            <th>总数</th>
          </tr>
        </thead>
        <tbody v-for="item in product_options">
          <tr>
            <td >{{item.logistics_number}}</td>
            <td>{{item.batch_number}}</td>
            <td>{{item.total_plan_sum}}</td>
          </tr>
        </tbody>
      </x-table>
      <br><br>
      <x-table>
        <thead>
          <tr>
            <th>fnsku</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody v-for="item in product_detatils">
          <tr>
            <td >{{item.fnsku}}</td>
            <td>{{item.plan_sum}}</td>
          </tr>
        </tbody>
      </x-table>
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
      product_options: [],
      tableShow: false,
      logistics_number: '',
      product_detatils: []
      // testimg: ''
    }
  },
  created(){
    // this.test()
  },
  watch: {
    // "$route": 'test3'
  },
  mounted() {
    this.getlogisticsFocus()
  },
  methods: {
    getlogisticsFocus(){
      let logistics = document.getElementById('logistics')
      logistics.focus()
    },
    getData() {
      if(this.logistics_number.trim() == ''){
        this.$vux.toast.show({
            text: '请输入物流单',
            type: 'warn'
          })
        return
      }
      this.product_options = []
      this.$axios.get('/admin/store_ins/info?logistics_number=' + this.logistics_number,{
        headers: {'Authorization': localStorage.getItem('token')}
      }).then((res) => {
        if(res.data.code == 200) {
          this.product_options = [res.data.data]
          this.product_detatils = res.data.data.product_store_ins
          this.tableShow = true
        }else{
          this.product_options = []
          this.tableShow = false
        }
      }).catch((res) => {

      }).finally((res) => {
        this.logistics_number = ''
        this.getlogisticsFocus()
      })
    },
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
.scanlogistics-input {
  width: 12.5rem;
  height: 2.4rem;
  display: inline;
  float: left;
}
.batch-input {
  width: 10rem;
  display:inline;
  float: left;
  /*clear: all;*/
}
.focus-input{
  width: 10rem;
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
