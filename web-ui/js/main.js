require('handlebars');

$(document).ready(function() {
    $('.login-modal-open').click(function() {
        console.log('Opening Login Modal');
        $('#login-modal').modal('toggle')
    })
})