<template>
  <div id="app">
    <div class="container">
      <StepProgress/>
    </div>
    <div class="container">
      <br><br>
      <!-- <router-link to="/"></router-link> | -->
      <!-- <router-link to="/payment">Payment</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import StepProgress from './components/StepProgress.vue'

export default {
  name: 'App',
  components: {
    StepProgress
  }
}
</script>

