"use strict";

(async () => {

  const HTTP_PORT = process.env.WEB_PORT || 8081
  const morgan = require('morgan')
  const express = require('express')
  const serveIndex = require('serve-index')
  const app = express()
  const router = express.Router()
  const util = require('util')

  let path_in_url = '/' // path of the URL
  let path_to_expose = `${__dirname}/static` // directory to expose
  if(process.env.STATIC_PATH_IN_URL != undefined && process.env.STATIC_PATH_IN_URL != "") {
    path_in_url = process.env.STATIC_PATH_IN_URL
  }
  if(process.env.STATIC_PATH_TO_EXPOSE != undefined && process.env.STATIC_PATH_TO_EXPOSE != "") {
    path_to_expose = process.env.STATIC_PATH_TO_EXPOSE
  }
  let reg_exp = new RegExp("^\\.")
  path_to_expose = path_to_expose.replace(reg_exp, __dirname)
  console.log(' >>> dirname=[%s] cwd=[%s]', __dirname, process.cwd())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'))
  app.disable('x-powered-by')

  const server = app.listen( HTTP_PORT, () => {
    console.log(' >> App is running in HTTP_PORT=[%s] ', HTTP_PORT)
  })

  let serverRootPath = `${process.cwd()}`
  let index_file = 'index.html' // { false, <index file name>}

  // vvv basic authentication vvv
  const basic_auth = require('basic-auth')
  let site_credentials = {}
  let set_basic_auth = false
  let auth = (request, response, next) => {
    return next()
  }
  if(( process.env.USERID != undefined || process.env.PASSWD != undefined )
     && ( process.env.USERID != "" || process.env.PASSWD != "" ) ) {
    set_basic_auth = true
    site_credentials.name = process.env.USERID || "default_name"
    site_credentials.pass = process.env.PASSWD || "default_pass"
    auth = (request, response, next) => {
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
  }
  if(set_basic_auth) {
    app.use(path_in_url, auth)
    console.log(' >>> BASIC AUTH name=[%s] pass=[%s]', site_credentials.name, site_credentials.pass)
  }
  // ^^^ set basic auth ^^^

  app.use(path_in_url, express.static(path_to_expose, { index: index_file }))
  app.use(path_in_url, serveIndex(path_to_expose, {
    icons: true,
    view: 'details'
  }))
  console.log(' >> [PATH] url=[http://localhost:%s%s] exposed_dir=[%s] path_in_url=[%s]', HTTP_PORT, path_in_url, path_to_expose, path_in_url)

  // healthcheck
  app.get('/healthcheck', (req, res) => {
    res.status(200).send()
  })

  // check POST headers and body
  /*
  app.post('/check', (req, res) => {
    console.log(util.inspect(req.headers, false, null, true))
    console.log(util.inspect(req.body, false, null, true))
    res.status(200).send("00")
  })
  */

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
