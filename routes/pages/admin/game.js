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
        content: (cb) => {
            View.getView(View.ADMIN_GAME, cb);
        }
    }, (err, results) => {

        if(err){
            const errObj = {code: 404, mes: Config.ER_PNF};
            next(errObj);
        } else {

            if(req.params.method === "create"){
                const actionLink = req.params.method;

                const main = Mustache.render(results.layout, {title: "Create new game", actionLink: actionLink},
                    {
                        header: results.header,
                        footer: results.footer,
                        content: results.content
                    });

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(main);
            } else if(req.params.method === "update"){
                GameManager.info(req.params.alias, (err, game) => {
                    if(err){
                        next(err);
                    } else {
                        const actionLink = req.params.method + "/" + game.alias;

                        const main = Mustache.render(results.layout, {title: "Update game", actionLink: actionLink, game: game},
                            {
                                header: results.header,
                                footer: results.footer,
                                content: results.content
                            });

                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(main);
                    }
                });
            }
        }
    });
};