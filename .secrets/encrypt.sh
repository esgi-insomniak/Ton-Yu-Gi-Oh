#!/bin/bash

if [ -x "$(command -v sops)" ]; then
  SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

  export SOPS_AGE_RECIPIENTS=$(<${SCRIPT_DIR}/public-age-keys.txt)
  sops --encrypt --in-place $1
fi
