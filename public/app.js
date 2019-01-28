if(!localStorage.getItem('userMorningInfo')){
    var thisUserInformation={
        userNumber:$('#modalUserNumber').html(),
        name: $('#nameInner').html(),
        city:$('#cityInner').html(),
        longitude:$('#longitudeInner').html(),
        latitude:$('#latitudeInner').html()
    }
    localStorage.setItem('userMorningInfo',JSON.stringify(thisUserInformation));

}else{
    let objUserInfo = JSON.parse(localStorage.getItem('userMorningInfo'));
    // alert('user info found!. fuck the modal info: '+objUserInfo);
    var thisUserInformation={
        userNumber:objUserInfo.userNumber,
        name: objUserInfo.name,
        city:objUserInfo.city,
        longitude:objUserInfo.longitude,
        latitude:objUserInfo.latitude
    }
}

console.log('your user Info according to what rests in the modal is '+JSON.stringify(thisUserInformation))



$(document).ready(function () {
    showPosition();
    
    interval = setInterval(startTicker, 3000);
  
    $("#newsNew").hover(function(){
        stopTicker();
    }, 
    function(){
        interval = setInterval(startTicker, 3000);
    });
    
    
    function blinker() {
        $('.blink_me').fadeOut(500);
        $('.blink_me').fadeIn(500);
    }

    setInterval(blinker, 1000);




    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('select').formSelect();
    $('.collapsible').collapsible();    

//            Here interstsToSend will be fetched from user-info.

    var interstsToSend = "health+business";
    $.ajax('/api/news', {
        type: "POST",
        data: interstsToSend,
        success : newsSuccess
    })
   
    function newsSuccess(response){
        console.log(response);
        //populate news in required div
       $.each(response.news,function(index,value){
        var list = "<li class='list'>" + value + "</li>";
        $("#newsNew").append(list);
       });
    }


    $('.todos').on('click', '.todoTask', function () {
        console.log('get rid of to-do item!')
        console.log(this.id);
        console.log('/' + thisUserInformation.userNumber + '/todo/' + this.id);

        $.ajax('/' + thisUserInformation.userNumber + '/todo/' + this.id, {
            type: "POST"
        })
        .then(function () {
            console.log('success');
            location.reload();
        })

    })

    $('#clearTasks').on('click', function () {

        let objectToSend = {
            userNumber: thisUserInformation.userNumber
        }
        $.ajax('/todo', {
            type: 'DELETE',
            data: objectToSend
        })
        .then(
            function () {
                alert('in ajax .then and table cleared!');
                location.reload();
                // window.location.href="/show/"+objectToSend.userNumber;
            }
        )
    })

    $('#addTask').on('click', function () {
        event.preventDefault();

        let newTaskDescription = $('#newTask').val().trim();
        console.log(newTaskDescription)

        if (newTaskDescription != '' && newTaskDescription != undefined) {
   
            let objectToSend = {
                description: newTaskDescription,
                userNumber: thisUserInformation.userNumber
            }

            $.ajax('/addtask', {
                type: 'POST',
                data: objectToSend
            })
            .then(
                function () {
                    console.log('ajax call POST to /addtask run');
                    location.reload();
                }
            )
        }
    
        document.getElementById('newTask').onkeydown = function (e) {
            if (e.keyCode == 13) {
                document.getElementById('addTask').click();
            }
        };
    })

//------------------------------- Tooth Timer -------------------------------------

    $('#toothTimerButton').on('click', function () {
        console.log('start timer!')
        $("#toothTimerButton").text("2:00");
        countdown();
        var interval;
        function countdown() {
            clearInterval(interval);
            interval = setInterval(function () {
                var timer = $("#toothTimerButton").text();
                timer = timer.split(':');
                var minutes = timer[0];
                var seconds = timer[1];
                seconds -= 1;
                if (minutes < 0) return;
                else if (seconds < 0 && minutes != 0) {
                    minutes -= 1;
                    seconds = 59;
                }
                else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

                $("#toothTimerButton").text(minutes + ':' + seconds);

                if (minutes == 0 && seconds == 0){
                
                    $("#toothTimerButton").text("2:00");
                    
                    $("#toothTimerButton").text("I think you should be done...!!")
                    clearInterval(interval);
                    
                }
            }, 1000);
        }
    })
})
//------------------------------- Weather part ------------------------------------


    function showPosition(position) {
        // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

        latitude =  $("#lat").val();
        longitude =  $("#longi").val();

        console.log(latitude);
        console.log(longitude);

        var location = {};
            location.latitude = latitude;
            location.longitude = longitude;
        $.ajax({
            type: "POST",
            url: '/api/weather',
            data: location,
            success: success,
        });

        function success(res) {
            console.log(res);
            console.log("weather data " + res.temp);
            $("#demo").html("Temp  " +"<br>" + res.temp + " &#8457");
            $("#demo2").html("&nbsp" + "Humidity  " + "<br>" + res.humidity);
            $("#demo3").html("Wind-Speed  " + "<br>" + res.windSpeed + " mph");
        }
    }

    function startTicker(){
        $("#newsNew li:first").slideUp(function(){
            $(this).appendTo($("#newsNew")).slideDown();
        });
    }
    
    function stopTicker()
    {
        clearInterval(interval);
    }

//------------------------------- Weather part ------------------------------------
    





