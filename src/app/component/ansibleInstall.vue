<template>
  <form id="installPackages" class="row ms-auto" @submit.prevent="install">
    <label class="form-package sr-only" for="packet">Install packages</label>
    <div class="form-package col">
      <input v-model="this.packages" type="text" class="form-control mb-2 mr-sm-2" id="packet"
             placeholder="Some packet">
    </div>
    <div id="buttonPackage" class="col-auto">
      <button type="submit" class="btn btn-primary mb-2">Install</button>
    </div>
    <div v-if="this.error" class="col-12 alert alert-danger" role="alert">
      Error al instalar los paquetes
    </div>
  </form>
</template>

<script>
export default {
  name: "ansibleInstall",
  data() {
    return {
      packages: "",
      error: false
    }
  },
  watch: {
    packages(newValue, oldValue) {
      if (newValue.length != 0) this.error = false
    }
  },
  methods: {
    install: function () {
      if (this.packages.length == 0) {
        this.error = true
      } else {
        var packagesToInstall = this.packages.split(",");
        fetch('/installPackages',{
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
</style>