# node-downloadserver-basicauth
## What's this?
This is the easy server to publish files in directory with restriction by basic authentication.   
!!! [Caution] Directory indexing is ON !!!

## How to setup
all of setting/configutation is written in `.env`.
```shell:.env
CONTAINER_NAME=serve_static_files
WEB_PORT_TO_EXPOSE=8081
BASICAUTH_USERID=userid
BASICAUTH_PASSWD=passwd
STATIC_PATH_IN_URL=/
STATIC_PATH_TO_EXPOSE=/tmp/download
```

Each parameters are used for purpose of configuring these.

- `CONTAINER_NAME` : name of the container
- `WEB_PORT_TO_EXPOSE` : exposed port for web server
- `BASICAUTH_USERID` : userid of basic authentication
- `BASICAUTH_PASSWD` : password of basic authentication
- `STATIC_PATH_IN_URL` : path of the URL
- `STATIC_PATH_TO_EXPOSE` : path of the directory to expose

## build

```bash
$ docker-compose up --build -d;
```

## LISENCE
MIT
