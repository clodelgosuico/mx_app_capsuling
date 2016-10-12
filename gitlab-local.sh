#!/usr/bin/env bash

if ps ax | grep -v grep | grep ".docker/machine/machines/default" > /dev/null
then
  echo "docker running"
else
  echo "docker not running. start docker first"
  exit -1
fi

if [ ! -e "~/.docker/machine/machines/runner/boot2docker.iso" ]
then
  docker-machine create -d virtualbox runner
fi
eval "$(docker-machine env runner)"

if [ ! -e "/tmp/gitlab-ci-multi-runner" ]
then
  mkdir -p /tmp
  curl --output /tmp/gitlab-ci-multi-runner https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/master/binaries/gitlab-ci-multi-runner-darwin-amd64
fi

chmod +x /tmp/gitlab-ci-multi-runner
/tmp/gitlab-ci-multi-runner exec docker test_job