const contentful = require('contentful-management')

module.exports = {
  createClientManagement () {
    return contentful.createClient({
      accessToken: process.env.CTF_CMA_ACCESS_TOKEN
    })
  }
}
