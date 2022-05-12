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
    <div @updatePanelHosts="updateHosts" class="row">
      <div id="hosts" class="col-2">
        <host></host>
        <host></host>
      </div>
    </div>

    <div id="buttonAddHost" class="row">
      <button type="button" class="btn btn-primary col-2" @click="showModal">Add Host</button>
      <modal v-if="modalOpen" @closeModal="showModal"></modal>
    </div>
  </div>
</template>

<script>

import host from './host.vue';
import modal from './modal.vue';

export default {
  name: "dashboard",
  data() {
    return {
      hosts:[],
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
    },
    updateHosts: function (){
      console.log("hola se ha añadido un nuevo host")
    }
  },
  components: {host, modal}
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

#hosts {
  height: 425px;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

button {
  margin-top: 10px;
  padding: 12px;
}
</style>