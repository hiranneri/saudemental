const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport){

  passport.serializeUser((user,done)=>{
    done(null,user.id)
  })

  passport.deserializeUser((id,done)=>{
    try {
      const user = teste();
      done(null,user)
    } catch (error) {
      console.log(error)
      return done(error, null);
    }
  })

  passport.use(new LocalStrategy({
    usernameField: 'usuario', 
    passwordField: 'senha'
  },(username, password, done)=>{
    try {
      const user = encontrarUsuario(username);
      if(!user)return done(null,false);

      const isValid = bcrypt.compareSync(password, user.password)

      if(!isValid) return done(null, false)
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(err, false)
    }
  }))
}