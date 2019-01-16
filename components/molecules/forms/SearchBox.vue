<template>
    <div>
        <div class="control has-icons-left has-icons-right" :class="{'is-large is-loading': this.loading}">
            <input type="text" placeholder="" class="input is-rounded is-fullwidth" v-model="keyword">
            <span class="icon is-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
            </span>
        </div>

        <div class="dropdown is-block is-fullwidth is-right" :class="{'is-active': this.algoliaResults.length > 0}">
            <div class="dropdown-menu suggest">
                <div class="dropdown-content suggest__content">
                    <nuxt-link
                        v-for="(algoliaResult, index) in algoliaResults" :key="index"
                        :to="{ name: 'posts-slug', params: { slug: algoliaResult.slug }}"
                        class="dropdown-item"
                        @click.native="clearKeyword"
                    >
                        <p class="suggest__item__title" v-html="algoliaResult._highlightResult.title.value"></p>
                        <p class="suggest__item__description has-text-dark" v-html="algoliaResult._highlightResult.description.value"></p>
                    </nuxt-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import algoliasearch from 'algoliasearch'
const algoliaSearch = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY)
const algoliaClient= algoliaSearch.initIndex('myblog')

export default {
    data (context) {
        return {
            keyword: '',
            algoliaResults: [],
            loading: false,
        }
    },
    watch: {
        keyword: function(val) {
            if (val === '') {
                this.algoliaResults = []
                return
            }
            this.loading = true
            algoliaClient.search(val, function (err, content) {
                this.loading = false
                if (err) {
                    throw err
                }
                this.algoliaResults = content.hits
            }.bind(this))
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.algoliaResults = []
        },
        clearKeyword() {
            this.keyword = ''
            this.algoliaResults = []
        }
    }
}
</script>

<style lang="scss" scoped>
.suggest {
    max-width: 100%;
}
.suggest__content {
    max-height: 15rem;
    overflow-y: scroll;
}

.suggest__item__title {
    font-size: 1.2rem;
    margin-bottom: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    em {
        font-weight: bold;
        color: #ff5f5f;
        background: lighten(#ff5f5f, 20%);
        white-space: nowrap;
        border-radius: 4px;
        padding: 0 .2em;
    }
}

.suggest__item__description {
    font-size: 1rem;
    margin-bottom: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    em {
        font-weight: bold;
        color: #ff5f5f;
        background: lighten(#ff5f5f, 20%);
        white-space: nowrap;
        border-radius: 4px;
        padding: 0 .2em;
    }
}


@media screen and (min-width: 1088px) {
    .suggest {
        max-width: none;
    }
}
</style>

