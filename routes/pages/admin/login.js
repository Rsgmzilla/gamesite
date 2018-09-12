const Mustache = require("mustache");
const async = require("async");

const Config = require("../../../app/config");
const {View} = require("../../../app/view");

module.exports = (req, res, next) => {

    async.parallel({
        layout: (cb) => {
            View.getView(View.ADMIN_LAYOUT, cb);
        },
        header: (cb) => {
            View.getView(View.ADMIN_HEADER, cb);
        },
        content: (cb) => {
            View.getView(View.ADMIN_LOGIN, cb);
        }
    }, (err, results) => {

        if(err){
            const errObj = {code: 404, mes: Config.ER_PNF};
            next(errObj);
        } else {
            const main = Mustache.render(results.layout, {title: "Auth"},
                {
                    header: results.header,
                    content: results.content
                });

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(main);
        }
    });
};