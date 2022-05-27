<template>
  <div @updatePanelHosts="updateHosts" class="row">
    <div  id="hosts" class="col-2">
      <span v-if="this.hosts.length===0">No hay ningún host añadido</span>
      <host v-for="h in this.hosts" :name="h.name" :ip="h.ip" @updatePanelHosts="updateHosts"></host>
      <div id="buttonAddHost" class="row">
        <button type="button" class="btn btn-primary" @click="showModal">Add Host</button>
        <modal v-if="modalOpen" @closeModal="showModal"></modal>
      </div>
    </div>

    <!-- Panel ansible -->
    <div class="col-10">
      <div class="panelsAnsible row">
        <ansible-install label="Install packages"></ansible-install>
      </div>
      <div class="panelsAnsible row">
        <ansible-service></ansible-service>
      </div>
      <div class="panelsAnsible row">
        <ansible-custom></ansible-custom>
      </div>
    </div>
  </div>
</template>

<script>
import host from './host.vue';
import ansibleInstall from "./ansibleInstall.vue";
import modal from './modal.vue';
import ansibleService from "./ansibleService.vue";
import ansibleCustom from "./ansibleCustom.vue";

export default {
  name: "panelHosts",
  props:['update'],
  emits:['hostsUpdated'],
  data(){
    return{
      hosts:[],
      modalOpen:false
    }
  },
  created() {
    this.updateHosts()
  },
  methods:{
    updateHosts: function (){
      fetch('/getHosts',{
        method:'GET'
      }).then(res => res.json())
          .then(data => {
            this.hosts = data['hosts']
          })
    },
    showModal: function (){
      this.modalOpen=!this.modalOpen
      this.updateHost=true;
      this.updateHosts()
      this.$emit('hostsUpdated')
    },
  },
  components:{host,ansibleInstall,modal,ansibleService,ansibleCustom}
}
</script>

<style scoped>

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

.panelsAnsible{
  border: 3px solid white;
  padding: 20px;
}

</style>