<template>
    <div class="card large">

    </div>
</template>

<script>
export default {
  props: ['post']
};
</script>

<style lang="scss" scoped>

.post__title {
  font-size: 1.2rem;
}
.image__category-label {
    position: absolute;
    top: .5rem;
    right: .5rem;
    background: #fcee21;
    padding: .2rem 1rem;
    color: #444444;
    font-weight: bold;
    font-size: .8rem;
}

.media--position-bottom {
    position: absolute;
    bottom: .5rem;
}

</style>