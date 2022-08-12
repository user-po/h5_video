import "./main.css";
import popup from "./components/popup/popup";
import video from "./components/video/video";
var listItem = document.querySelectorAll("#list li");
for (var i = 0; i < listItem.length; i++) {
    listItem[i].addEventListener("click", function () {
        var url = this.dataset.url;
        var title = this.dataset.title;
        popup({
            width: "880px",
            height: "556px",
            title: title,
            content: function (elem) {
                video({
                    url: url,
                    elem: elem,
                    autoplay: true,
                });
            },
        });
    });
}
