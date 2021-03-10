const express = require('express');
global.fetch = require("node-fetch");

// express app
const app = express();

// listen for requests
app.listen(5000, () => {
  console.log("listening on port 5000");
});

// register view engine
//we need to define a view engine,  we will use EJS
//using app.set()
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  let blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  fetch("https://jsonplaceholder.typicode.com/posts").then(response => {
    return response.json();
  }).then(json => {
    for (i = 0; i < json.length; i++) {
      blogs.push({title: json[i].title, snippet: json[i].body});
    }
    res.render('index', { title: 'Home', blogs });
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
