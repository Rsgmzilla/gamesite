const Mustache = require("mustache");
const async = require("async");
const qs = require("querystring");
const ValidSchema = require("validate");
const _ = require("underscore");

const {View} = require("../../app/view");
const DB = require("../../app/db");
const Config = require("../../app/config");

let toastObj = {};

module.exports = (req, res, next) => {

    if(req.method === Config.REQ_GET){
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
            toast: (cb) => {
                View.getView(View.TOAST, cb);
            },
            content: (cb) => {
                View.getView(View.CONTACTS, cb);
            }
        }, (err, results) => {
            if(err){
                const errObj = {code: 404, mes: Config.ER_PNF};
                next(errObj);
            } else {
                const page = Mustache.render(results.layout, {title: "Contact us", notCorrect: toastObj.notCorrect, toastMes: toastObj.message},
                    {
                        header: results.header,
                        footer: results.footer,
                        toast: results.toast,
                        content: results.content
                    });

                toastObj = {};

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(page);
            }
        });
    } else if(req.method === Config.REQ_POST){

        let jsonString = '';

        req.on('data', (data) => {
            jsonString += data;
        });

        req.on('end', () => {
            const obj = qs.parse(jsonString);

            const contact = new ValidSchema();
            contact
                .path('name').type(String).required().length({ min: 3, max: 20 }).message("Name is not correct!")
                .path('email').type(String).match(/\S+@\S+\.\S+/).required().length({ min: 5, max: 40 }).message("Email is not correct!")
                .path('message').type(String).required().length({ min: 5, max: 400 }).message("Message is not correct!");

            const errors = contact.validate(obj);

            if(!_.isEmpty(errors)){
                toastObj = {notCorrect: true, message: errorsp[0].message};

                res.redirect("/contacts");
            } else {
                DB.get().collection(Config.COL_CONTACTS).insertOne({
                    name: obj.name,
                    email: obj.email,
                    message: obj.message
                }, (err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        res.redirect("/contacts");
                    }
                });
            }
        });
    }
};