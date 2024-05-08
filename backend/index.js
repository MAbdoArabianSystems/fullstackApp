const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// this example on conecting the DB for use Mongoose
mongoose
  .connect(
    "mongodb+srv://firstDB:firstDB@cluster0.qiywqhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`connecting successfully`);
  })
  .catch((err) => console.log(`connecting failed: ${err}`));

//this example on use your table[colection || module] your creating in modules
const Article = require("./models/article");

/////////////////////Create colections endpoint///////////////////////

app.post("/article",async (req, res) => {
  const article = new Article();
  article.name = req.body.name;
  article.age = req.body.age;
  try {
    await article.save()
    res.send('stored article successfully');
    // res.send(article);
  } catch (error) {
    res.send('error creating article adding: ' + error.message);
  }
});

//this example for get a table model from the DB
app.get("/article", async (req, res) => {
  try {
    const articleData = await Article.find(); //use object model for [ find ] table in DB
    res.json(articleData);
  } catch (error) {
    return res.send(" request for get article is field", error);
  }
});

//this example for who i get article for id
app.get("/article/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const articleData = await Article.findById(articleId); //use object model for [ findById ] table in DB
    res.json(articleData);
  } catch (error) {
    return res.send(" request for get article is field", error);
  }
});
//this example for who i Delete article for id
app.delete("/article/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const articleData = await Article.findByIdAndDelete(articleId); //use object model for [ findByIdAndDelete ] table in DB
    res.send("delete article successfully" +' '+ articleId);
    console.log("delete article successfully");
  } catch (error) {
    return res.send(" request for get article is field", error);
  }
});

app.get("/", async (req, res)=>{
    const articles = await Article.find().maxTimeMS(30000);
    res.render("articles.ejs",{
        articles:articles,
    })
})

/////////////////////Create colections endpoint///////////////////////

//this example on build GET request
app.get("/users", (req, res) => {
  res.send(`Users`);
});

//this example on use more than daynamic params
app.get("/summition/:num1/:num2", (req, res) => {
  const n1 = Number(req.params.num1);
  const n2 = Number(req.params.num2);
  const total = n1 + n2;
  res.send(`summition is : ${total}`);
});

// example on use body parameters
app.get("/hello", (req, res) => {
  console.log(req.body);
  res.send(`${req.body.name}`);
});

// example on use delete request
app.delete("/delete", (req, res) => {
  res.send(`delete success`);
});

// example on use put request
app.put("/put", (req, res) => {
  res.send(`put update success`);
});

// example on use post request
app.post("/post", (req, res) => {
  res.send(`post success`);
});

//example on use query parameters
app.get("/query", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});

//this example on use sendFile
app.get("/fileHTML", (req, res) => {
  //   res.send(__dirname + '/views/home.html');
  //   res.sendFile(__dirname + '/views/home.html');

  //this example on how use ejs for rendering any json variable in html file 'but folder name views'
  res.render("home.ejs", {
    title: "HOME.ejs",
  });
});

//this code for creating a server title
app.listen("8000", () => {
  console.log("listening on http://localhost:8000");
});
