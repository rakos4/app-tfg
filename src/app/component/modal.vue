<template>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add new Host to manage</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="this.$emit('closeModal')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addHost">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="this.name" type="text" class="form-control" id="name" placeholder="Nginx">
          </div>
          <div class="form-group">
            <label for="ip">Ip Address</label>
            <input v-model="this.ip" type="text" class="form-control" id="ip" placeholder="192.168.1.59">
          </div>
        </form>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" @click="this.$emit('closeModal')">Cancel</button>
        <button type="button" class="btn btn-primary" @click="addHost">Add Host</button>
      </div>

    </div>

  </div>

</template>

<script>
const Host = require('../../models/Host')
export default {
  name: "modal",
  emits: ['closeModal','updatePanelHosts'],
  data() {
    return {
      ip: null,
      name: null
    }
  },
  methods: {
    updateHosts:function (){
      this.$emit('closeModal');
      this.$emit('updatePanelHosts');
    },
    addHost: function (){
      var host = new Host(this.name,this.ip)
      fetch('/addHost', {
        method: 'POST',
        body: JSON.stringify(host),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
          .then(data => {
            if (data.status) {
              console.log("Host Added")
              this.updateHosts();
            } else {
              console.log("Host wasn't added")
            }
          })
    }
  }
}
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 25%;
}

.close {
  border: none;
  background-color: white;
}

input[type=text] {
  background-color: #f6f6f6;
  color: #0d0d0d;
  text-align: center;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

.form-group{
  margin-top: 10px;
}

</style>