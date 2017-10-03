// server.js

// base

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// config bodyParser
app.use(bodyParser.urlencoded({ exteneded: true}));
app.use(bodyParser.json());

// config cors
app.use(cors());

// port
var port = process.env.PORT || 3003;

// routes
var router = express.Router();

// router middleware 
router.use(function(req, res, next) {
  // console.log('some middleware is happening');
  next(); //continues to next routes
})

// test
router.get('/', function(req, res) {
  res.json({
    message: 'yoyoyoyo! welcome to api world!'
  });
});

// blog
router.route('/blog')
  .post(function(req, res) {
    var blog = new Blog();

    // write data to db
    blog.title = req.body.title;
    blog.date = req.body.date;
    blog.content = req.body.content;
    blog.category_id = req.body.category_id;

    // save blog and check error
    blog.save(function(err) {
      if (err)
        res.send(err);
    
      res.json({message: 'Blog created!'});
    });
  })
  .get(function(req, res) {
    Blog.find(function(err, blog) {
      if (err)
        res.send(err);

      res.json(blog);
    })
  });

router.route('/blog/:blog_id')
  .get(function(req, res) {
    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);
      
      res.json(blog);
    });
  })
  .put(function(req, res) {
    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);

      blog.title = req.body.title;
      blog.date = req.body.date;
      blog.content = req.body.content;
      blog.category_id = req.body.category_id;

      blog.save(function(err) {
        if (err)
          res.send(err);
        
        res.json({ message: 'Blog updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Blog.remove({
      _id: req.params.blog_id
    }, function(err, blog) {
      if (err)
        res.send(err);

      res.json({ message: 'Blog deleted!'});
    });
  });

// category
router.route('/category')
  .get(function(req, res) {
    Category.find(function(err, category) {
      if (err)
        res.send(err);

      res.json(category);
    })
  })
  .post(function(req, res) {
    var category = new Category();

    // write category
    category.category = req.body.category;

    // save category
    category.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Category created!'});
    });
  });

router.route('/category/:category_id')
  .get(function(req, res) {
    Category.findById(req.params.category_id, function(err, category) {
      if (err)
        res.send(err);
      
      res.json(category);
    });
  })
  .put(function(req, res) {
    Category.findById(req.params.category_id, function(err, category) {
      if (err)
        res.send(err);

      category.category = req.body.category;

      category.save(function(err) {
        if (err)
          res.send(err);
        
        res.json({ message: 'Category updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Category.remove({
      _id: req.params.category_id
    }, function(err, category) {
      if (err)
        res.send(err);

      res.json({ message: 'Category deleted!'});
    });
  });

// all of routes will prefixed with /api
app.use('/api', router);

//database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admin');

// blog model
var Blog = require('./app/models/blog');

// category model
var Category = require('./app/models/category');

//start server
app.listen(port);
console.log('Magic happens on port' + port);