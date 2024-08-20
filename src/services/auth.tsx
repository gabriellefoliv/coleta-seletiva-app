import api from '../services/api.js'
import Config from '../config/config'

interface Response {
  token: string;
  user: {
    id: number,
    nome: string,
    email: string,
    usuario: string,
    cpf: string,
    permissao: string,

    id_cliente: number,
    cep: string,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: string,
    celular: string,
    complemento: string,

    id_coletor: number


  };
}

export function signIn(user) : Promise<Response>{
  return new Promise((resolve) => {
    fetch('http://'+Config.apiBaseURL+'/users/'+user)
    .then(response => response.json()).then(data=>{
        if(data.response.userInfo[0].permissao == 0){
          resolve({
            token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
            user:{
              id: data.response.userInfo[0].id,
              nome: data.response.userInfo[0].nome,
              usuario: data.response.userInfo[0].usuario,
              email: data.response.userInfo[0].email,
              cpf: data.response.userInfo[0].CPF,
              permissao: data.response.userInfo[0].permissao,

              id_cliente: data.response.userInfo[0].id_cliente,
              cep: data.response.userInfo[0].cep,
              rua: data.response.userInfo[0].rua,
              bairro: data.response.userInfo[0].bairro,
              cidade: data.response.userInfo[0].cidade,
              estado: data.response.userInfo[0].estado,
              numero: data.response.userInfo[0].numero,
              celular: data.response.userInfo[0].celular,
              complemento: data.response.userInfo[0].complemento,

              id_coletor: null
            }
          });
        }else{
          if(data.response.userInfo[0].permissao == 1){
            resolve({
              token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
              user:{
                id: data.response.userInfo[0].id,
                nome: data.response.userInfo[0].nome,
                usuario: data.response.userInfo[0].usuario,
                email: data.response.userInfo[0].email,
                cpf: data.response.userInfo[0].CPF,
                permissao: data.response.userInfo[0].permissao,

                id_cliente: null,
                cep: null,
                rua: null,
                bairro: null,
                cidade: null,
                estado: null,
                numero: null,
                celular: null,
                complemento: null,

                id_coletor: data.response.userInfo[0].id_coletor
              }
            });
          }
        }
        /*resolve({
          token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
          user:{
            id: data.response.userInfo[0].id,
            id_cliente: data.response.userInfo[0].id_cliente,
            nome: data.response.userInfo[0].nome,
            email: data.response.userInfo[0].emai,
            rua: data.response.userInfo[0].rua

          }
        });*/
    })
    .catch((err) => {
      alert("Usuario ou senha incorretos");
    });

  });
}