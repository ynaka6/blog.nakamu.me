import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default ({ app }, inject) => {
    inject('dayjs', ((string) => dayjs(string)))
}