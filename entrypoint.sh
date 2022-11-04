#!/bin/bash


if [ "$1" = 'start' ]; then

  rm -rf /data/assets/reactjs-mobx-app

  cp -rf /opt/reactjs-mobx-app /data/assets/

elif [ "$1" = 'stop' ]; then

  rm -rf /data/assets/reactjs-mobx-app

fi

