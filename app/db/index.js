let MongoClient = require('mongodb').MongoClient;

const dbObj = {
    db: null,
    client: null
};

dbObj.connect = (url, dbname, cb) => {
    if (dbObj.db) return cb();

    MongoClient.connect(url + dbname, { useNewUrlParser: true }, (err, client) => {
        if (err) return cb(err);

        dbObj.client = client;
        dbObj.db = client.db(dbname);
        cb();
    });
};

dbObj.get = () => {
    return dbObj.db;
};

dbObj.close = (cb) => {
    if (dbObj.client) {
        dbObj.client.close((err, result) => {
            dbObj.client = null;
            dbObj.db = null;
            cb(err);
        });
    }
};

module.exports = dbObj;