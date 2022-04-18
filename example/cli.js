const [projectId, secretId] = process.argv.slice(2)
console.log(require('../')({
  projectId, secretId, force: true
}))
