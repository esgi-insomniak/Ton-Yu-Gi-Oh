#!/bin/bash

if [ -x "$(command -v sops)" ]; then
  SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

  export SOPS_AGE_KEY_FILE=${SCRIPT_DIR}/age-key.txt
  sops --decrypt --in-place $1
fi
