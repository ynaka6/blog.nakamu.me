const microlink = require('@microlink/vanilla/umd/microlink')

export default ({ app }, inject) => {
  inject('microlinkjs', selector => microlink(selector))
}
