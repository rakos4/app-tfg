<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="checkLogin">
        <div class="form-group">
          <label for="email">Username</label>
          <input type="text" v-model="user.username" class="form-control" id="email" aria-describedby="userHelp" placeholder="Enter username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="user.password" class="form-control" id="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary btn-block" >Entrar</button>
      </form>
    </div>
  </div>

</template>
<script>
export default {
  name: "login",
  data(){
    return {
      isLogged:this.logged,
      user:{
        username:'',
        password:'',
      }
    }
  },
  props :['logged'],
  emits:['statusLogin'],
  methods:{
    checkLogin(){
      fetch('/login',{
        method:'POST',
        body:JSON.stringify(this.user),
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      }).then( res => res.json())
          .then(this.notify,function(data){
            console.log("Ha ocurrido un error "+data);
          })

    },
    notify(data){
      if(data.status){
        console.log("OK");
        this.$emit('statusLogin',true);
      }else{
        console.log("BAD")
      }

      //this.$emit('statusLogin',value);
    }
  }
}

</script>
<style scoped>
label{
  margin: 10px 1px;
}

button{
  margin: 10px auto;
  width: 275px;
}

</style>
