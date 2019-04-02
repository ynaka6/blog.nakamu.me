<template>
  <a
    href="#"
    class="menu-trigger mr-3"
    :class="{ active: active }"
    aria-label="menu"
    @click="toggle"
  >
    <span></span>
    <span></span>
    <span></span>
  </a>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: true, default: false }
  },
  methods: {
    toggle: function() {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped lang="postcss">
.menu-trigger,
.menu-trigger span {
  display: inline-block;
  transition: all 0.4s;
  box-sizing: border-box;
}
.menu-trigger {
  width: 25px;
  height: 27px;
  @apply relative;
}
.menu-trigger span {
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  @apply absolute bg-white;
}
.menu-trigger span:nth-of-type(1) {
  top: 0;
}
.menu-trigger span:nth-of-type(2) {
  top: 11px;
}
.menu-trigger span:nth-of-type(3) {
  bottom: 0;
}
.menu-trigger.active span:nth-of-type(1) {
  -webkit-transform: translateY(11.8px) rotate(-45deg);
  transform: translateY(11.8px) rotate(-45deg);
}
.menu-trigger.active span:nth-of-type(2) {
  opacity: 0;
}
.menu-trigger.active span:nth-of-type(3) {
  -webkit-transform: translateY(-11.8px) rotate(45deg);
  transform: translateY(-11.8px) rotate(45deg);
}
</style>
