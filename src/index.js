const fs = require('fs');
const path = require('path');
let main_fn, shutdown, reloading = false, timeout;

const watch = ({ root, ignore = [/\/node_modules\//], debounce_timeout = 100 } = {}) => {
    let watcher = fs.watch(root, { recursive: true }, (eventType, filename) => {
        let full_path = path.join(root, filename);
        if (ignore.some(regex => regex.test(full_path))) {
            return;
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            do_reload();
        }, debounce_timeout);
    });
    return () => watcher.close();
}
const hot_reloading = async (main) => {
    main_fn = main;
    shutdown = await main_fn(false);
}

const do_reload = async () => {
    if (reloading) return false;
    reloading = true;
    await shutdown();
    for (let m of Object.keys(require.cache)) {
        delete require.cache[m];
    }
    shutdown = await main_fn(true);
    reloading = false;
    return true;
}

module.exports = {
    hot_reloading,
    do_reload,
    watch
}