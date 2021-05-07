$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        items: "img, [title]",
        content: function(){
            let element = $(this);
            if (element.is("[title]")) return element.attr("title");
            if (element.is("img")) return element.attr("alt");
        }
    });
    //Contact form submission using ajax and captcha
    //Doesn't work because of sever settings
    let contactForm = $("#contactForm");
    contactForm.on("submit", function(e){
        e.preventDefault();
        //Form values
        let name = $("name").val();
        let email = $("email").val();
        let subject = $("subject").val();
        //Post values to cust file
        $.ajax({
            type:"POST",
            url:"cust.php",
            data:{
                name: name,
                email: email,
                subject: subject,
                captcha: grecaptcha.getResponse()
            },
            success: function(response){
                //supposed to bring log of captcha response to console but
                //because of sever settings I can't post to php files
                //But it does output the contain of the php file on the server
                console.log(response);
                grecaptcha.reset(); // Reset reCaptcha
            }
        });
        //1st ajax that writes in sampleOutput section from custSample.json
        $.ajax({
            type:"get", url:"custSample.json", dataType:"json",
            success:function(data){
                $.each(data, function(){
                    $.each(this, function(key, value){
                        $("#sampleOutput").html(
                            "<h3>" + value.statement + "</h3>"
                        )
                    })
                })
            }
        });
        //2nd ajax that appends in sampleOutput section from custSample2.json
        $.ajax({
            type:"get", url:"custSample2.json", dataType: "json",
            success:function(data) {
                $.each(data, function () {
                    $.each(this, function (key, value) {
                        $("#sampleOutput").append(
                            "<p>" + "Name: " + value.name + "</p>" +
                            "<p>" + "Email: " + value.email + "</p>" +
                            "<p>" + "Subject: " + value.subject + "</p>"
                        )
                    })
                })
            }
        })
    });
});
