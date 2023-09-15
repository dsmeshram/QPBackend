
const express = require('express')
const app = express()
const port = 3000
const news = require('gnews');

app.get('/', (req, res) => {
  res.send('Hello user!')
})


app.get('/headlines', (req, res) => {
  if (req.query.country !== undefined || req.query.language !== undefined ||  req.query.number !== undefined) {
    const starship = news.headlines({country: req.query.country, language: req.query.language, n: req.query.number})
    starship.then(data => {
      res.send(data)
    })
  }
   else{
     res.send(`please provide the query at the end or url (like ?country=in&language=hn&number=10`)
  }
})

app.get('/search', (req, res) => {
  if (req.query.search !== undefined) {
    const starship = news.search(req.query.search)
    starship.then(data => {
      res.send(data)
    })
  } else{
     res.send(`please provide the search at the end or url (like ?search=`)
  }
})


app.get('/topic', (req, res) => {
  if (req.query.topic !== undefined){
    const topics = ["WORLD", "BUSINESS", "TECHNOLOGY", "SCIENCE", "ENTERTAINMENT", "SPORTS", "HEALTH"]
    if (topics.indexOf(req.query.topic) !== -1){
      const starship = news.topic(req.query.topic)
      starship.then(data => {
        res.send(data)
      })
    }else{
       res.send(`${req.query.topic} is not a valid, ${topics}`)
    }
  }else{
     res.send(`please provide the query at the end or url (like ?topic=`)
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
