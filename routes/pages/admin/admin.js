const qs = require("querystring");
const _ = require("underscore");

const {Pattern} = require("../../../app/view");
const Config = require("../../../app/config");
const {Game, GameManager} = require("../../../app/game");

const loginRoute = require("./login");
const mainRoute = require("./main");
const gameRoute = require("./game");

module.exports = (req, res, next) => {

    req.params = {};

    const match = Pattern.admin.match(req.url);

    if(match.id === "login"){
        if(!req.session.auth){
            logIn(req, res, next);
        } else {
            mainRoute(req, res, next);
        }
    } else {
        if(!req.session.auth){
            res.redirect("/admin/login");
        } else {
            if(_.isEmpty(match) || match.id === "index"){
                mainRoute(req, res, next);
            } else if(match.id === "logout"){
                logOut(req, res, next);
            } else if(match.id === "update"){
                req.params.method = "update";
                req.params.alias = match["_"];

                update(req, res, next);
            } else if(match.id === "create"){
                req.params.method = "create";
                req.params.alias = match["_"];

                create(req, res, next);
            } else if(match.id === "delete"){
                req.params.alias = match["_"];

                remove(req, res, next);
            } else {
                const errObj = {code: 404, mes: Config.ERR_PNF};
                next(errObj);
            }
        }
    }
};

function logIn(req, res, next){
    if(req.method === Config.REQ_GET){
        loginRoute(req, res, next);
    } else if(req.method === Config.REQ_POST){

        let jsonString = '';
        req.on('data', (data) => {
            jsonString += data;

            if (jsonString.length > 1e6){
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            const obj = qs.parse(jsonString);

            if(obj.login === Config.ADMIN_LOGIN && obj.password === Config.ADMIN_PASS){
                req.session.auth = true;
                res.redirect("/admin");
            } else {
                res.redirect("/admin/login");
            }
        });
    }
}

function logOut(req, res, next){
    req.session.auth = false;

    res.redirect("/admin");
}

function update(req, res, next){

    if(req.method === Config.REQ_GET){
        gameRoute(req, res, next);
    } else if(req.method === Config.REQ_POST){

        let jsonString = '';
        req.on('data', (data) => {
            jsonString += data;

            if (jsonString.length > 1e6){
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            const obj = qs.parse(jsonString);

            const game = collectGame(obj);
            GameManager.update(game, (err) => {
                if(err){
                    next(err);
                } else {
                    res.redirect("/admin");
                }
            });
        });
    }
}

function create(req, res, next){

    if(req.method === Config.REQ_GET){
        gameRoute(req, res, next);
    } else if(req.method === Config.REQ_POST){

        let jsonString = '';
        req.on('data', (data) => {
            jsonString += data;

            if (jsonString.length > 1e6){
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            const obj = qs.parse(jsonString);

            const game = collectGame(obj);
            GameManager.create(game, (err) => {
                if(err){
                    next(err);
                } else {
                    res.redirect("/admin");
                }
            });
        });
    }
}

function remove(req, res, next){
    if(req.params.alias !== ""){
        GameManager.remove(req.params.alias, (err) => {
           if(err){
               next(err);
           } else {
               res.redirect("/admin");
           }
        });
    } else {
        const errObj = {code: 400, mes: Config.ERR_BR};
        next(errObj);
    }
}

function collectGame(obj) {
    let game = new Game(obj);

    const isActive = obj.isActive ? 1 : 0;
    const isPublishing = obj.isPublishing ? 1 : 0;

    game.setIsActive(isActive);
    game.setIsPublishing(isPublishing);

    return game;
}