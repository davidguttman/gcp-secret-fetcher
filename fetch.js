const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

const [PROJECT, SECRET_NAME] = process.argv.slice(2)

const client = new SecretManagerServiceClient()

client
  .accessSecretVersion({ name: nameToPath(SECRET_NAME) })
  .then(v => v[0].payload.data.toString())
  .then(console.log)

function nameToPath (name) {
  return `projects/${PROJECT}/secrets/${name}/versions/latest`
}
