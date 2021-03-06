var dotenv = require('dotenv')
var { execSync } = require('child_process')

module.exports = function ({ projectId, secretId, mergeEnv, force }) {
  if (process.env.NODE_ENV !== 'production' && !force) return {}

  var remoteEnv = dotenv.parse(
    execSync(`node ${__dirname}/fetch.js ${projectId} ${secretId}`)
  )

  if (mergeEnv) merge(remoteEnv)
  return remoteEnv
}

function merge (remoteEnv) {
  Object.keys(remoteEnv).forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(process.env, key)) return
    process.env[key] = remoteEnv[key]
  })
}
