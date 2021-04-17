$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        items: "img, [title]",
        content: function(){
            let element = $(this);
            if (element.is("[title]")) return element.attr("title");
            if (element.is("img")) return element.attr("alt");
        }
    });
});
