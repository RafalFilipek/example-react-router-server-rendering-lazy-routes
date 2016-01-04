React Router Example: Server Rendering Lazy Routes
==================================================

React Router has two great features that seem like they might
not work well together: server side rendering and code splitting.

This minimal demo shows how to get the benefits of server rendering and
partial app loading with lazy routes and webpack's code splitting.

## Running

```
npm install
npm start
open http://localhost:5000
```

## Info from Rafał

### webpack.config.js
 
1. We export array instead of object to use [multi-compiler](https://github.com/webpack/webpack/blob/master/examples/multi-compiler/webpack.config.js) option.
2. There is new `getNodeModules` function to grab all instaled modules (as map). Then we can make them as external to prevent processing by webpack
3. there is simple `baseConfig` to show how many elements we can mark as *defaults*. Of course it would be nice to put all those things into separate files like
```
./webpack/base.config.js
./webpack/server.config.js
./webpack/client.config.js
```

### modules/components/

1. New `App.css` file
2. Simple import s from `./App.css` in `App.js`
2. Simple import img from `./App.png` in `App.js`

### package.json

1. While we don't want to use `babel-node`. We have to swith to `node __build__/server.js`.
2. There are some new packages for postcss and stuff like that.

### Cons

1. If you build server and client version at once it takes more time (obvious - multiple compilations). But you still (i think) can have hot-reloading and stuff.
2. `server.js` is quite big. I don't know if there are any significant performance drops

### Pros

1) UNIVERSAL LIKE HELL!

## How it works

1. Webpack's `require.ensure` defines code splitting points in the app.
2. We polyfill `require.ensure` for node to just do a normal `require`.
3. The server renders the app with `match` and the stateless
   `<RoutingContext/>`.
4. When the client JavaScript loads, we use `match` to trigger the split
   code to load before rendering. If we didn't do that, then the first
   render would be `null` and not reuse the server rendered markup.
5. We render on the client.
6. We raise our arms in the air in triumph.

