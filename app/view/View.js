const fs = require("fs");
const path = require("path");
const rootPath = require("app-root-path");

const view = {};

view.getView = (path, cb) => {
    fs.readFile(path, 'utf8', cb);
};

/**
 * LAYOUTS
 */
view.MAIN_LAYOUT = path.join(rootPath.toString(), "views/layouts/main.mustache");
view.ADMIN_LAYOUT = path.join(rootPath.toString(), "views/layouts/admin.mustache");


/**
 * COMPONENTS
 */
view.HEADER = path.join(rootPath.toString(), "views/partials/header.mustache");
view.FOOTER = path.join(rootPath.toString(), "views/partials/footer.mustache");
view.TOAST = path.join(rootPath.toString(), "views/partials/toast.mustache");
view.CONFIRM = path.join(rootPath.toString(), "views/partials/confirm.mustache");

view.ADMIN_HEADER = path.join(rootPath.toString(), "views/partials/admin/admin_header.mustache");


/**
 * PAGES
 */
view.MAIN = path.join(rootPath.toString(), "views/pages/main.mustache");
view.GAMES = path.join(rootPath.toString(), "views/pages/games.mustache");
view.GAME = path.join(rootPath.toString(), "views/pages/game.mustache");
view.TECHNOLOGIES = path.join(rootPath.toString(), "views/pages/technologies.mustache");
view.PUBLISHING = path.join(rootPath.toString(), "views/pages/publishing.mustache");
view.CONTACTS = path.join(rootPath.toString(), "views/pages/contacts.mustache");
view.PRIVACY = path.join(rootPath.toString(), "views/pages/privacy.mustache");
view.TERMS = path.join(rootPath.toString(), "views/pages/terms.mustache");

view.ADMIN_MAIN = path.join(rootPath.toString(), "views/pages/admin/main.mustache");
view.ADMIN_GAME = path.join(rootPath.toString(), "views/pages/admin/game.mustache");
view.ADMIN_LOGIN = path.join(rootPath.toString(), "views/pages/admin/login.mustache");


module.exports = view;