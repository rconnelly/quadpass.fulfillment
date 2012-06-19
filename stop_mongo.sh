#!/bin/bash
ps -ef | grep -v 'grep' | grep mongod | awk '{ print $2; }' | xargs kill
