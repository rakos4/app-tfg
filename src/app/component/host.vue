<template>
<div class="row host">
  <div class="col-4">
    <span>{{name}}</span>
  </div>
  <div class="col-6">
    <span>{{ip}}</span>
  </div>
  <div id="state" class="col-2"></div>

</div>
</template>

<script>
export default {
  name: "host",
  props:['name','ip']
}
</script>

<style scoped>
#state{
  background-color: #22e822;
  border-radius: 65px;
  width: 25px;
  height: 25px;
}

.host{
  padding: 20px 0px;
  background-color: #2ccb95;
  color: white;
  border: 3px solid;
  border-color: #ebf0ec;
  border-radius: 6px;
}

</style>