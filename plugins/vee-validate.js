import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: 'ja' });
