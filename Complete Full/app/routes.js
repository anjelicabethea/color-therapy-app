module.exports = function(app, passport, db, ObjectId){
  //function that is taking in app, passport etc
  // const mood = require ('../app/moodapi.json')

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/', function(req, res) {
    res.render('calender.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      // res.header("Content-Type",'application/json');

      res.render('profile.ejs', {
        user : req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //newsfeed=====

  app.get('/newsfeed', function(req, res) {
    db.collection('newsfeed').find().toArray((err, result) => {
      if (err) return console.log(err)
      // res.header("Content-Type",'application/json');

      res.render('newsfeed.ejs', {
        user : req.user,
        newsfeed: result
      })
    })
  });


  //Calender

  app.get('/calender', function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      // res.header("Content-Type",'application/json');

      res.render('calender.ejs', {
        user : req.user,
        messages: result
      })
    })
  });

  app.put('/colorcount', function(req, res) {
    var uId = ObjectId(req.session.passport.user)
    console.log(req.body);
    let colorchosen = req.body.color
    let search = 'local.' + colorchosen
    console.log(uId)
    db.collection('users').findOneAndUpdate({'_id': uId}, {

      $inc: {[search]: 1}

    }, {
      sort: {_id: 1},
      upsert: false
    }, (err, result) => {
      if (err) return console.log(err)
      res.render('calender.ejs', {
        user : req.user,
      })
    })
  });

  app.get('/getcolorcount', isLoggedIn, function(req, res) {
    console.log(req._passport.session.user)
    let userId = ObjectId(req._passport.session.user)
    db.collection('users').find({'_id': userId}).toArray((err, result) => {
      // console.log(result)
      if (err) return console.log(err)
      res.json(result)
    })
  });




//chatroom===
//pass query apram get color
app.get('/chat/:room', function(req, res) {
  let color=req.params.room
  var uId = ObjectId(req.session.passport.user)
  var uName
  // insertDocuments(db, req, 'images/uploads/' + req.file.filename, () => {});
  db.collection('users').find({"_id": uId}).toArray((err, user) => {
    if (err) return console.log(err)
    uName = user[0].local.userName
//filter out color
    db.collection('messages').find({color:color}).toArray((err, result) => {

      if (err) return console.log(err)
      // res.header("Content-Type",'application/json');

      res.render('chat.ejs', {
        uId : uId,
        uName: uName,
        users: user,
        messages: result,
        color:color
      })
    })
  })

  // db.collection('messages').find().toArray((err, result) => {
  //   console.log()
  //   if (err) return console.log(err)
  //   // res.header("Content-Type",'application/json');
  //
  //   res.render('chat.ejs', {
  //     user : req.user,
  //     messages: result
  //   })
  // })
});

  // message board routes ===============================================================
//  create a post in the chatroom
  app.post('/talk', (req, res) => {
    console.log(req.body)
    let name = req.user.local.userName
    console.log(req.user._id)
    db.collection('messages').save({chat: req.body.chat, name: name, color: req.body.color}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect(`/chat/${req.body.color}`)
        // res.send('success')
    })
  })



  app.post('/newsFeedPost', (req, res) => {
    db.collection('newsfeed').save({name: req.body.name, msg: req.body.msg, feelings: req.body.feelings}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/newsfeed')
    })
  })

app.put('/dayColor',(req,res)=>{
  console.log(req.body)
  let color = req.body.color
  let userId = ObjectId(req.user._id)
  console.log(userId)
  db.collection('users').findOneAndUpdate({_id: userId},{
    $push:{[color]: 1}
  })

})



  app.put('/messages', (req, res) => {
    db.collection('messages')
    .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
      $set: {
        thumbUp:req.body.thumbUp+1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.put('/messages', (req, res) => {
    db.collection('messages')
    .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
      $set: {
        thumbUp:req.body.thumbUp -1

      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.delete('/chatdelete', (req, res) => {
    console.log(req.body);
    let id = ObjectId(req.body.id)
    db.collection('messages').findOneAndDelete({_id: id}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })
  app.delete('/newsfeeddelete', (req, res) => {
    console.log(req.body);
    let id = ObjectId(req.body.id)
    db.collection('newsfeed').findOneAndDelete({_id: id}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })


    app.delete('/talk', (req, res) => {
      console.log(req.body)

      db.collection('messages').findOneAndDelete({'msg.userName': req.body.name,'msg.msg': req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
