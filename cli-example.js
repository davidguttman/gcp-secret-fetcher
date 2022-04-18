process.env.NODE_ENV = 'production'
const [projectId, secretId] = process.argv.slice(2)
console.log(require('./')({
  projectId, secretId
}))
