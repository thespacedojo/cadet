const routes = require('next-routes')

module.exports = routes()
  .add('quiz', '/quiz/:slug')
