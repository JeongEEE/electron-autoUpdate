<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <span style="color:black;">{{packageJson.version}}</span>
  </div>
</template>

<script>
import store from '@/store/index.js'
export default {
  name: 'Home',
  components: {
    
  },
  data: () => ({
    packageJson: store.state.packageJson,
  }),
}
</script>
