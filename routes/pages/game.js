const Mustache = require("mustache");
const async = require("async");

const {View, Pattern} = require("../../app/view");
const {GameManager} = require("../../app/game");
const Config = require("../../app/config");

module.exports = (req, res, next) => {

    async.parallel({
        layout: (cb) => {
            View.getView(View.MAIN_LAYOUT, cb);
        },
        header: (cb) => {
            View.getView(View.HEADER, cb);
        },
        footer: (cb) => {
            View.getView(View.FOOTER, cb);
        },
        content: (cb) => {
            View.getView(View.GAME, cb);
        }
    }, (err, results) => {

        if(err){
            const errObj = {code: 404, mes: Config.ER_PNF};
            next(errObj);
        } else {
            const gameAlias = Pattern.game.match(req.url);

            GameManager.info(gameAlias.alias, (err, game) => {
                if(err){
                    next(err);
                } else {
                    const page = Mustache.render(results.layout, {title: game.getName(), game: game},
                        {
                            header: results.header,
                            footer: results.footer,
                            content: results.content
                        });

                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(page);
                }
            });
        }
    });
};