<template>
  <div>
    <login id="login" :logged="this.isLogged" @statusLogin="changeStatusLogin"></login>
  </div>
</template>

<script>
import login from './login.vue'
export default {
  name: 'rootComponent',
  data(){
    return{
      isLogged:false,
    }
  },
  methods:{
    changeStatusLogin(value){
      this.isLogged=value;
    }
  },
  components:{login}
}
</script>

<style scoped>
#login{
  width: 300px;
  margin: 0 auto;
}

</style>