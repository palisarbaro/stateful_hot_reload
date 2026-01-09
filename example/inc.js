const { inc_by } = require("./constants");

const inc = (counter) => counter + inc_by;

module.exports = {
    inc
}