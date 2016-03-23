#!/bin/bash

DIR_ROOT=/data/heihey/heihey_web
DIR_PACKAGE=/data/package/server
BUILDTIME=$(date "+%Y%m%d.%H%M%S")
VERSION=1.0.0

rm -fr ${DIR_ROOT}/*
cp -r ../build/* ${DIR_ROOT}/

tar cvfz ${DIR_PACKAGE}/heihey_web-${VERSION}.${BUILDTIME}.tar.gz -C ${DIR_ROOT} .

