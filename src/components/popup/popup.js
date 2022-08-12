// import "./popup.css"; 全局css
var styles = require("./popup.css");
function popup(options) {
    return new Popup(options);
}
var Popup = /** @class */ (function () {
    function Popup(settings) {
        this.settings = settings;
        this.settings = Object.assign({
            width: "100%",
            height: "100%",
            title: "",
            pos: "center",
            mask: true,
            content: function () { },
        }, this.settings);
        this.init();
    }
    //初始化
    Popup.prototype.init = function () {
        this.template();
        this.settings.mask && this.createMask();
        this.handle();
        this.contentCallback();
    };
    //模板
    Popup.prototype.template = function () {
        this.tempContainer = document.createElement("div");
        this.tempContainer.style.width = this.settings.width;
        this.tempContainer.style.height = this.settings.height;
        this.tempContainer.className = styles.popup;
        this.tempContainer.innerHTML = "\n      <div class=\"" + styles["popup-title"] + "\">\n          <h3>" + this.settings.title + "</h3>\n          <i class=\"iconfont iconguanbi\"></i>\n      </div>\n      <div class=\"" + styles["popup-content"] + "\"></div>\n  ";
        document.body.appendChild(this.tempContainer);
        if (this.settings.pos === "left") {
            this.tempContainer.style.left = 0 + "px";
            this.tempContainer.style.top =
                window.innerHeight - this.tempContainer.offsetHeight + "px";
        }
        else if (this.settings.pos === "right") {
            this.tempContainer.style.right = 0 + "px";
            this.tempContainer.style.top =
                window.innerHeight - this.tempContainer.offsetHeight + "px";
        }
        else {
            this.tempContainer.style.left =
                (window.innerWidth - this.tempContainer.offsetWidth) / 2 + "px";
            this.tempContainer.style.top =
                (window.innerHeight - this.tempContainer.offsetHeight) / 2 + "px";
        }
    };
    //事件操作
    Popup.prototype.handle = function () {
        var _this = this;
        var popupClose = this.tempContainer.querySelector("." + styles["popup-title"] + " i");
        popupClose.addEventListener("click", function () {
            document.body.removeChild(_this.tempContainer);
            _this.settings.mask && document.body.removeChild(_this.mask);
        });
    };
    Popup.prototype.createMask = function () {
        this.mask = document.createElement("div");
        this.mask.className = styles.mask;
        this.mask.style.width = "100%";
        this.mask.style.height = document.body.offsetHeight + "px";
        document.body.appendChild(this.mask);
    };
    Popup.prototype.contentCallback = function () {
        var popupContent = this.tempContainer.querySelector("." + styles["popup-content"]);
        this.settings.content(popupContent);
    };
    return Popup;
}());
export default popup;
