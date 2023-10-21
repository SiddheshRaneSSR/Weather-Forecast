// const http = require('http');
// const fs=require('fs');
// const homefile = fs.readFileSync("home.html","utf-8");


// const replaceVal = (tempareture,org) =>{
//     let tempa = tempareture.replace("{%temp%}",org.main.temp);
//     tempa = tempa.replace("{%tempmin%}",org.main.temp_min);
//     tempa = tempa.replace("{%tempmax%}",org.main.temp_max);
//     tempa = tempa.replace("{%name%}",org.name);
//     tempa = tempa.replace("{%country%}",org.sys.country);

//     return tempa;
// }



// const server = http.createServer((req,res)=>{
//     if(req.url == '/'){
//         const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=6cf40545ca06b6b729139e14a21506a6";

//         fetch(apiUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const obj = JSON.stringify(data);
//                 const arrobj=[obj]
//                 // const name = obj.name;
//                 // const country = obj[8].country;
//                 // const temp = obj.main.temp;
//                 // const tempmin = obj[3].temp_min;
//                 // const tempmax = obj[3].temp_max;

//                 const realTimeData = arrobj.map((val)=>{
//                     replaceVal(homefile,val);
//                 }).join("");

//                 console.log(realTimeData);
//                 res.end();

//                 // console.log("temp : ", obj );
//             })
//             .catch(error => {
//                 // Handle errors here
//                 console.error('There has been a problem with your fetch operation:', error);
//             });

//         }
// });

// server.listen(3000,"127.0.0.1");

const http = require('http');
const fs = require('fs');
const homefile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempareture, org) => {

    const temp = parseFloat(((org.main.temp)/10).toFixed(2));
    const tempMin = parseFloat((org.main.temp_min)/10).toFixed(2);
    const tempMax = parseFloat((org.main.temp_max)/10).toFixed(2);



    let tempa = tempareture.replace("{%temp%}", temp);
    tempa = tempa.replace("{%tempmin%}", tempMin);
    tempa = tempa.replace("{%tempmax%}", tempMax);
    tempa = tempa.replace("{%name%}", org.name);
    tempa = tempa.replace("{%country%}", org.sys.country);

    return tempa;
}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=6cf40545ca06b6b729139e14a21506a6";

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const realTimeData = replaceVal(homefile, data);
                console.log(realTimeData);
                res.end(realTimeData); // Send the modified data as the response
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                res.end("Error occurred"); // Send an error response to the client
            });
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log('Server is running on port 3000');
});

