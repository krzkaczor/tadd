# tadd

Installs packages and automatically finds best Typescript typings

[![tadd demo](https://media.giphy.com/media/l378gE3TwOAokleda/giphy.gif)]

## Install
```
npm install --global tadd
```

## Usage

```
tadd [-dev] ...packages
```

`tadd` is simple wrapper around your package manager. Supports both npm and yarn.

## Motivation
One of the biggest strengths of a Javascript ecosystem is easy access to thousands of high-quality packages on npm. When using Typescript this requires more ceremony because you need to obtain typing information. 

Except for `npm install packageX` you need to do `npm install --dev @types/packageX` as well (assuming that official typings are on npm). Initially `tadd` was meant to solve only this problem - me being too lazy to type two commands ;) but it turns out that there is much more space for improvements. 

Some packages, `redux` for example, come with builtin typings - so actually you don't have to do anything. Other times installing typings results in mismatched version. In the time of writing this readme `npm install react` installs latest stable version (15.x) but `npm install @types/react` gets typings for not yet released version (16.x). This means that you should always verify typings version installed automatically for you. 

`tadd` is here to solve all of these problems (and even more soon!).


## Todo

 - better heuristics for finding best typings
 - npm search when no official typings were available on `@types`
