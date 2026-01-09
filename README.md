# A simple hot reload library for node.js that allows you to preserve application state across reloads.
## DON'T USE IN PRODUCTION
## Why not use nodemon or something similar?
They just reboot the whole application, meaning you lose its state.  
This leads to the following problems.  
1. This slows down reloads because state initialization is slow (connecting to the database, waiting for other services, etc.).
2. During development, it can be quite tedious to click buttons in the browser to get the app state suitable for testing a specific feature. Losing the app state forces you to repeat this process over and over again.

## Installation
```npm i @palisarbaro/stateful_hot_reload```

## Limitations
1. You should not relay on require cache
2. Works only with commonjs modules
3. `main` function shouldn't throw (otherwise saving invalid code can terminate node process)

## Usage
1. You should have `main` function that accept boolean (true if reloaded, false if first run) and return `shutdown` function.
2. Do the state inititalization.
3. Only then call `hot_reloading` with `main` function.
4. Call `watch` to monitor changes. Or call `do_reload` manually when you need to reload.  
Both `main` and `shutdown` can be async

### hot_reloading
Immidiatly calls `main`

### do_reload
Stops the previous run by calling `shutdown`  
Clears require cache, so you can reimport new version of code.  
Calls `main` again.  

### watch
`root` - directory to watch  
`ignore` - array of RegExp applied to full path of watched files (default is `[/\/node_modules\//]`)  
`debounce_timeout` - delay(milliseconds) before reload to prevent multiple reloads when saving multiple files (default is 100 ms)  