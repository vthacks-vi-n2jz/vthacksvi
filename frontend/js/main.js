require('handlebars');

function getCookie(c_name) {
    let c_value = " " + document.cookie;
    let c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        let c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

$(document).ready(function() {
    $('.login-modal-open').click(function() {
        console.log('Opening Login Modal');
        $('#login-modal').modal('toggle');
    });

    $('#login-button').click(function() {
        console.log('Logging In...');
        document.cookie = 'logged=true';
        window.location.href = 'transactions.html';
    });

    $('.logout-action').click(function() {
        document.cookie = 'logged=false';
        window.location.href = 'index.html';
    });

    if (getCookie('logged') === 'true') {
        $('.login-link').hide();
        $('.logout-link').show();
    } else {
        $('.login-link').show();
        $('.logout-link').hide();
    }

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=5c675a07322fa06b6779453d'
    }).done(function(msg) {
        console.log('success');
        console.log(msg);
    });
});