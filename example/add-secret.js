const { spawnSync, execSync } = require('child_process')
const [projectId, secretId, secretValueFile] = process.argv.slice(2)

if (!projectId || !secretId || !secretValueFile) {
  console.error('USAGE: node ./add-secret.js gcp-project-id secret-id .env')
  process.exit(1)
}

try {
  execSync(`gcloud secrets create ${secretId} --replication-policy="automatic" --project=${projectId}`)
} catch (err) {
  console.error(err)
}

spawnSync('gcloud', `secrets versions add ${secretId} --project=${projectId} --data-file=${secretValueFile}`.split(' '))

execSync(`gcloud secrets add-iam-policy-binding --member=serviceAccount:${projectId}@appspot.gserviceaccount.com --role=roles/secretmanager.secretReader --project=${projectId} ${secretId}`)

console.log(require('../')({
  projectId, secretId, force: true
}))
