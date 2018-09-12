const fs = require("fs");

const Config = require("../app/config");

module.exports = function (obj, res, next) {

    fs.stat(obj.path, (err, stats) => {
        if(err || !stats.isFile()){
            const errObj = {code: 404, mes: Config.ER_FNF};
            next(errObj);
        }

        fs.readFile(obj.path, (err, content) => {
            if (err) {
                const errObj = {code: 404, mes: Config.ER_FNF};
                next(errObj);
            }

            //////////////////////
            //res.writeHead(200, {"Content-Type": + obj.mime + "; charset:utf-8;"});
            res.end(content);
        });
    });


    /*let stream = fs.createReadStream(obj.path, {encoding: "utf-8"});

    stream.on("open", () => {
        res.setHeader("Content-Type", obj.mime + "; charset=utf-8");
        stream.pipe(res);
    });

    stream.on("error", () => {
        const obj = {status: 400, message: "Bad request"};

        callback(obj);
    });*/
};