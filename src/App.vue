<template>
<div>
  <SphHeader/>
  <router-view></router-view>
  <SphFooter v-show="$route.meta.showFooter" />
</div>
</template>

<script>
import SphHeader from './components/Header'
import SphFooter from './components/Footer'
export default {
  name: 'App',
  components: {SphHeader, SphFooter},
  mounted() {
    this.$store.dispatch("home/getCategoryList");
  },
}
</script>

<style>

</style>