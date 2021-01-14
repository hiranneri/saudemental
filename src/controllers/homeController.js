const { response } = require('express');
const {api} = require('../services/api')
exports.pesquisarEmail = async(req, res) => {
  try {   
    const email = req.body.email;
    api.post(`usuario`, {
      email: email
    }).then(response =>{
      if(response.status==200){       
       return res.render('senha',{email});
      }
    }).catch(err =>{
      if(err.response!=undefined){
        if(err.response.status==400){
          return res.render('cadastrousuario',{email});
        }
      }else{
        return res.render('404')
      }   
    })
    
  } catch (error) {
      console.log(error);
     return res.render('404');
  }
  
};
exports.paginaInicial = async(req, res) => {
  if(req.session.usuario){
    try {    
      let usuario = req.session.usuario;      
      let psicologo = req.session.psicologo;
      if(usuario[0].crp){        
        return res.render('homepsicologo', {usuario, psicologo});
        //{propostasPaciente, usuarioLogado, paciente}); 
      }else{
        return res.render('homepaciente', {usuario});
      }     
      
      
    } catch (error) {
        console.log(error);
        res.render('404');
    }
  }
       
  res.render('index');
  return;
}
exports.paginaCadastrar= async (req,res) => {
  res.render('cadastrousuario', {email: req.query.email});  
 
}
exports.acessar = async (req,res) => {
  try {
    const email = req.body.email;
    const senhaDigitada = req.body.senha; 
    api.post('acessar',{
      email: email,
      senha: senhaDigitada
    }).then(response =>{
      if(response.status==200){       
        req.session.usuario = response.data.usuario;
        req.session.psicologo = response.data.psicologo;
        req.session.save(function(){
          return res.redirect('/');
          });       
      }             
       
    }).catch(error =>{
     
      if(error.response.status==404){
        req.flash('errors', 'Senha Inválida. Digite novamente!');
        req.session.save(()=>{
          req.session.email = email;
          return res.redirect('senha');
          
        });       
      return;
      }
      
    });
  }catch(err){
    
    res.render('404');
  }
   
      

  
}
exports.senhaInvalida = async(req,res)=>{
  const email = req.session.email;
  return res.render('senha', {email});
}
exports.cadastrar = (req,res) => {
  //console.log(req.body);
  const novoUsuario = req.body;
 
  try {
   
    api.post('cadastrar',{
      novoUsuario
    }).then(response =>{
      if(response.status==200){
       
        req.session.usuario = response.data.usuario;
        req.session.save(function(){
          return res.redirect('/');
          });       
      }             
       
    }).catch(error =>{
        req.flash('errors', 'Tente novamente mais tarde');
        req.session.save(()=>{
          return res.render('/')
        });       
      return;      
    });

  //   if(pessoa.errors.length>0){
  //     req.flash('errors', pessoa.errors);
  //     req.session.save(()=>{
  //       return res.redirect('back')
  //     });
  //     return;
  //   }
    
  //   req.flash('success', 'Seu usuário foi criado com sucesso');
  //   req.session.save(function() {
  //     return res.redirect('/');
      
  //   });

  } catch (error) {
    console.log(error);
    res.render('404');
  }
}


exports.logout = (req,res)=>{
  req.session.destroy();
  res.redirect('/');
}

function a(){
 
}