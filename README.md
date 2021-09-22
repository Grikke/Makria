# Makria

[![NPM](https://nodei.co/npm/makria.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/makria/)

## Installation
With Shell Console

```sh
npm i makria
```

## Methods

- .authValue(key)
Recover the stored value in the key

- .removeAuthValue(key)
Remove the stored value in the key

- .generateKey(value)
Generate a random key for specified value, store it to retrieve the value

- .checkIP
Check if the address didn't already request, Callback to use as a Middleware for Express