<template>
  <div id="container">
    <div class="row">
      <div class="col-2">
        <div class="row">
          <img id="logo" src="../../img/logo_uab.png"/>
        </div>
        <div id="hora" class="row">
          <h2>{{ this.hora }}</h2>
        </div>
      </div>
      <div class="col-10">
        <h1>Titulo</h1>
      </div>
    </div>
    <panelHosts :update="this.updateHost" @hostsUpdated="this.updateHost=false"></panelHosts>
    <div id="buttonAddHost" class="row">
      <button type="button" class="btn btn-primary col-2" @click="showModal">Add Host</button>
      <modal v-if="modalOpen" @closeModal="showModal"></modal>
    </div>
  </div>
</template>

<script>

import host from './host.vue';
import modal from './modal.vue';
import panelHosts from "./panelHosts.vue";

export default {
  name: "dashboard",
  data() {
    return {
      updateHost:false,
      hora: null,
      modalOpen:false
    }
  },
  created() {
    var date = new Date()
    this.hora = date.getHours() + ":" + date.getMinutes()
    setInterval(this.setHour, 60000);

  },
  methods: {
    setHour: function () {
      var date = new Date()
      this.hora = date.getHours() + ":" + date.getMinutes()
    },
    showModal: function (){
      this.modalOpen=!this.modalOpen
      this.updateHost=true;
    },
  },
  components: {host, modal, panelHosts}
}
</script>

<style scoped>

#logo {
  width: 100%;
}

#hora {
  text-align: center;
  padding: 10px;
}



button {
  margin-top: 10px;
  padding: 12px;
}
</style>