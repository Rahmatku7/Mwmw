/*!
* Created by: Ronzz YT | https://ronzxapis.my.id
*/

// Visitor
$.getJSON("https://api.countapi.xyz/hit/ronzxapis.my.id", function(response) {
    $("#visitors").text(response.value);
})

// User Login
$.getJSON("https://api.countapi.xyz/hit/ronzxapis.my.id/login", function(response) {
    $("#userlogin").text(response.value);
})

// Request Today
const d = new Date 
const date = d.toLocaleDateString('id', { 
day: 'numeric', 
month: 'long', 
year: 'numeric' 
})
$.getJSON("https://api.countapi.xyz/hit/ronzxapis.my.id/requesttoday", function(response) {
    $("#requesttoday").text(response.value);
})

// Total Request
$.getJSON("https://api.countapi.xyz/hit/ronzxapis.my.id/dash", function(response) {
    $("#totalrequest").text(response.value);
})

// Ip Address
window.setTimeout("getip()",1000);
function getip(){
  var danzz=new XMLHttpRequest();
  var url='https://api.ipify.org?format=json';
  danzz.onloadend=function(){
  data=JSON.parse(this.responseText);
  document.getElementById("ip").textContent=data.ip
};
danzz.open("GET",url,true);
danzz.send();
}

//Baterry
tag_battery_status = document.querySelector('div#battery_status');
tag_battery_level = document.querySelector('div#battery_level');
     setInterval(function() {
         navigator.getBattery().then(battery=> {
             battery_level = String(battery.level).split('.')[1];
             tag_battery_level.innerHTML = `${(battery_level.length <= 1)? oud(Number(battery_level)): battery_level}% ${battery.charging ? 'charging': 'discharging'}`;
         });
     },
         10);

// User Agent
txt = "";
txt += "<p><b>Version Browser</b>: <br>" + navigator.appVersion + "</p>";
txt += "<p><b>Language</b>: " + navigator.language + "</p>";
txt += "<p><b>Browser</b>: " + navigator.appCodeName + "</p>";
txt += "<p><b>Vendor</b>: " + navigator.vendor + "</p>";
txt += "<p><b>Cookies</b>: " + navigator.cookieEnabled + "</p>";
txt += "<p><b>Platform</b>: " + navigator.platform + "</p>";

document.getElementById("webinfo").innerHTML = txt;

// Date
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu'];
var tgl = new Date();
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
ThisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy;

const tanggal = `${ThisDay}, ${day} ${myMonths[bulan]} ${year}`

document.getElementById("Date").innerHTML = tanggal;

// Count Time
var countDownDate = new Date("Juni 24, 2023 00:00:00").getTime();

// Update Hitungan Mundur Setiap 1 Detik
var x = setInterval(function() {

    // Get Time And Date
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Calculator
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("jadwaltime").innerHTML = days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik ";

    // Expired Time
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("jadwaltime").innerHTML = "Berakhir";
    }
}, 1000);

// Time
let clock=document.querySelector("div#Clock");
let saying=document.querySelector("div#Saying");
setInterval(()=>{
var widthdeVicewidthXinitialscalesHrinkno=new Date();
const Jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const menit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Menit = widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const Detik = widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const detik= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);
const jaM= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);
const mEnit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);
const detIk= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);

// Saying Time
if(Jam<4){saying.innerHTML="Selamat Pagi";}else
if(jam<11){saying.innerHTML="Selamat Siang";}else 
if(Jam<16){saying.innerHTML="Selamat Sore";}else 
if(jam<20){saying.innerHTML="Selamat Malam";}else
{saying.innerHTML="Selamat Tengah Malam";}
clock.innerHTML=jaM+":"+mEnit+":"+detIk},250);
