<template>
  <div @updatePanelHosts="updateHosts" class="row">
    <div  id="hosts" class="col-2">
      <span v-if="this.hosts.length==0">No hay ningún host añadido</span>
      <host v-for="h in this.hosts" :name="h.name" :ip="h.ip" @updatePanelHosts="updateHosts"></host>
    </div>
    <!-- Panel ansible -->
    <div class="col-10">
      <div class="panelsAnsible row">
        <ansible-install></ansible-install>
      </div>
      <div class="panelsAnsible row">
        <ansible-install></ansible-install>
      </div>
      <div class="panelsAnsible row">
        <ansible-install></ansible-install>
      </div>
    </div>
  </div>
</template>

<script>
import host from './host.vue';
import ansibleInstall from "./ansibleInstall.vue";
export default {
  name: "panelHosts",
  props:['update'],
  emits:['hostsUpdated'],
  data(){
    return{
      hosts:[]
    }
  },
  watch:{
    update(newValue,oldValue){
      this.updateHosts()
      this.$emit('hostsUpdated')
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
    }
  },
  components:{host,ansibleInstall}
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