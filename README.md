# tadd

Installs package and automatically finds Typescript typings.

```
npm install --global tadd
```
or 
```
yarn global add tadd
```

## Usage

```
tadd react redux
```
Currently uses yarn to install deps.

## Todo
 - support npm
 - npm search when no `@types` typings available
 - cooler CLI

## Development
```
ts-node ./src/cli.ts [package-name]
```