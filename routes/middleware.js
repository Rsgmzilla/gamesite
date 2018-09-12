const path = require("path");
const mime = require("mime");
const url = require("url");
const rootPath = require("app-root-path");
const _ = require("underscore");

const Config = require("../app/config");
const {Pattern} = require("../app/view");

const ROOT = rootPath + "/public";

const filer = require("./filer");
const {admin, main, games, game, technologies, publishing, contacts, privacy, terms} = require("./pages");

const pages = [{route: main, pattern: Pattern.main},
                {route: games, pattern: Pattern.games},
                {route: game, pattern: Pattern.game},
                {route: technologies, pattern: Pattern.technologies},
                {route: publishing, pattern: Pattern.publishing},
                {route: contacts, pattern: Pattern.contacts},
                {route: privacy, pattern: Pattern.privacy},
                {route: terms, pattern: Pattern.terms},
                {route: admin, pattern: Pattern.admin}];

module.exports = (req, res) => {

    let filePath = url.parse(req.url).pathname;

    try{
        filePath = decodeURIComponent(filePath);
    } catch(e){
        handleError(400, Config.ER_BR, res);
    }

    if(~filePath.indexOf("\0")){
        handleError(400, Config.ER_BR, res);
    }

    // send file or page
    if(~filePath.indexOf(".")){
        filePath = path.normalize(path.join(ROOT, url.parse(req.url).pathname));

        const mimeType = mime.getType(filePath);

        const obj = {path: filePath, mime: mimeType};
        filer(obj, res, (err) => {
            if(err){
                handleError(err.code, err.mes, res);
            }
        });
    } else {
        res.redirect = _.bind(redirect, res);

        let isFound = false;
        for(let i = 0; i < _.size(pages); i++){

            const match = pages[i].pattern.match(req.url);
            if(match){
                isFound = true;
                pages[i].route(req, res, (err) => {
                    if(err){
                        handleError(err.code, err.mes, res);
                    }
                });
                break;
            }
        }

        if(!isFound){
            handleError(404, ER_PNF, res);
        }
    }
};

function redirect(location){
    this.writeHead(302, {'Location': location});
    this.end();
}

function handleError(code, mes, res){
    res.statusCode = code;
    res.end(mes);
}