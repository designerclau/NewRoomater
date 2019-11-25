/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


//function to login
function login() {
   
    //instance of XMLHttpRequest
    var http = new XMLHttpRequest();
    //getting the values typed by user in the input box emaillog
    var email = document.getElementById("emaillog").value;
    //getting the values typed by user in the input box passw
    var passw = document.getElementById("passw").value;

    //url of the API
    //**** Very important to change it to your own IP address *****/
    const url = "http://192.168.0.52:8080/login?email=" + email + "&password=" + passw;
   
    //Method post and url define to the http
    http.open("POST", url);
    //send the request to the server
    http.send();

    //checking the return of the request
    http.onreadystatechange = (e) => {
        //the variable response will receive the http reponse
        var response = http.responseText;
        //the variable responseJSON will receive the response, I am using the stringify because if I do not put it I get error from the server
        var responseJSON = JSON.stringify(response);
        //parse the responseJASON and saving in the variable obj
        var obj = JSON.parse(responseJSON);
        
        //checking the status of the return, if it is 200 it means that the response is ok
        if (http.status == 200) {
            //split the text in 2 parts, iduser and nameuser
            var code = obj.split("-");
            var iduser = code[0];
            var nameuser= code[1];

            //removing from the class page the page-active
            $('.page').removeClass('page-active');
            //updating the span idclient with the name of the user
            $('#idclient').text('Welcome '+nameuser);
            //activing the div userpage
            $('#userpage').addClass('page-active');
            //calling the function match with iduser as a parameter
            match(iduser);
        }else{
             //if the http status is not 200 show the message that the user was not found
             $('#invaliduser').text('User not found');
            
        }

      
       
        
    }
}


//function to register new user
function register() {
    //getLocation();
     //instance of XMLHttpRequest
    var http = new XMLHttpRequest();
    //getting the values typed by user in the input box email
    var email = document.getElementById("email").value;
    //getting the values typed by user in the input box usr
    var name = document.getElementById("usr").value;
    //getting the values typed by user in the input box age
    var age1 = document.getElementById("age").value;
    //getting the values typed by user in the radio box optradio
    var smok1 = $("input[name='optradio']:checked").val();
    //getting the values typed by user in the select box hobbies
    var hobbie1 = $('#hobbies').val();
    //getting the values typed by user in the input box password
    var pwds1 = document.getElementById("pwd").value; 

    //variables are hard code because the getLocation was showing the error:
    //[Deprecation] getCurrentPosition() and watchPosition() no longer work on insecure origins. To use this feature, 
    //you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details. 
    var lat1= "53.346";
    var lng1= "-6.2588";
     
    //url of the API with parameters
    //**** Very important to change it to your own IP address *****/
    const url = "http://192.168.0.52:8080/register?name="+name+"&email=" + email+"&age=" + age1+"&smoker=" + smok1+"&hobbies=" + hobbie1+"&password=" + pwds1+"&latitude=" + lat1+"&longitude=" + lng1;
   
    //Method post and url define to the http
    http.open("POST", url);
    //sending the request to the server
    http.send();
    //checking the return of the request
    http.onreadystatechange = (e) => {
        //the variable response will receive the http reponse
        var response = http.responseText;
        //the variable responseJSON will receive the response, I am using the stringify because if I do not put it I get error from the server
        var responseJSON = JSON.stringify(response);
        //parse the responseJASON and saving in the variable obj
        var obj = JSON.parse(responseJSON);
        
        //checking the status of the return, if it is 200 it means that the response is ok
        if (http.status == 200) {
            //split the text in 2 parts, iduser and nameuser
            var code = obj.split("-");
            var iduser = code[0];
            var nameuser= code[1];
            //removing from the class page the page-active
            $('.page').removeClass('page-active');
            //updating the span idclient with the name of the user
            $('#idclient').text('Welcome '+nameuser);
            //activing the div userpage
            $('#userpage').addClass('page-active');
            //calling the function match with iduser as a parameter
            match(iduser);
        }else{
            //if the http status is not 200 show the message bellow
             $('#feedback').text('Register not finished, please try it again!');
           
        }

      
       
        
    }
}
 
//function to match the users
function match(iduser) {
    //instance of the new XMLHttpRequest
    var http = new XMLHttpRequest();

   //url of the API with parameter id
    //**** Very important to change it to your own IP address *****/
    const url = "http://192.168.0.52:8080/match?id=" + iduser;

    //Method post and url define to the http
    http.open("GET", url);
    //sending the request to the server
    http.send();

   //checking the return of the request
    http.onreadystatechange = (e) => {
        //the variable response will receive the http reponse
        var response2 = http.responseText;
        //the variable responseJSON will receive the response, I am using the stringify because if I do not put it I get error from the server
        var responseJSON2 = JSON.stringify(response2);
        //parse the responseJASON and saving in the variable obj
        var obj2 = JSON.parse(responseJSON2);
        console.log(obj2);

        //checking the status of the return, if it is 200 it means that the response is ok
        if (http.status == 200) {
            //if obj2 is empty
            if (obj2==""){
                 //show the message Match not found
                 $('#item1').text('Match not found');
            }else{
                //if the return in the variable obj2 is not empty
                //split the name in the array usermath
                var usermath = obj2.split("-");
                //getting the value from the list <ul> called Foo
                var p = document.getElementById('Foo');
                //checking the nodes of the list
                var filhos = p.childNodes;
                //checking all array of filhos 
                for( i = filhos.length - 1; i >= 0; i-- ) {
                    if( filhos[i].tagName == 'LI' ) {
                    //remove all list
                    p.removeChild( filhos[i] );
                    }
                }
                //for loop to check all array of usermath
                for(var i=0;i<usermath.length;i++){
                    //add list for each one of the users
                    var li = document.createElement('li');
                    //add to the text of the list the name
                    li.innerHTML = usermath[i] ;
                    //append the list
                    p.appendChild(li);
                }

            }
            
        }
    
    }
}

//function to get the location
function getLocation(){
    //getting the current position
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback(position){
  //getting the latitude and longitude
  var lat = position.coords.latitude;
  var long = position.coords.longitude;

//putting the values into their div
document.getElementById('lati').innerHTML = lat;
document.getElementById('longi').innerHTML = long;

//calling the function updatemap
updateMap(lat,long);
}

//function onError in case of error
function onError(errorMessage){
    console.log(errorMessage);
}

//function initMap
 function initMap() {
     //harding code latitude and longitude
    var cct = {lat: 53.346, lng: -6.2588};
    //instance of new map from google maps
    var map = new
    google.maps.Map(document.getElementById('map'), {  zoom: 12,
        center: cct
    }
    );
    //creating a marker
    var marker = new google.maps.Marker({
        position: cct,
        map: map
    });    

    //another position in hardcode
    var anotherposition = {lat: 53.3458, lng: -6.2575};
    //creating a new marker
    var marker2 = new google.maps.Marker({
        position: anotherposition,
        map: map
    })
}

//function to update the map with parameters
function updateMap(lat, long){
    //inserting the latitude and longitude into a variabel
    var position = {lat: lat,lng: long};
    //instance of new google maps   
    var map = new  google.maps.Map(document.getElementById('map'),
     {  zoom: 12,
        center: position
    }
    );

    //creating the marker
    var marker = new google.maps.Marker({
        position: position,
        map: map
    })


}

//function to active the page
function activepage(){
    //if the page is clicked
  $('.targetpage').click(function(){
      //target the atual page
      var target = $(this).attr('dt-page');
      //remove the page active class
      $('.page').removeClass('page-active');
      //add the class page-active to the
      $(target).addClass('page-active');
  });
}

//function signup
function signup(){
    //remove all class active
     $('.page').removeClass('page-active')
     //active the id registerpage
     $('#registerpage').addClass('page-active');
}



