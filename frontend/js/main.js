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

    const sha = '5c68f2f66759394351becff2';
    const rm1 = '5c68f2da6759394351becff1';
    const rm2 = '5c68f8be6759394351becffd';
    const mer = '5c68f37f6759394351becff4';

    if (getCookie('acc') != null) {
        $('.login-link').hide();
        $('.logged-in').show();
    } else {
        $('.login-link').show();
        $('.logged-in').hide();
    }

    const endpoint = 'http://localhost:8080/';

    $('#submit-transactions').click(function() {
        $.ajax({
            'url': endpoint + 'jointAccountToMerchant?amount=' + $('#transAmt').val() + '' +
                '&idsList=' + rm1 + ',' + rm2 + '&jointAccountId=' + sha + '&merchantAccountId=' + mer
        }).done(function(msg) {

        });
    });

    $.ajax({
        'url': endpoint + 'viewJointAccount?id=' + sha
    }).done(function(msg) {
        let id = $('#acc-num').text() + ' ' + sha;
        let bal = $('#acc-bal').text() + ' $' + msg['balance'];
        $('#acc-num').text(id);
        $('#acc-bal').text(bal);
    }).fail(function(msg) {
        console.dir(msg);
    });

    $('#members-list').append('<li>' + rm1 + '</li>');
    $('#members-list').append('<li>' + rm2 + '</li>');

    $.ajax({
        'url': endpoint + 'viewJointAccount?id=' + getCookie('acc')
    }).done(function(msg) {
        console.dir(msg);
        let nick = getCookie('acc');
        let bal = msg['balance'];
        $('#prof-acc-num').append(nick);
        $('#prof-acc-bal').append(bal);
    });
});