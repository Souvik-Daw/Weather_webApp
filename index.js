const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    var city=req.body.weather;
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a8009e3920e511d75499b697571d19fc&units=metric",function(response){
        response.on("data",function(data){
            const w=JSON.parse(data);
            const t=w.main.temp;
            const des=w.weather[0].main;
            const image=w.weather[0].icon;
            res.write("<p>The weather is currently "+des+"</p>");
            res.write("<h2>The temparature in "+city+" is "+t+" degree C</h2>");
            res.write("<img src="+"http://openweathermap.org/img/wn/"+image+"@2x.png"+">");
            res.send();
        });
    });

});

app.listen(3000,function(){
    console.log("server is up and running...");
});