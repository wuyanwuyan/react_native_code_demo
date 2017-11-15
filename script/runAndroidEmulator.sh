#!/usr/bin/env bash

cd ~/Library/Android/sdk/tools

OUTPUT="$(./emulator -list-avds)"

./emulator -avd $OUTPUT
