<template>
  <div>
    <breadcrumb
      :list="[
        { link: '/', label: 'Home' },
        { link: null, label: 'お問い合わせ' }
      ]"
    />
    <section class="container mx-auto">
      <div class="flex justify-center">
        <div class="lg:w-4/5 lg:p-6">
          <n-title class="text-3xl mt-10">
            お問い合わせ
          </n-title>
          <div class="flex flex-wrap justify-center">
            <contact-form :submitting="submitting" @submit="submit" />
          </div>
        </div>
      </div>
    </section>
    <alert :message="message" type="success" @close="closeAlert" />
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import ContactForm from '~/components/molecules/Contact/ContactForm'
import Alert from '~/components/molecules/Alert'
import Breadcrumb from '~/components/molecules/Breadcrumb'

export default {
  components: { NTitle, ContactForm, Alert, Breadcrumb },
  data: () => ({
    message: null,
    messageType: null,
    submitting: false
  }),
  methods: {
    submit(form) {
      this.submitting = true
      this.$axios
        .post(process.env.CONTACT_API_URL, form)
        .then(response => {
          this.messageType = 'success'
          this.message = {
            title: '問い合せが完了しました',
            description:
              'お問い合わせありがとうございます。ご指定のメールアドレスにご連絡させて頂きます。返信お待ちください。'
          }
          this.submitting = false
        })
        .catch(response => {
          this.messageType = 'error'
          this.message = {
            title: '問い合せに失敗しました。',
            description:
              '問い合わせに失敗しました。大変申し訳ありませんが、メールやSNSからご連絡ください。'
          }
          this.submitting = false
        })
    },
    closeAlert() {
      this.message = null
    }
  }
}
</script>
