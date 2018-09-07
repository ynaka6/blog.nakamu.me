<template>
    <div class="modal" :class="{'is-active': modal}">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-content">
            <section class="modal-card-body">
                <div class="has-text-centered">
                    <h2 class="title has-text-dark is-underline is-text-font-quicksand">Contact</h2>
                    <p class="subtitle has-text-dark is-7">お問い合わせ</p>
                </div>

                <div v-if="input">
                    <form
                        @submit.prevent="validateBeforeSubmit"
                        novalidate
                    >
                        <div class="columns">
                            <div class="column is-offset-1 is-10">
                                <div class="field">
                                    <label class="label">氏名</label>
                                    <div class="control has-icons-left">
                                        <input
                                            class="input"
                                            name="name"
                                            type="text"
                                            v-model="name"
                                            v-validate="'required'"
                                            data-vv-as="氏名"
                                            :class="{ 'is-danger': errors.has('name') }"
                                        >
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <p class="help is-danger" v-if="errors.has('name')">
                                        {{ errors.first('name') }}
                                    </p>
                                </div>

                                <div class="field">
                                    <label class="label">メールアドレス</label>
                                    <div class="control has-icons-left">
                                        <input
                                            class="input"
                                            name="email"
                                            type="email"
                                            v-model="email"
                                            v-validate="'email'"
                                            data-vv-as="メールアドレス"
                                            :class="{ 'is-danger': errors.has('email') }"
                                        >
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <p class="help is-danger" v-if="errors.has('email')">
                                        {{ errors.first('email') }}
                                    </p>
                                    <p class="help">
                                        ※ 返信が必要な方はメールアドレスをご入力ください
                                    </p>
                                </div>

                                <div class="field">
                                    <label class="label">種別</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select
                                                name="title"
                                                v-model="title"
                                                v-validate="'required'"
                                                data-vv-as="種別"
                                                :class="{ 'is-danger': errors.has('title') }"
                                            >
                                                <option>メンター依頼</option>
                                                <option>仕事相談・依頼</option>
                                                <option>その他</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p class="help is-danger" v-if="errors.has('title')">
                                        {{ errors.first('title') }}
                                    </p>
                                </div>

                                <div class="field">
                                    <label class="label">問い合わせ内容</label>
                                    <div class="control">
                                        <textarea
                                            name="body"
                                            v-model="body"
                                            class="textarea"
                                            placeholder="お問い合わせ内容を入力してください。"
                                            v-validate="'required'"
                                            data-vv-as="問い合わせ内容"
                                            :class="{ 'is-danger': errors.has('body') }"
                                        ></textarea>
                                    </div>
                                    <p class="help is-danger" v-if="errors.has('body')">
                                        {{ errors.first('body') }}
                                    </p>
                                </div>

                                <button class="button is-success is-large is-rounded is-fullwidth">
                                    送信
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <div class="columns m-t-40 has-text-centered">
                        <div class="column is-offset-1 is-10">
                            <h3 class="title has-text-dark is-4">
                                お問い合わせありがとうございます
                            </h3>
                            <p class="subtitle has-text-dark is-6 m-t-20 m-b-50">
                                この度はお問い合わせいただきありがとうございます。<br>
                                メールアドレスを入力頂いた方には、後ほどご連絡をさせていただきますので、今しばらくお待ちください。
                            </p>
                            <button
                                class="button is-success is-large is-rounded is-fullwidth"
                                @click="closeModal"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <button class="modal-close is-large" @click="closeModal"></button>
    </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: 'ContactModal',
  props: {
  },
  computed: {
    modal() {
      return this.$store.getters.isContactModal;
    },
  },
  methods: {
    closeModal() {
      this.input = true;
      this.$store.dispatch('closeContactModal');
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios.post('/contact', {
            name: this.name,
            email: this.email,
            title: this.title,
            body: this.body,
          })
            .then(() => {
              this.input = false;
              this.name = null;
              this.email = null;
              this.title = null;
              this.body = null;
            });
        }
      });
    },
  },
  data: () => ({
    input: true,
    name: null,
    email: null,
    title: 'メンター依頼',
    body: null,
  }),
};
</script>

<style scoped>
</style>
