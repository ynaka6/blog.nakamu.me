# myblog
[![Netlify Status](https://api.netlify.com/api/v1/badges/cf529e87-8a15-41e2-ba14-55960a8d18cd/deploy-status)](https://app.netlify.com/sites/nakamublog/deploys)

Nuxt.js + Contentful + TailwindCSSを利用した技術ブログです。
日々の開発ノウハウや海外居住情報をまとめて投稿しています。

# Usage
## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

## 環境変数（.env）
``` bash
$ cat <<EOF > .env
APP_TITLE=
APP_SUBTITLE=
APP_DESCRIPTION=
BASE_URL=
CTF_BLOG_POST_TYPE_ID=
CTF_CDA_ACCESS_TOKEN=
CTF_PERSON_ID=
CTF_SPACE_ID=
PAGENATE_LIMIT=
PROFILE_SITE_URL=
CONTACT_API_URL=
EOF
```

環境変数名    |説明
--------------|----------------------------
`APP_TITLE` |`タイトル`
`APP_SUBTITLE`  |`サブタイトル`
`APP_DESCRIPTION`  |`詳細説明`
`BASE_URL`  |`ベースURL: ex. https://blog.nakamu.life`
`CTF_BLOG_POST_TYPE_ID`  |`ContentfulのTypeID`
`CTF_CDA_ACCESS_TOKEN`  |`Contentfulのアクセストークン`
`CTF_PERSON_ID`  |`Contentfulのアクセストークン`
`CTF_SPACE_ID`  |`Contentfulのアクセストークン`
`PROFILE_SITE_URL`  |`プロフィールサイトのURL: ex. https://nakamu.life`
`CONTACT_API_URL`  |`getform.ioを利用した問い合わせAPIのURL`


# Licence
This software is released under the MIT License, see LICENSE.

# Authors
[@nakanakamu0828]()https://twitter.com/nakanakamu0828
