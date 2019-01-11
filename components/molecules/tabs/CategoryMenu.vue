<template>
    <section class="hero is-primary">
      <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li>
                <router-link to="/posts">
                  全て
                </router-link>
            </li>
            <li :class="{'is-active': selected && selected === category}" v-for="(category, index) in categories" :key="index">
                <nuxt-link
                    :to="`/categories/${category}/`">{{ category }}</nuxt-link>
            </li>
        </ul>
       </div>
    </section>
</template>

<script>
export default {
    props: {
        selected: {
            type: Object,
            required: false,
            useDefaultForNull: true
        },
        categories: {
            type: Array,
            required: true
        }
    }
}
</script>
