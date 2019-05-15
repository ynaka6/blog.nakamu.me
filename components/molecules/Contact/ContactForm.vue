<template>
  <form
    class="bg-white border shadow-md rounded lg:px-8 pt-6 pb-8 mt-5 mb-10"
    novalidate
    @submit.prevent="submit"
  >
    <div class="flex flex-wrap mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
          for="name"
        >
          名前
        </label>
        <input
          id="name"
          v-model.trim="form.name"
          type="text"
          name="name"
          placeholder="山田 太郎"
          class="appearance-none block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          :class="{ 'border-red': client && $v.form.name.$error }"
        />
        <p
          v-if="client && $v.form.name.$error && !$v.form.name.required"
          class="text-red-500 text-xs italic"
        >
          名前は必須です
        </p>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
          for="email"
        >
          メールアドレス
        </label>
        <input
          id="email"
          v-model.trim="form.email"
          type="email"
          name="email"
          placeholder="example@nnn.com"
          class="appearance-none block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="{ 'border-red': client && $v.form.email.$error }"
        />
        <p
          v-if="client && $v.form.email.$error && !$v.form.email.required"
          class="text-red-500 text-xs italic"
        >
          メールアドレスは必須です
        </p>
        <p
          v-if="client && $v.form.email.$error && !$v.form.email.email"
          class="text-red-500 text-xs italic"
        >
          メールアドレスの形式が不正です。
        </p>
      </div>
    </div>
    <div class="mx-3 mb-6 px-3">
      <label class="block text-gray-600 text-sm font-bold mb-2" for="content">
        問い合わせ内容
      </label>
      <textarea
        v-model.trim="form.content"
        name="content"
        rows="6"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 mb-3 bg-gray-200 focus:outline-none focus:bg-white"
        :class="{ 'border-red': client && $v.form.content.$error }"
      ></textarea>
      <p
        v-if="client && $v.form.content.$error && !$v.form.content.required"
        class="text-red-500 text-xs italic"
      >
        問い合わせ内容は必須です
      </p>
    </div>
    <div class="flex items-center justify-center">
      <button
        type="submit"
        class="bg-blue-600 text-lg text-white font-bold py-4 px-8 border-b-4 border-blue-700 rounded"
        :class="{
          'cursor-not-allowed opacity-50': submitting,
          'hover:bg-blue hover:border-blue-600': !submitting
        }"
      >
        送信する
      </button>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  components: {},
  props: {
    submitting: { type: Boolean, required: false, default: false }
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      content: ''
    },
    client: process.client
  }),
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      content: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    submit: function() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.$emit('submit', this.form)
    }
  }
}
</script>
