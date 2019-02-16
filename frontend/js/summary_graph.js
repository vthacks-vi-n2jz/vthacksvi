document.addEventListener('DOMContentLoaded', function () {
    /*Your chartist initialization code here*/
    var chart = new Chartist.Line('.ct-chart', {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
        series: [{
            name: 'Account Statement($)',
            data: [1000, 900, 700, 600, 500, 400, 0, 0]
        }, {
            name: 'Shared Expenses($)',
            data: [0, 100, 200, 100, 100, 100, 400, 0]
        }]
    }, {
            low: 0,
            showArea: true
        });

    var $tooltip = $('<div class="tooltip tooltip-hidden"></div>').appendTo($('.ct-chart'));

    $(document).on('mouseenter', '.ct-point', function () {
        var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
            value = $(this).attr('ct:value');

        $tooltip.text(seriesName + ': ' + value);
        $tooltip.removeClass('tooltip-hidden');
    });

    $(document).on('mouseleave', '.ct-point', function () {
        $tooltip.addClass('tooltip-hidden');
    });

    $(document).on('mousemove', '.ct-point', function (event) {
        console.log(event);
        $tooltip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
            top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
        });
    });
});
