const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log("estoy en get /")
    res.sendStatus(600)
//   res.render('index');
});

router.get('/usuarios/signup', (req, res, next) => {
    console.log("estoy en signup")
  res.render('usuarios/signup');
// res.sendStatus(600)
});

router.post('/usuarios/signup', passport.authenticate('local', {
  successRedirect: '/usuarios/profile',
  failureRedirect: '/usuarios/signup',
//   failureFlash: true
})); 

router.get('/usuarios/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/usuarios/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/usuarios/signin',
//   failureFlash: true
}));

router.get('/usuarios/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/usuarios/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;