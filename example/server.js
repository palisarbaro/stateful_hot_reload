const express = require("express");
const { inc } = require("./inc");

const start_server = (state) => {
    let app = express();
    app.get("/", (req, res) => {
        res.type('html');
        state.counter = inc(state.counter);
        res.send(state.counter.toString());
    })
    let server = app.listen(9900, () => { console.log(globalThis.RELOADED? "server reloaded" : "server started") });
    let shutdown = async () => await new Promise(r => {
        server.closeAllConnections(); // this forces express to close faster
        server.close(r);
    })
    return shutdown;
}
module.exports = {
    start_server
}