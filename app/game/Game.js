class Game {
    constructor(obj) {
        this.id = obj.id || obj._id;

        this.name = obj.name;
        this.alias = obj.alias;
        this.desc = obj.desc;
        this.shortDesc = obj.shortDesc;

        this.playLink = obj.playLink;
        this.storeLink = obj.storeLink;
        this.icon = obj.icon;
        this.banner = obj.banner;

        this.youtubeLink = obj.youtubeLink;
        this.screens = obj.screens;
        this.isActive = obj.isActive;
        this.isPublishing = obj.isPublishing;
    }

    getId() {
        return this.id;
    }

    setId(_id) {
        this.id = _id;
    }

    getName() {
        return this.name;
    }

    setName(_name) {
        this.name = _name;
    }

    getAlias() {
        return this.alias;
    }

    getDesc() {
        return this.desc;
    }

    getShortDesc() {
        return this.shortDesc;
    }

    getPlayLink() {
        return this.playLink;
    }

    getStoreLink() {
        return this.storeLink;
    }

    getIcon() {
        return this.icon;
    }

    getBanner() {
        return this.banner;
    }

    getYoutubeLink() {
        return this.youtubeLink;
    }

    getScreens() {
        return this.screens;
    }

    getIsActive() {
        return this.isActive;
    }

    setIsActive(isActive) {
        this.isActive = isActive;
    }

    getIsPublishing() {
        return this.isPublishing;
    }

    setIsPublishing(isPublishing) {
        this.isPublishing = isPublishing;
    }
}

module.exports = Game;