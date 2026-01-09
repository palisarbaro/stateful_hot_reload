const { hot_reloading, watch } = require("../src");

let state;
const initialize_state = async () => {
    state = {
        counter: 0,
    }
}
const main = (reloaded) => {
    try{
        globalThis.RELOADED = reloaded;
        const { start_server } = require("./server"); // require inside main, otherwise you will have old version of start_serverg
        let shutdown = start_server(state);
        return shutdown;
    }
    catch(e){
        console.error(e);
        return ()=>{}
    }
}

initialize_state().then(() => {
    if (process.env.NODE_ENV == "dev") {
        hot_reloading(main);
        watch({ root: __dirname });
    }
    else {
        main(false);
    }
})