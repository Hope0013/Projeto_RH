import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../service/curriculo.service';

@Component({
  selector: 'app-meu-curriculo',
  imports: [CommonModule, RouterLink],
  templateUrl: './meu-curriculo.html',
  styleUrl: './meu-curriculo.scss',
})
export class MeuCurriculo implements OnInit {
  public curriculo?: Curriculo;
  public carregando: boolean = true;
  public mensagem: string = '';
  public tipoMensagem: 'sucesso' | 'erro' | '' = '';

  // Simula o usuário logado (id fixo para fins didáticos)
  private readonly USUARIO_ID = 1;

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.carregarMeuCurriculo();
  }

  carregarMeuCurriculo(): void {
    this.carregando = true;
    this.curriculoService
      .getCurriculoByUsuarioId(this.USUARIO_ID)
      .subscribe({
        next: (dados) => {
          this.curriculo = dados.length > 0 ? dados[0] : undefined;
          this.carregando = false;
        },
        error: () => {
          this.exibirMensagem(
            'Erro ao carregar currículo. Verifique o servidor.',
            'erro'
          );
          this.carregando = false;
        },
      });
  }

  excluir(): void {
    if (!this.curriculo?.id) return;
    if (!confirm('Tem certeza que deseja excluir seu currículo?')) return;

    this.curriculoService.deleteCurriculo(this.curriculo.id).subscribe({
      next: () => {
        this.curriculo = undefined;
        this.exibirMensagem('Currículo excluído com sucesso!', 'sucesso');
      },
      error: () => {
        this.exibirMensagem('Erro ao excluir currículo.', 'erro');
      },
    });
  }

  getHabilidades(): string[] {
    if (!this.curriculo?.habilidades) return [];
    return this.curriculo.habilidades
      .split(/[,;]/)
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
  }

  exibirMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 4000);
  }
}
