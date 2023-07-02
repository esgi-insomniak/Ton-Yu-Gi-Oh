# SOPS

## Installer SOPS

* [https://github.com/mozilla/sops/releases](https://github.com/mozilla/sops/releases)
* **OU** `brew install sops` 

## Récuperer la KEY

Récuperer la clé age key

Créer un fichier `.secrets/age-key.txt` s'il n'existe pas et ajouté y la clé

```ìni
# created: YYYY-MM-DDTHH:MM:SS+01:00
# public key: abcdefghijklmopqrstuvyz
AGE-SECRET-KEY-abcdefghijklmopqrstuvyz0123456789
```

## Encrypter un fichier

```shell
./.secrets/encrypt.sh [PATH]
```

## Décrypter un fichier

```shell
./.secrets/decrypt.sh [PATH]
```
