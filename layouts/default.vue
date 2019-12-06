<template>
  <nuxt />
</template>

<script>
import "~/assets/js/common";
export default {
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>

<style lang="scss">
html,body {
  font-size: 12px;
  height: 100%;
}
._100vh{
    height:100vh;
}
</style>

