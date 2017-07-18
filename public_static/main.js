/**
 * Created by ParikanshAndAtikant on 16/07/2017.
 */
$(function () {

    var socket = io();
    var audio = document.getElementById('myaudio');
    $('#load').click(function () {
       audio.load();
       $('#load').html('Loading...');
    });
    function loaded() {
        $('#load').html('Loaded.');
    }
    audio.addEventListener('canplay',loaded,false);

    $('#song0').click(function () {
       $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
       $('#load').click();
       $('#pause').click();
       socket.emit('song0','desp');
    });
    $('#song1').click(function () {
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song1','cute');
    });
    $('#play').click(function () {
        console.log("play");
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
        socket.emit("play", audio.currentTime);
    });
    $('#pause').click(function () {
        console.log("pause");
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
        socket.emit("pause", audio.currentTime);
    });
    socket.on("first", function (data) {
        audio.ontimeupdate = function () {
            socket.emit("where", audio.currentTime);
        };
        /*$('#play').click(function () {
            console.log("play");
            $('#play').removeClass('show');
            $('#play').addClass('hide');
            $('#pause').removeClass('hide');
            $('#pause').addClass('show');
            socket.emit("play", audio.currentTime);
        });
        $('#pause').click(function () {
            console.log("pause");
            $('#pause').removeClass('show');
            $('#pause').addClass('hide');
            $('#play').removeClass('hide');
            $('#play').addClass('show');
            socket.emit("pause", audio.currentTime);
        });*/
    });
    socket.on('song0',function (data) {
       console.log(data);
        $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song1',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on("current", function (data) {
        var diff = audio.currentTime - data;
        if (diff < 0 || diff > 2) {
            audio.currentTime = data;
        }
    });
    socket.on("playsong", function (data) {
        audio.currentTime = data;
        audio.play();
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
    });
    socket.on("pausesong", function (data) {
        audio.currentTime = data;
        audio.pause();
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
    });
});