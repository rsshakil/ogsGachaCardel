#!/bin/sh

export AWS_PROFILE=ogs
git pull --no-edit
git add .
git commit -m "auto update"
git push

