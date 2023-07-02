#!/bin/bash

SECRETS='dev prod'
for SECRET in $SECRETS
do
    if test -f ".chart/values.$SECRET.yaml"; then
        .secrets/encrypt.sh ".chart/values.$SECRET.yaml" && git add ".chart/values.$SECRET.yaml"
    fi
done
