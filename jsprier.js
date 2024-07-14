document.addEventListener("DOMContentLoaded", function() {
    // Example data
    let cities = [
        {
            arname: "الجزائر",
            engname: "Alger"
        },
        {
            arname: "عنابة",
            engname: "Annaba"
        },
        {
            arname: "وهران",
            engname: "Oran"
        }
    ];

    let content = "";
    for (const city of cities) {
        content += `<option>${city.arname}</option>`;
    }
// let nmc= cityname;

    document.getElementById("cities-select").innerHTML += content;

    // Event listener for city selection
    let cityname = ""
    document.getElementById("cities-select").addEventListener("change", function() {
        let selectedCity = this.value;
        let cityname = "";

        for (let city of cities) {
            if (city.arname === selectedCity) {
                cityname = city.engname;
                document.getElementById("cityname").innerHTML = city.arname
                timesprayerscities(cityname)
                
                break; // Exit the loop once found
                
            }
        }


        // Now you can use the 'cityname' variable as needed
        console.log("Selected city name (English):", cityname);
    });
});
// let nmc= cityname;
// timesprayerscities(cityname)
function timesprayerscities(cityname){  
        params ={
            country :"DZ",
            city : cityname
        }
        axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
        })
        .then(function (response) {
        // console.log(response.data.data.timings.Fajr);
        let rsp = response.data.data.timings
        document.getElementById("Fajr-time").innerHTML=rsp.Fajr
        filltimeprayers("Fajr-time",rsp.Fajr)
        filltimeprayers("sun-rainsing",rsp.Sunrise)
        filltimeprayers("dohr-time",rsp.Dhuhr)
        filltimeprayers("asr-time",rsp.Asr)
        filltimeprayers("maghreb-time",rsp.Maghrib)
        filltimeprayers("isha-time",rsp.Isha)

        let rdb = response.data.data.date.hijri.date    
        let nmday = response.data.data.date.hijri.weekday.ar
        document.getElementById("datep").innerHTML = nmday + rdb

        })
        .catch(function (error) {
        console.log(error);
        })
        .finally(function () {
        // always executed
        }); 

        function filltimeprayers(id,time ){
            document.getElementById(id).innerHTML=time

        }

}
