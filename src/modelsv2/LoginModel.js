const bcrypt = require('bcryptjs');
const conexao = require('../../conexao');

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    setEmail(email){
        this.email = email;
    }
    async buscaUsuario(body){
        try {
            const usuario = await this.findUsuario(body);
           
            return usuario;
        } catch (e) {
            console.log(e);
        }
       
    }
    findUsuario(body){
        try {
                     
            return new Promise((resolve,reject)=>{
               
               const sql = `SELECT * FROM pessoas where email='${body.email}' and senha='${body.senha}';`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }
    }
    
    async acessar(){
        this.validaUsuario();
        if(this.errors.lenght>0)return;
      //  this.user = await LoginModel.findOne({email: this.body.email});
        if(!this.user){
            this.errors.push('Usuário e/ou senha não existe(m), se cadastre antes de acessar');
            return;
        } 
        if(!bcrypt.compareSync(this.body.senha,this.user.senha)){
            this.errors.push('Usuário e/ou senha não existe(m), se cadastre antes de acessar');
            return;
        }
    }

    validaUsuario(){
        this.cleanUp();
        if(this.body.senha.length<3 || this.body.senha.lenght>=50){          
            this.errors.push('Senha inválida. Digite uma senha entre 3 a 50 caracteres');
           
        }
        if(this.body.confirme !== this.body.senha){          
            this.errors.push('Senha inválida. Confirme a mesma senha digitada');
           
        }
        if(this.body.nome.length<3 || this.body.nome.lenght>=50){          
            this.errors.push('Nome inválido. Digite um nome entre 3 a 50 caracteres');
           
        }

    }
   
    async register(){
        try{
            this.validaUsuario();
            if(this.errors.lenght>0)return false;
      
            await this.userExists();
            if(this.errors.length>0)return;
           
            //Criar hash de senha
            const salt = bcrypt.genSaltSync();
            this.body.senha = bcrypt.hashSync(this.body.senha, salt);
        
            this.user = await this.create(this.body);
          
        }catch(e){
            console.log(e);
        }
           
    }

    async userExists(){
        try{
            this.user = await this.findOne(this.body);        
            if(this.user.length>0){
                this.errors.push('Usuário já existe');
            }
        }catch(e){
            console.log(e);
        }
        
    }

    cleanUp(){
        // for(let key in this.body){
        //     if(typeof this.body[key]!= 'string' ){
        //         this.body[key]='';
        //     }
        // }
        // // this.body = {
        // //     email: this.body.email,
        // //     senha: this.body.senha
        // // };
    }
    findOne(usuario){
        try {
            
          
            return new Promise((resolve,reject)=>{

                //SELECT * FROM pessoas WHERE datanascimento='19930602' and nome='Hiran' and cidade='Curitiba' and estado='SP';
                const sql = `SELECT * FROM pessoas where  datanascimento='${usuario.datanascimento}' 
                    and nome='${usuario.nome}' and cidade='${usuario.cidade}' and estado='${usuario.estado}';`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }
    } 
     validaEmail(email){
         
        try {
            if(typeof email !== 'string') return;
          
            return new Promise((resolve,reject)=>{
                const sql = `SELECT nome, email from pessoas where email = '${email}';`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }

    }
    validaSenha(senha){
         
        try {
                     
            return new Promise((resolve,reject)=>{
               
                const sql = `SELECT nome,sobrenome,email,senha from pessoas where email= '${this.email}' and senha = '${senha}';`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }

    }
    async create(usuario){
        try {
                     
            return new Promise((resolve,reject)=>{
                // //INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) 
                // VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
                const sql = `INSERT INTO pessoas (nome,sobrenome,datanascimento,crp,email,cidade,estado,país,senha)
                    VALUES ('${usuario.nome}','${usuario.sobrenome}','${usuario.datanascimento}','${usuario.crp}','${usuario.email}',
                    '${usuario.cidade}','${usuario.estado}','BRASIL','${usuario.senha}')`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }
    }
 

}

module.exports = Login;
