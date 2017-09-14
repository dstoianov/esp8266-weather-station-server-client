$(document).ready(function () {

    var loc = window.location;
    window.host = loc.protocol !== '' ? (loc.protocol + '//') : '';
    window.host = loc.host !== '' ? (window.host + loc.host) : '';

    if (window.host === '')
       window.host = "http://192.168.178.21/";
//     window.host = "http://192.168.150.174/";
    else
        window.host += '/';


    NProgress.configure({parent: '#content'});

    window.chartColors = {
        red: 'rgb(255,99,132)',
        orange: 'rgb(255,159,64)',
        yellow: 'rgb(255,205,86)',
        green: 'rgb(75,192,192)',
        blue: 'rgb(54,162,235)',
        purple: 'rgb(153,102,255)',
        grey: 'rgb(201,203,207)'
    };

    var color = Chart.helpers.color
        , timeFormat = 'HH:mm'
        , dateTimeFormat = 'MM/DD/YY HH:mm'
        , refreshInterval = 60;

    var config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Temperature(C)",
                fill: true,
                backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
                borderColor: window.chartColors.blue,
                data: []
            }, {
                label: "Humidity(%)",
                fill: true,
                backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                borderColor: window.chartColors.red,
                data: []
            }, {
                label: "Pressure(mm)",
                fill: true,
                backgroundColor: color(window.chartColors.green).alpha(0.2).rgbString(),
                borderColor: window.chartColors.green,
                hidden: true,
                data: []
            }]
        },
        options: {
            responsive: true,
            /*            title:{
                            display:true,
                            text:'Current values'
                        },*/
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        unit: "hour",
                        // format: timeFormat,
                        // round: 'day'
                        tooltipFormat: 'DD MMM HH:mm',
                        displayFormats: {
                            'millisecond': 'HH:mm',
                            'second': 'HH:mm',
                            'minute': 'HH:mm',
                            'hour': 'HH:mm',
                            'day': 'HH:mm',
                            'week': 'HH:mm',
                            'month': 'HH:mm',
                            'quarter': 'HH:mm',
                            'year': 'HH:mm'
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    // ticks: {
                    //     fixedStepSize: 1
                    // },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };


    function updatesensors() {
        NProgress.start();
        $.get(host + "sensors", function (data, status) {

//            console.log("Is valid json " + isValidJson(data));
//            console.log("Data: " + JSON.stringify(data.sensors) + "\nStatus: " + status);
            $('.ds18b20 .s_name').text(data.sensors.ds18b20.name.toUpperCase());
            $('.ds18b20 .temp').text(precise_round(data.sensors.ds18b20.temp, 1) + " C");

            $('.dht22 .s_name').text(data.sensors.dht22.name.toUpperCase());
            $('.dht22 .temp').text(precise_round(data.sensors.dht22.temp, 1) + " C");
            $('.dht22 .humidity').text(Math.round(data.sensors.dht22.humidity) + " %");

            $('.bme280 .s_name').text(data.sensors.bme280.name.toUpperCase());
            $('.bme280 .temp').text(precise_round(data.sensors.bme280.temp, 1) + " C");
            $('.bme280 .humidity').text(Math.round(data.sensors.bme280.humidity) + " %");
            $('.bme280 .pressure').text(Math.round(data.sensors.bme280.pressure) + " hPa");
            $('.bme280 .pressure2').text(Math.round(data.sensors.bme280.pressure_2) + " mm");
        });
        NProgress.done();
    }

    function updateinfo() {
        NProgress.start();
        $.get(host + "info", function (data, status) {
            // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            $('#uptime').text(getDuration(data.uptime));
            $('#version').text(data.build_version);
            $('#reset_reason').text(data.esp.reset_reason);

            $('#ssid').text(data.network.ssid);
            $('#signal').text(data.network.signal);
            $('#ip').text(data.network.ip);
            $('#mac').text(data.network.mac);

            $('#boot-mode').text(data.esp.boot_mode);
            $('#boot-version').text(data.esp.boot_version);
            $('#sdk').text(data.esp.sdk_version);
            $('#core').text(data.esp.core_version);
            $('#chip-id').text(data.esp.chip_id);
            $('#flash-id').text(data.esp.flash_id);
            $('#free-heap').text(precise_round((data.esp.free_heap / 1024), 1) + " KB");
            $('#chip-size').text((data.esp.chip_size / 1024) + " KB");
            $('#real-size').text((data.esp.real_size / 1024) + " KB");
            $('#sketch-size').text(precise_round((data.esp.sketch_size / 1024), 1) + " KB");
            $('#free-sketch-space').text((data.esp.free_sketch_space / 1024) + " KB");
            $('#flash-frq').text((data.esp.flash_frequency / 1000 / 1000) + " MHz");
            $('#flash-mode').text(data.esp.flash_mode);
            $('#message').text(data.esp.message);
        });
        NProgress.done();

    }

    function updatechart() {
        NProgress.start();

//        clear the data before populate it
        for (var index = 0; index < config.data.datasets.length; ++index) {
            config.data.datasets[index].data = []
        }

        $.get(host + "day", function (data, status) {

            // console.log("Data: " + JSON.stringify(data.records) + "\nStatus: " + status);
            // var newTime = new Date((new Date()).getTime() - 1000 * 60 * data.records.length * updateInterval);

            var updateInterval = 15;
            var newTime;
            if (data.total_records==1){
                newTime = moment(data.last_measured_time, "HH:mm:ss").toDate();
            } else{
                newTime = moment(data.last_measured_time, "HH:mm:ss").add(-(data.total_records-1)*updateInterval, 'minutes').toDate();
            }
            console.log(newTime);
            for (var index = 0; index < data.records.length; ++index) {
                // temp
                config.data.datasets[0].data.push({
                    x: newTime,
                    y: (data.records[index].t/10)
                });
                // hum
                config.data.datasets[1].data.push({
                    x: newTime,
                    y: data.records[index].h
                });
                // pres
                config.data.datasets[2].data.push({
                    x: newTime,
                    y: data.records[index].p
                });
                newTime = addMinutes(newTime, updateInterval);
            }

            tempChart.update();
        });
        NProgress.done();
    }

    function updatesettings() {
        NProgress.start();

        console.log("call update settings template");

        NProgress.done();
    }

    var update = {
        '#sensors': updatesensors,
        '#info': updateinfo,
        '#chart': updatechart,
        '#settings': updatesettings,
    };

    $("#get_sensors").click(updatesensors);
    $("#get_info").click(updateinfo);
    $("#get_chart").click(updatechart);
    $("#get_settings").click(updatesettings);

    $(window).on('hashchange', function () {
        var id = window.location.hash || '#sensors';
        $('.item').hide();
        $(id).show();
        var upd = update[id];
        if (upd) {
            upd();
        }
        $('.navbar li a').removeClass('active');
        $('.navbar li a[href="' + id + '"]').addClass('active');
        $('#navbarSupportedContent').collapse('hide');
    }).trigger('hashchange');

    var ctx = document.getElementById('temp-chart').getContext("2d");
    ctx.width = $(ctx).parent().width();
    ctx.height = $(ctx).parent().height();
    var tempChart = new Chart(ctx, config);

    var getDuration = function (millis) {
        var date = new Date(millis);
        var str = '';
        str += date.getUTCDate() - 1 + " days, ";
        str += date.getUTCHours() + " hours, ";
        str += date.getUTCMinutes() + " minutes, ";
        str += date.getUTCSeconds() + " seconds";
        return str;
    };

    function precise_round(num, decimals) {
        var t = Math.pow(10, decimals);
        return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
    }

    function isValidJson(json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    }

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

});