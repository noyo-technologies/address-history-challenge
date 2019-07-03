#!/usr/bin/env node

const exec = require('child_process').exec
const path = require('path')

const connectionString = `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_DATABASE}`
const cmd = `node_modules/.bin/sequelize db:migrate --url="${connectionString}" --migrations-path="${path.join(__dirname, 'migrations')}"`

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    throw new Error(error)
  }
})
