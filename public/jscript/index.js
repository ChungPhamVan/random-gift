var socketIo = io("http://localhost:3000");
$(document).ready(function() {
    $('.submit').click(function() {
        var txtName = $('#Name').val();
        var txtEmail = $('#Email').val();
        var txtPhone = $('#Phone').val();
        txtName = txtName.trim();
        txtEmail = txtEmail.trim();
        txtPhone = txtPhone.trim();
        if(txtName == "" || txtEmail == "" || txtPhone == "" ) {
            alert('input values is required !');
            if(txtName == "") {
                $('#Name').val("");
            }
            if(txtEmail == "") {
                $('#Email').val("");
            }
            if(txtPhone == "") {
                $('#Phone').val("");
            }
        } else {
            socketIo.emit("client-send-infomation", {
                name: $('#Name').val(),
                email: $('#Email').val(),
                phone: $('#Phone').val()
            });
        }
    });
    socketIo.on("server-send-listUser", function(data) {
        $("tbody").html("");
        data.forEach((user, index) => {
            $("tbody").append("<tr><td scope='row'>"+ (index + 1)+"</td><td>"+ user.name +"</td><td>"+ user.email +"</td><td>"+ user.phone +"</td></tr>");
        });
    });
});