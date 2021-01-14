exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.usuario = req.session.usuario;
  
  next(); 
};

exports.outroMiddleware = (req, res, next) => {
  res.locals.email = req.flash('email');
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
exports.loginRequired = (req,res,next)=>{
   
  if(!req.session.user){
     req.flash('errors', 'Usuário não está logado');
      req.session.save(()=>{
          res.redirect('/');
          return;
      });      
      
  }
  next();
}