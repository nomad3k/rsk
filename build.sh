#!/bin/bash
yarn build
docker build -t journey .
