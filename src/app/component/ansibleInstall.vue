<template>
  <form id="installPackages" class="row ms-auto" @submit.prevent="this.run">
    <label class="form-package sr-only" for="packet">{{ this.label }}</label>
    <div class="form-package col-11">
      <input v-if="this.input" v-model="this.packages" type="text" class="form-control mb-2 mr-sm-2" id="packet"
             placeholder="Some packet">
      <textarea v-if="this.textArea" class="form-control mb-2 mr-sm-2" id="packet" rows="3"></textarea>

    </div>
    <div id="buttonPackage" class="col-1">
      <button type="submit" class="btn btn-primary mb-2">{{this.labelButton}}</button>
    </div>
    <div id="errorPackage" v-if="this.error" class="col-12 alert alert-danger" role="alert">
      <button type="button" class="close closeExec"  aria-label="Close" @click="this.error=false">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>{{ this.errorMsg }}</p>
    </div>
    <div id="resultExec" v-if="this.exec" class="alert alert-success col-12"  role="alert">
      <button type="button" class="close closeExec"  aria-label="Close" @click="this.exec=false">
        <span aria-hidden="true">&times;</span>
      </button>
      <p v-for="p in this.dataExec">{{p}}</p>
    </div>
  </form>

</template>

<script>
export default {
  name: "ansibleInstall",
  props:['label'],
  data() {
    return {
      packages: "",
      labelButton:"Go",
      error: false,
      input:false,
      textArea:false,
      path:"",
      exec:false,
      errorMsg:"",
      dataExec:[]
    }
  },
  created() {
    if(this.label=="Install packages"){
      this.labelButton="Install"
      this.input=true
      this.path="/installPackages"
    }else if(this.label=="Restart services"){
      this.labelButton="Restart"
      this.input=true
      this.path="/restartServices"
    }else if(this.label=="Create your playbook"){
      this.labelButton="Run"
      this.textArea=true
      this.path="createYourPlaybook"
    }
  },
  watch: {
    packages(newValue, oldValue) {
      if (newValue.length != 0){
        this.error = false
        this.exec=false
      }
    }
  },
  methods: {
    run: function () {
      if (this.packages.length == 0) {
        this.error = true
        this.errorMsg="El campo no puede estar vacío";
        this.exec=false
      } else {
        var packagesToInstall = this.packages.split(",");

        fetch(this.path,{
          method:'POST',
          body:JSON.stringify(packagesToInstall),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => {
          this.showResult(data);
        })
      }
    },
    showResult:function(data){
      console.log(data)

      if(data.status==false){
        this.error=true
        this.errorMsg="Error al instalar los paquetes"
      }else{
        this.exec=true
        this.class="alert alert-success col-12";
        this.style="height: 150px; overflow-y: scroll;"
        this.dataExec=data.status
      }
    }
  },

}
</script>

<style scoped>

.form-package {
  padding-left: 0px;
}

#buttonPackage {
  padding-right: 0px;
}

#buttonPackage button {
  width: 100%;
}

#resultExec{
  height: 150px;
  overflow-y: scroll;
}

.closeExec{
  position: absolute;
  right: 25px;
  background: none;
  border: none;

}

</style>