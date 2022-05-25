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
    <div v-if="this.error" class="col-12 alert alert-danger" role="alert">
      Error al instalar los paquetes
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
      path:""

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
      if (newValue.length != 0) this.error = false
    }
  },
  methods: {
    run: function () {
      if (this.packages.length == 0) {
        this.error = true
      } else {
        var packagesToInstall = this.packages.split(",");

        fetch(this.path,{
          method:'POST',
          body:JSON.stringify(packagesToInstall),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => console.log(res))
      }
    }
  }
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

</style>