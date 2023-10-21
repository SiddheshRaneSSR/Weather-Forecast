
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
        const apiUrl = "   ";   //Get api URL from OpenWeather.org

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
                res.end(realTimeData); 
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                res.end("Error occurred"); 
            });
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log('Server is running on port 3000');
});

