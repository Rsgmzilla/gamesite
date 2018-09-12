const Mustache = require("mustache");
const async = require("async");

const Config = require("../../../app/config");
const {View} = require("../../../app/view");
const {GameManager} = require("../../../app/game");

module.exports = (req, res, next) => {

    async.parallel({
        layout: (cb) => {
            View.getView(View.ADMIN_LAYOUT, cb);
        },
        header: (cb) => {
            View.getView(View.ADMIN_HEADER, cb);
        },
        confirm: (cb) => {
            View.getView(View.CONFIRM, cb);
        },
        content: (cb) => {
            View.getView(View.ADMIN_MAIN, cb);
        }
    }, (err, results) => {

        if(err){
            const errObj = {code: 404, mes: Config.ER_PNF};
            next(errObj);
        } else {
            GameManager.list((err, list) => {
                if(err){
                    next(err);
                } else {
                    const main = Mustache.render(results.layout, {title: "List of games", games: list},
                        {
                            header: results.header,
                            confirm: results.confirm,
                            content: results.content
                        });

                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(main);
                }
            });
        }
    });
};