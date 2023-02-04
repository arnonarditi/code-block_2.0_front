
<template>
  <section class="fully main-container">
    <user-msg />
    <router-view></router-view>
  </section>
</template>

<script>
import  userMsg  from './cmps/user-msg.vue'
export default {
  components: {
    userMsg
  }
}
</script>


