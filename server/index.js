"use strict";

(async () => {

  const HTTP_PORT = process.env.WEB_PORT || 8081
  const morgan = require('morgan')
  const express = require('express')
  const serveIndex = require('serve-index')
  const app = express()
  const router = express.Router()

  const path_to_target = '/download'
  const path_to_target_dest = `${process.env.DOWNLOAD_FILE_DIR}` || `.${path_to_target}`

  const basic_auth = require('basic-auth')
  let site_credentials = {}
  site_credentials.name = process.env.USERID || "default_name"
  site_credentials.pass = process.env.PASSWD || "default_pass"

  let serverRootPath = `${process.cwd()}`
  let index_file = 'index.html' // { false, <index file name>}

  console.log(' >>> BASIC AUTH name=[%s] pass=[%s]', site_credentials.name, site_credentials.pass)
  console.log(' >>> dirname=[%s] cwd=[%s]', __dirname, process.cwd())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'))
  app.disable('x-powered-by')

  const auth = (request, response, next) => {
    const new_user = basic_auth(request)
    const response401 = () => {
      response.set('WWW-Authenticate', 'Basic')
      return response.status(401).send()
    }

    if (!new_user
        || new_user.name != site_credentials.name
        || new_user.pass != site_credentials.pass)  {
      response.set('WWW-Authenticate', 'Basic')
      return response.status(401).send()
    }
    return next()
  }

  const server = app.listen( HTTP_PORT, () => {
    console.log(' >> App is running in HTTP_PORT=[%s] ', HTTP_PORT)
  })

  app.use(path_to_target, auth)
  app.use(path_to_target, express.static(path_to_target_dest, { index: index_file }))
  app.use(path_to_target, serveIndex(path_to_target_dest, {
    icons: true,
    view: 'details'
  }))
  console.log(' >> [PATH] targetDir=[%s] url=[%s]', path_to_target, path_to_target_dest)

  // healthcheck
  app.get('/healthcheck', (req, res) => {
    res.status(200).send()
  })

  // 404 Not Found
  app.get('*', function(req, res){
    res.status(404).send('404 Not Found')
  })
  app.post('*', function(req, res){
    res.status(404).send('404 Not Found')
  })
  app.put('*', function(req, res){
    res.status(404).send('404 Not Found')
  })
  router.get('*', function(req, res){
    res.status(404).send('404 Not Found')
  })
  router.post('*', function(req, res){
    res.status(404).send('404 Not Found')
  })
  router.put('*', function(req, res){
    res.status(404).send('404 Not Found')
  })

})()
