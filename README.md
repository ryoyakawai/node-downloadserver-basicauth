# node-downloadserver-basicauth
## What's this?
This is the easy server to publish files in directory with restriction by basic authentication.   
!!! [Caution] Directory indexing is ON !!!

## How to setup
all of setting/configutation is written in `.env`.
```shell:.env
CONTAINER_NAME=download_server
WEB_PORT_TO_EXPOSE=8081
BASICAUTH_USERID=userid
BASICAUTH_PASSWD=passwd
DOWNLOAD_FILE_DIR=/tmp/download
```

Each parameters are used for purpose of configuring these.

- `CONTAINER_NAME` : name of the container
- `WEB_PORT_TO_EXPOSE` : exposed port for web server
- `BASICAUTH_USERID` : userid of basic authentication
- `BASICAUTH_PASSWD` : password of basic authentication
- `DOWNLOAD_FILE_DIR` : directory to expose in web content

## build

```bash
$ docker-compose up --build -d;
```

## LISENCE
MIT
