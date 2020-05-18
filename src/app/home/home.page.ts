import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UsuarioService } from '../services/usuario.service';


/*
*Para funcionar os formulários, precisamos importar (adicionar)
*o Módulo ReactiveFormsModule no arquivo (pagina).Module.ts
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formLogin: FormGroup;

  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo email é obrigatório' },
      { tipo: 'email', mensagem: 'E-mail Invalido' },
    ],

    senha: [
      { tipo: 'required', mensagem: 'O campo senha é obrigatório' },
      { tipo: 'minlenght', mensagem: 'Este campo deve ter no mínimo 6 caracteres' },
      { Tipo: 'maxlength', mensagem: 'Este campo deve ter no máximo 8 caracteres' },
    ]
  };

  constructor(
    public formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public router: Router,
    public usuarioService: UsuarioService) {
    //monta o formulário
    this.formLogin = formBuilder.group({
      //Declaro os campos  do formulário
      email: ["", Validators.compose([Validators.email, Validators.required])],
      senha: ["", Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    });
  }

  public async login() {
    if (this.formLogin.valid) {

      let email = this.formLogin.value.email;
      let senha = this.formLogin.value.senha

      if (await this.usuarioService.login(email, senha)) {
        this.router.navigateByUrl('painel-usuario');
      } else {
        this.alertUserInvalid();
      }

    } else {
      this.alertFormInvalid();
    }
  }

  async alertFormInvalid() {
    const alert = await this.alertController.create({
      header: 'ERRO!',
      message: 'Formulário inválido, confira os dados!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertUserInvalid() {
    const alert = await this.alertController.create({
      header: 'ERRO!',
      message: 'E-mail/senha inválidos, confira os dados!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
