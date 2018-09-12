const Game = require("./Game");
const async = require("async");
const _ = require("underscore");

const Config = require("../config");
const DB = require("../db");

class GameManager {

    static init() {
        DB.get().collection(Config.COL_GAMES).createIndex({alias: 1}, {unique: true});
    }

    static list(callback, range) {
        DB.get().collection(Config.COL_GAMES).find({}).toArray((err, res) => {
            if (err) {
                const errObj = {code: 521, mes: Config.ER_WSID};
                callback(errObj);
            } else {
                async.map(res, (l, cb) => {
                    let game = new Game(l);
                    cb(null, game);
                }, (err, res) => {
                    if(err){
                        const errObj = {code: 521, mes: Config.ER_WSID};
                        callback(errObj);
                    } else {
                        if(!_.isNumber(range) || range === 0){
                            callback(null, res);
                        } else {
                            callback(null, partRes(res, range));
                        }
                    }
                });
            }
        });
    }

    static info(alias, callback) {
        DB.get().collection(Config.COL_GAMES).findOne({
            alias: alias
        }, (err, res) => {
            if (err || !res) {
                const errObj = {code: 521, mes: Config.ER_WSID};
                callback(errObj);
            } else {
                let game = new Game(res);
                callback(null, game);
            }
        });
    }

    static create(game, callback) {
        DB.get().collection(Config.COL_GAMES).insertOne({
            name: game.getName(),
            alias: game.getAlias(),
            desc: game.getDesc(),
            shortDesc: game.getShortDesc(),
            playLink: game.getPlayLink(),
            storeLink: game.getStoreLink(),
            banner: game.getBanner(),
            icon: game.getIcon(),
            youtubeLink: game.getYoutubeLink(),
            isActive: game.getIsActive(),
            isPublishing: game.getIsPublishing()
        }, (err, res) => {
            if (err) {
                const errObj = {code: 521, mes: Config.ER_WSID};
                callback(errObj);
            } else {
                callback(null, res.insertedId);
            }
        });
    }

    static update(game, callback) {
        DB.get().collection(Config.COL_GAMES).findOneAndUpdate({
            alias: game.getAlias()
        }, {
            $set: {
                name: game.getName(),
                alias: game.getAlias(),
                desc: game.getDesc(),
                shortDesc: game.getShortDesc(),
                playLink: game.getPlayLink(),
                storeLink: game.getStoreLink(),
                banner: game.getBanner(),
                icon: game.getIcon(),
                youtubeLink: game.getYoutubeLink(),
                isActive: game.getIsActive(),
                isPublishing: game.getIsPublishing()
            }
        }, {upsert: true}, (err, res) => {
            if (err) {
                const errObj = {code: 521, mes: Config.ER_WSID};
                callback(errObj);
            } else {
                callback(null);
            }
        });
    }

    static remove(alias, callback) {
        DB.get().collection(Config.COL_GAMES).deleteOne({
            alias: alias
        }, (err, res) => {
            if (err) {
                const errObj = {code: 521, mes: Config.ER_WSID};
                callback(errObj);
            } else {
                callback(null, res.deletedCount);
            }
        });
    }
}

function partRes(arr, range){
    let res = _.sample(arr, range);

    return res;
}

module.exports = GameManager;