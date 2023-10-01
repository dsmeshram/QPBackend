const express = require("express");
const {headlines, topic} = require("gnews");
const app = express();
const port = 3000;
const googleTrends = require('google-trends-api');
const json = require('json-loader');
const date = require('date-and-time')
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors({
     origin: '*'
}));


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get('/headlines', (req, res) => {
const now  =  new Date();
  googleTrends.dailyTrends({
    geo: 'IN',
    trendDate: date.format(now,'YYYY-MM-DD'),
}, function(err, results) {
    if (err) {
       console.log(err);
    } else {
      res.send(JSON.parse(results).default.trendingSearchesDays)
      console.log(JSON.parse(results).default.trendingSearchesDays[0].trendingSearches);
    }

});

  // headlines({n : req.query.n,country:"in"}).then(data =>{
  //   res.send(data)
  // })
})


app.get('/topic', (req, res) => {
  topic(req.query.topic,{n : req.query.n,country:"in"}).then(data =>{
    res.send(data)
  })
})

app.get('/geo', (req, res) => {
  topic(req.query.geo,{n : req.query.n, country:"in"}).then(data =>{
    res.send(data)
  })
})

app.post('/newsfortwitter', (req, res) => {
  console.dir(req.body);

  data = loader.load()
  const fprompt = `Write a ${req.body.mode} tweet about ${req.body.content} within 120 characters with hashtags.`

  // completions = OpenAI.co

   res.send({"status" : 200,"tweet" :"your twitter message goes here"})
})


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});