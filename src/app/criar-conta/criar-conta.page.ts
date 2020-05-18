import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/Usuario';
import { ComparaValidator } from '../validators/compara-validator';
import { CpfValidator } from '../validators/cpf-validator';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  public formCadastro: FormGroup;
  public usuario: Usuario;

  mensagens_validacao = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter no mínimo 3 caracteres' },
    ],
    sexo: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
      { tipo: 'email', mensagem: 'Email Inválido' },
    ],
    dataNascimento: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter no mínimo 6 caracteres' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caracteres' },
    ],
    validarSenha: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter no mínimo 6 caracteres' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caracteres' },
      { tipo: 'comparacao', mensagem: 'Aa senha precisa ser igual a anterior .' },
    ]
  };

  constructor(
    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    public router: Router,
    public alertController: AlertController ) {
    this.formCadastro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.cpfValido])],
      sexo: ['', Validators.compose([Validators.required])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
      validarSenha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
    }, {
      Validor: ComparaValidator('senha', 'validarSenha')
    });
  }

  ngOnInit() {
  }

  public async salvarUsuario() {
    if (this.formCadastro.valid) {
      this.usuario = this.formCadastro.value as Usuario;
      delete this.usuario['validarSenha'];

      if (await this.usuarioService.salvar(this.usuario)) {
        this.alertCadastro('sucesso!', 'Usuário foi salvo')
        this.router.navigateByUrl('/home');
      } else {
        this.alertCadastro('ERRO!', 'Erro ao salvar o usuário');
      }
    } else {
      this.alertCadastro('ERRO!', 'Formulário Inválido');
    }

  }

  async alertCadastro (titulo, msg) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}




