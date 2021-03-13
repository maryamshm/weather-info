let weather_array=[];
let weather_temp=[];
let icon_ar=[];
let time_zone;
let con_weak;
let city="tehran";
let input_city=document.getElementById("input_city");
let weak_con=document.getElementById("botton_right");
let is_cantigrad=true;
let city_array=[];

getlocation();

function getlocation(){
var xhr = new XMLHttpRequest(); 
xhr.onload = success; 
xhr.onerror = error;  
xhr.open('GET', 'http://ip-api.com/json'); 
xhr.send();
}

function success() {
    var data = JSON.parse(this.responseText);
    city=data.city;
    document.getElementById('text_city').innerHTML=data.city;
    getweather();
}

function error(err) {
    console.log('Request Failed', err); 
}





//get weather data
function getweather(){
var weather = new XMLHttpRequest(); 
weather.onload = success_weather; 
weather.onerror = error_weather;  
weather.open('GET', `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=N5L4REGMXDQ8MXEJKEXETZMB3`); 
console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=N5L4REGMXDQ8MXEJKEXETZMB3`);
weather.send();
}
function success_weather() {
    var data_eather = JSON.parse(this.responseText);
    for(var i=0;i<7;i++){
        weather_array[i]=data_eather.days[i].conditions;
        weather_temp[i]=data_eather.days[i].temp;
        icon_ar[i]="img/"+data_eather.days[i].icon+".svg";

    }
   
    time_zone=data_eather.timezone;
    displaydata();
}

function error_weather(err) {
    console.log('Request Failed', err); 
}
function displaydata(){
    
    
    document.getElementById("text_city").innerHTML=city;
        document.getElementById("icon_top").innerHTML="<img src="+icon_ar[0]+" />";
        document.getElementById("current_temp").innerHTML=weather_temp[0];
    for(var j=1;j<7;j++){
        var row=document.createElement("div");
        row.className="row";

        var icon_row=document.createElement("div");
        icon_row.className="row_icon";
        icon_row.innerHTML="<img src="+icon_ar[j]+" />";

        var temp_row=document.createElement("div");
        temp_row.className="row_day";
        temp_row.innerHTML=weather_array[j];

        //add to row
        row.appendChild(icon_row);
        row.appendChild(temp_row);

        //add row to parent
        weak_con.appendChild(row);


    }
    getcity();
}


//get city data
 function getcity(){
var weather = new XMLHttpRequest(); 
weather.onload = success_city; 
weather.onerror = error_city;  
weather.open('GET', `https://countriesnow.space/api/v0.1/countries/population/cities`); 
weather.send();
 }
function error_city(err) {
    console.log('Request Failed', err); 
}
function success_city() {
    var data_city = JSON.parse(this.responseText);
    for(var i=0;i<250;i++){   
    city_array[i]=data_city.data[i].city;
    }
    var datalist=document.getElementById("datalist");
for(var i=0;i<250;i++){
    datalist.innerHTML+="<option value="+city_array[i]+">";
}
console.log(city_array);
}

//switch
function switch_tg(){
    
    if(is_cantigrad==true){
    document.getElementById("togel").style.left="2";
    is_cantigrad=false;
    var num=weather_temp[0] * 9/5 +32;
    document.getElementById("current_temp").innerHTML=parseFloat(num).toFixed(2);
    document.getElementById("togel").innerHTML="F";
    }
    else{
        document.getElementById("togel").style.left="52%";
        document.getElementById("togel").innerHTML="C";
        document.getElementById("current_temp").innerHTML=weather_temp[0];
        is_cantigrad=true;
    }
}

function changelocation(){
    weather_array=[];
    weather_temp=[];
    icon_ar=[];
    time_zone;
    con_weak;
    city=input_city.value;
    weak_con.innerHTML="";   
    getweather();
    input_city.value="";
}


