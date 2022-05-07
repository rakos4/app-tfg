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
    this.$router.push('/login')
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