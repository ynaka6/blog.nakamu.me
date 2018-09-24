<template>
  <main>
    <nav class="breadcrumb is-bg-white has-succeeds-separator has-shadow" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">プライバシーポリシー</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div class="card article">
                        <div class="card-content">
                            <div class="has-text-centered m-b-30">
                                <h2 class="title is-underline font-quicksand">Privacy Policy</h2>
                                <p class="subtitle has-text-grey is-6">プライバシーポリシー</p>
                            </div>


<h2 class="title is-5 m-b-10"><strong>個人情報の利用目的</strong></h2>
<p>当ブログでは、お問い合わせの際に、名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。</p>
<p>これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。</p>

<h2 class="title is-5 m-t-40 m-b-10"><strong>個人情報の第三者への開示</strong></h2>
<p>当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
<p>・本人のご了解がある場合</p>
<p>・法令等への協力のため、開示が必要となる場合</p>
<p>個人情報の開示、訂正、追加、削除、利用停止</p>
<p>ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。</p>
<p>アクセス解析ツールについて</p>
<p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
<p>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはここをクリックしてください。</p>

<!--
<h2 class="title is-5 m-t-40 m-b-10"><strong>広告の配信について</strong></h2>
<p>Nakamu Blogは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>
<p>第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにクッキーを設定したりこれを認識したりする場合があります。</p>
-->

<h2 class="title is-5 m-t-40 m-b-10"><strong>免責事項</strong></h2>
<p>当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
<p>当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。</p>
<p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>

<h2 class="title is-5 m-t-40 m-b-10"><strong>プライバシーポリシーの変更について</strong></h2>
<p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。</p>
<p>修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
                            

                            <div class="m-t-50">
                                <p>制定日：2018年8月15日</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
const initData = async ({ app, params }) => {
    const [ entries ] = await Promise.all([
        client.getEntries({
            'sys.id': process.env.CTF_PERSON_ID
        })
    ])

    return {
        person: entries.items[0],
        title: 'なかむ🇭🇰エンジニアブログ | 自由な場所でエンジニアとして生きていくためのメディア',
        description: '香港在住のWebデベロッパー「なかむ」が今ままでのエンジニア経験を元にした技術ブログまとめます。',
    }
}

export default {
    head () {
        return {
            title: this.title,
            titleTemplate: '%s',
            meta: [
                { name: 'description', content: this.description },

                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: this.person ? this.person.fields.twitter : '' },
                { name: 'twitter:creator', content: this.person ? this.person.fields.twitter : '' },
                { name: 'twitter:image', content: 'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill' },
                { name: 'twitter:title', content: this.title },
                { name: 'twitter:description', content: this.description },

                { name: 'og:title', content: this.title },
                { name: 'og:description', content: this.description },
            ]
        }
    },
    async asyncData (context) {
        if (process.browser) {
            return {
                person: null,
                title: 'なかむ🇭🇰エンジニアブログ | 自由な場所でエンジニアとして生きていくためのメディア',
                description: '香港在住のWebデベロッパー「なかむ」が今ままでのエンジニア経験を元にした技術ブログまとめます。',
            }
        }
        return await initData(context);
    },
}
</script>
