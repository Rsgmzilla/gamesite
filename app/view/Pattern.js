const UrlPattern = require("url-pattern");

const pattern = {};

pattern.admin = new UrlPattern("/admin(/(:id(/*)))");

pattern.main = new UrlPattern("/");
pattern.games = new UrlPattern("/games");
pattern.game = new UrlPattern("/games(/:alias)");
pattern.technologies = new UrlPattern("/technologies");
pattern.publishing = new UrlPattern("/publishing");
pattern.contacts = new UrlPattern("/contacts");
pattern.privacy = new UrlPattern("/privacy");
pattern.terms = new UrlPattern("/terms");

module.exports = pattern;