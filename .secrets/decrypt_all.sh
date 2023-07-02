#!/bin/bash

SECRETS='dev prod'
for SECRET in $SECRETS
do
    if test -f ".chart/values.$SECRET.yaml"; then
        .secrets/decrypt.sh ".chart/values.$SECRET.yaml"
    fi
done
