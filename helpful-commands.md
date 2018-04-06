# Helpful Commands

## Gifs

Attempt to optimise gifs

``` bash
npx gifsicle --optimize=100 --colors=256  store-cropped.gif > store-optimized.gif
```

Cropping gifs

``` bash
npx gifsicle --optimize=100 --colors=256  store-cropped.gif > store-optimized.gif
```

## Development

Start a dev server

``` bash
npm run server
```

## Deploy

Simple deploy

``` bash
npm run deploy
```

## Markers

Generate the markers for printing

``` bash
// TODO proxy the aruco library to the directory with http-server
npx http-server markers
```
