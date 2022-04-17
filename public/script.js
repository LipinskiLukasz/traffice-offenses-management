
$(document).ready(function () {
    $("form#loginForm").on('submit', function (e) {
        e.preventDefault();
        const username = $('input[name=username]').val();
        const password = $('input[name=password]').val();
        $.ajax({
            method: 'post',
            url: '/authentication',
            data: { username, password },
            dataType: 'json',
            success: function (response) {
                alert('Login Successful!');
                window.location.href = "/admin";
            },
            error: function () {
                alert('Login Failed!')
            }
        })
    });

    $("form#addOffenderForm").on('submit', function (e) {
        e.preventDefault();
        const name = $('input[name=name]').val();
        const email = $('input[name=email]').val();
        const location = $('input[name=location]').val();
        const offense = $('input[name=offense]').val();
        $.ajax({
            method: 'post',
            url: '/addOffender',
            data: { name, email, location, offense },
            dataType: 'json',
            success: function (response) {
                alert('Offender added in database!');
                document.getElementById("addOffenderForm").reset();
            },
            error: function () {
                alert('Failed to add new offender!')
            }
        })
    });
});