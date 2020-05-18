import { Injectable } from '@angular/core';

//imposta o controlador do Storage
import {Storage} from '@ionic/storage';
import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Ionic Storage: https://ionicframework.com/docs/angular/storage
  // mais detalhes: https://fabricadecodigo.com/como-armazenar-dados-offline-com-ionic-storage/

  constructor(private storage: Storage) {

    /*O Storage trabalha com SQLite e IndexedDb
    *
    *IndexedDB -> Para guardar dados nos navegadores
    *SQLite -> Para guardar dados nos smartphones
    *
    *Para haver compatibilidade entre os dois, o Storage trabalha com o padrão chave/valor
    * ID - Chave Primária -> Email -> unica no sistema
    */

   }

    //CRUD
    public async salvar(usuario: Usuario) {
      if (usuario.email){
        await this.storage.set(usuario.email, usuario);
        return true;
      } else{
        return false;
      }
    }

    public async busca (email){
      let usuario: Usuario;
      await this.storage.get(email).then(valor => {
        if (valor) {
          usuario = valor
        }else{
          usuario = null;
        }
      });

      return usuario;
    }

    public async buscarTodos() {
      let usuarios = [];
      return await this.storage.forEach((valor, chave, i) => {
        usuarios.push(valor);
      }).then(() => {

      }).catch(() => {
        usuarios = [];
      });
    }

    public async excluir(email){
      return await this.storage.remove(email);
    }

    public async login(email: string, senha: string) {
      let usuario: Usuario;
      await this.storage.get(email).then(valor => {
        if (valor && valor.senha == senha) {
          usuario = valor;
        }else{
          usuario = null;
        }
      });
      return usuario;
    }

}
