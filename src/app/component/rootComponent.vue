<template>
  <div>
    <router-view/>
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
  created() {
    //this.$router.push('/login')
    this.$router.push('/dashboard')
  },

  components:{login,dashboard}
}
</script>

<style scoped>
div {
  background-color: #eee8e8;
  padding: 1% 1%;
}

</style>