<template>
  <div>
    <login v-if="!isLogged" id="login" :logged="this.isLogged" @statusLogin="changeStatusLogin"></login>
    <dashboard v-if="isLogged"></dashboard>
  </div>
</template>

<script>
import login from './login.vue'
import dashboard from "./dashboard.vue";
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
    },
  },
  components:{login,dashboard}
}
</script>

<style scoped>
#login{
  width: 300px;
  margin: 0 auto;
}

</style>