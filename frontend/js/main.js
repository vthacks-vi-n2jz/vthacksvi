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
        $('#login-modal').modal('toggle');
    });

    $('#login-button').click(function() {
        console.log('Logging In...');
        console.log($('#username').text());
        document.cookie = 'acc=' + $('#username').val();
        window.location.href = 'transactions.html';
    });

    $('.logout-action').click(function() {
        document.cookie = 'acc' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = 'index.html';
    });

    console.log(getCookie('acc'));

    if (getCookie('acc') != null) {
        $('.login-link').hide();
        $('.logged-in').show();
    } else {
        $('.login-link').show();
        $('.logged-in').hide();
    }

    const sha = 'JointAccount';
    const rm1 = 'RM1Account';
    const rm2 = 'RM2Account';
    const mer = 'MerchantAccount';

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + sha
    }).done(function(msg) {
        let id = $('#acc-num').text() + ' ' + sha;
        let bal = $('#acc-bal').text() + ' $' + msg['balance'];
        $('#acc-num').text(id);
        $('#acc-bal').text(bal);
    });

    $('#members-list').append('<li>' + rm1 + '</li>');
    $('#members-list').append('<li>' + rm2 + '</li>');

    console.log(document.cookie);
    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + getCookie('acc')
    }).done(function(msg) {
        console.log(msg);
        let nick = getCookie('acc');
        let bal = msg['balance'];
        $('#prof-acc-num').append(nick);
        $('#prof-acc-bal').append(bal);
    });
});