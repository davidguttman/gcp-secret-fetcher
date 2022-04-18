# GCP Secret Fetcher

Because using secrets with GAE is a PITA. This allows you to keep secrets in Google Secret Manager in a format similar to environment variables/heroku/dotenv etc... and use them in production with GAE.

This module uses (abuses?) `child_process` to "synchronously" fetch secrets so that you don't need to make changes to your app to handle async secrets.

## Usage

If you have a `config.js` that looks something like:

```
require('dotenv').config()

module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
  ...
```

You'd just change it to:

```
require('dotenv').config()

require('gcp-secret-fetcher')({
  projectId: 'your-gcp-project-id',
  secretId: 'the-id-of-the-secret',
  mergeEnv: true // will merge the fetched variables into process.env for you
})

module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
  ...
```

Note: `gcp-secret-fetcher` will only run if `NODE_ENV` is set to "production".

## License

MIT
