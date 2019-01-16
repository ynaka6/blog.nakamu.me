<template>
<div>
    <div class="card article">
        <header class="card-header font-quicksand is-size-1x2">
            プロフィール
        </header>
        <div class="card-content">

            <div class="media is-block-mobile">
                <div class="media-content">
                    <lazy-component>
                        <figure class="image is-profile-image is-circle">
                            <img :src="person.fields.image.fields.file.url" alt="なかむプロフィール">
                        </figure>
                    </lazy-component>
                    <p class="title is-5 is-profile-name">
                        <a :href="person.fields.url" target="_blank" rel="noreferrer">
                            {{ person.fields.name }}
                            <sup>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"/></svg>
                            </sup>
                        </a>
                    </p>
                </div>
            </div>
            <div class="content">
                <p class="subtitle is-6 m-b-10" v-text="person.fields.shortBio"></p>
                <div class="socials">
                    <a
                        :href="'https://twitter.com/' + person.fields.twitter"
                        target="_blank"
                        style="color: #55acee;"
                        rel="noreferrer"
                        aria-label="Twitter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg>
                    </a>
                    <a
                        :href="'https://github.com/' + person.fields.github"
                        target="_blank"
                        style="color: #333;"
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"/></svg>
                    </a>
                </div>
                <a :href="person.fields.url" class="is-pulled-right" target="_blank" rel="noreferrer">
                    プロフィール詳細はこちら
                    <sup>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"/></svg>
                    </sup>
                </a>
                <div class="is-clearfix"></div>
            </div>

        </div>
    </div>


    <div class="card article m-t-30">
        <header class="card-header font-quicksand">
            開発・メンター相談
        </header>
        <div class="card-content">
        <aside class="menu">
            <ul class="menu-list">
            <li>
                <nuxt-link :to="{ name: 'posts-slug', params: { slug: 'i-am-programming-mentor' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
                    コードメンターの活動について
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'posts-slug', params: { slug: 'laravel-web' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
                    Laravelを利用したWEB開発
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'posts-slug', params: { slug: 'rails-web' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
                    Railsを利用したWEB開発
                </nuxt-link>
            </li>
            <li>
                <a
                href="javascript:void(0)"
                @click="$store.dispatch('toggleContactModal')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
                    問い合わせ
                </a>
            </li>
            </ul>
        </aside>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['person']
};
</script>


<style lang="scss" scoped>
    @import "~assets/style/_custom/_variable.scss";

    .card {
        border-radius: .8rem .8rem 0 0;
        .card-header {
            border-radius: .8rem .8rem 0 0;
            background: $primary;
            color: $white;
            padding: .8rem 1rem;
            font-weight: bold;

            &.is-size-1x2 {
                font-size: 1.2rem;
            }
        }
        .card-content {
            .menu {
                .menu-list {
                    a {
                        padding: .8rem .5rem;
                    }
                }
            }
        }
    }

    .image.is-profile-image {
        width: auto;
        height: auto;
        padding: 0 5rem 2rem;
    }
    .is-profile-name {
        text-align: center;
    }

    .socials {
        & > a {
            display: inline-block;
            margin-left: .5rem;
            font-size: 1.2rem;

            &:first-child {
            margin-left: 0;
            }
        }
    }
</style>
