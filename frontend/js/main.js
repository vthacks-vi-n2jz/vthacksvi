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
        document.cookie = 'logged=true';
        window.location.href = 'transactions.html';
    });

    $('.logout-action').click(function() {
        document.cookie = 'logged=false';
        window.location.href = 'index.html';
    });

    if (getCookie('logged') === 'true') {
        $('.login-link').hide();
        $('.logged-in').show();
    } else {
        $('.login-link').show();
        $('.logged-in').hide();
    }

    const sha = '5c685fb16759394351bec043';
    const rm1 = '5c6860c06759394351bec048';
    const rm2 = '5c6860c76759394351bec049';
    const rm3 = '5c6860cd6759394351bec04a';

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + sha
    }).done(function(msg) {
        let id = $('#acc-num').text() + ' ' + msg['_id'];
        let nick = $('#acc-nick').text() + ' ' + msg['nickname'];
        let bal = $('#acc-bal').text() + ' $' + msg['balance'];
        let rew = $('#acc-rew').text() + ' ' + msg['rewards'];
        let type = $('#acc-type').text() + ' ' + msg['type'];
        $('#acc-num').text(id);
        $('#acc-nick').text(nick);
        $('#acc-rew').text(rew);
        $('#acc-bal').text(bal);
        $('#acc-type').text(type);
    });

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + rm1
    }).done(function(msg) {
        let nick = msg['nickname'];
        $('#members-list').append('<li>' + nick + '</li>');
    });

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + rm2
    }).done(function(msg) {
        let nick = msg['nickname'];
        $('#members-list').append('<li>' + nick + '</li>');
    });

    $.ajax({
        'url': 'http://localhost:8080/viewJointAccount?id=' + rm3
    }).done(function(msg) {
        let nick = msg['nickname'];
        $('#members-list').append('<li>' + nick + '</li>');
    });
});