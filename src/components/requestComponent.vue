<template>
  <h1>{{data.username}}</h1>
</template>
<script>
  export default {
    name: "requestComponent",
    props: {
      data: {type: Object}
    }
  }
</script>
