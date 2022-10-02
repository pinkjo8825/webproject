<template>
  <h1>{{text}}</h1>
</template>
<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'aboutPage',
    data() {
      return {
        login: false,
        text: "test"
      }
    }
  })
  </script>

