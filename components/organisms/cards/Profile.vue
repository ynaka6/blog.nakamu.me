<template>
<div>
    <div class="card article">
        <header class="card-header font-quicksand is-size-1x2">
            プロフィール
        </header>
        <div class="card-content">

            <div class="media is-block-mobile">
                <div class="media-content">
                <figure class="image is-profile-image is-circle">
                    <img :src="person.fields.image.fields.file.url" alt="Image">
                </figure>
                <p class="title is-5 is-profile-name">
                    <a :href="person.fields.url" target="_blank">{{ person.fields.name }}</a>
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
                    >
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a
                        :href="'https://github.com/' + person.fields.github"
                        target="_blank"
                        style="color: #333;"
                    >
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <a :href="person.fields.url" class="is-pulled-right" target="_blank">プロフィール詳細はこちら <i class="fas fa-caret-right"></i></a>
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
                    <i class="fas fa-caret-right"></i>
                    コードメンターの活動について
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'posts-slug', params: { slug: 'laravel-web' }}">
                    <i class="fas fa-caret-right"></i>
                    Laravelを利用したWEB開発経歴
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'posts-slug', params: { slug: 'rails-web' }}">
                    <i class="fas fa-caret-right"></i>
                    Railsを利用したWEB開発経歴
                </nuxt-link>
            </li>
            <li>
                <a
                href="javascript:void(0)"
                @click="$store.dispatch('toggleContactModal')"
                >
                    <i class="fas fa-caret-right"></i>
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
