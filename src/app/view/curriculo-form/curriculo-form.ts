import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../service/curriculo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curriculo-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './curriculo-form.html',
  styleUrl: './curriculo-form.scss',
})
export class CurriculoForm implements OnInit {
  public formulario!: FormGroup;
  public modoEdicao: boolean = false;
  public curriculoId?: number;
  public mensagem: string = '';
  public tipoMensagem: 'sucesso' | 'erro' | '' = '';
  public carregando: boolean = false;

  // Simula o usuário logado (id fixo para fins didáticos)
  private readonly USUARIO_ID = 1;

  constructor(
    private fb: FormBuilder,
    private curriculoService: CurriculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    // Verifica se é modo edição via parâmetro de rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.curriculoId = Number(id);
      this.carregarCurriculo(this.curriculoId);
    }
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      formacao: ['', [Validators.required, Validators.minLength(10)]],
      experiencia: ['', [Validators.required, Validators.minLength(10)]],
      habilidades: ['', [Validators.required]],
      linkedin: ['', [Validators.pattern('https?://.+')]],
    });
  }

  carregarCurriculo(id: number): void {
    this.carregando = true;
    this.curriculoService.getCurriculoById(id).subscribe({
      next: (curriculo) => {
        this.formulario.patchValue(curriculo);
        this.carregando = false;
      },
      error: () => {
        this.exibirMensagem('Erro ao carregar currículo.', 'erro');
        this.carregando = false;
      },
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.exibirMensagem(
        'Preencha todos os campos obrigatórios corretamente.',
        'erro'
      );
      return;
    }

    const curriculo: Curriculo = {
      ...this.formulario.value,
      usuarioId: this.USUARIO_ID,
    };

    if (this.modoEdicao && this.curriculoId) {
      curriculo.id = this.curriculoId;
      this.curriculoService.putCurriculo(curriculo).subscribe({
        next: () => {
          this.exibirMensagem('Currículo atualizado com sucesso!', 'sucesso');
          setTimeout(() => this.router.navigate(['/meu-curriculo']), 1500);
        },
        error: () => {
          this.exibirMensagem('Erro ao atualizar currículo.', 'erro');
        },
      });
    } else {
      this.curriculoService.postCurriculo(curriculo).subscribe({
        next: () => {
          this.exibirMensagem('Currículo cadastrado com sucesso!', 'sucesso');
          setTimeout(() => this.router.navigate(['/meu-curriculo']), 1500);
        },
        error: () => {
          this.exibirMensagem('Erro ao cadastrar currículo.', 'erro');
        },
      });
    }
  }

  exibirMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 4000);
  }

  // Atalhos para verificação no template
  campo(nome: string) {
    return this.formulario.get(nome);
  }

  campoInvalido(nome: string): boolean {
    const c = this.campo(nome);
    return !!(c && c.invalid && c.touched);
  }
}
