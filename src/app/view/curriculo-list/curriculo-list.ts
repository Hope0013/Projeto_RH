import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../service/curriculo.service';

@Component({
  selector: 'app-curriculo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './curriculo-list.html',
  styleUrl: './curriculo-list.scss',
})
export class CurriculoList implements OnInit {
  public curriculos: Curriculo[] = [];
  public carregando: boolean = true;
  public mensagem: string = '';
  public tipoMensagem: 'sucesso' | 'erro' | '' = '';
  public termoBusca: string = '';

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos(): void {
    this.carregando = true;
    this.curriculoService.getCurriculos().subscribe({
      next: (dados) => {
        this.curriculos = dados;
        this.carregando = false;
      },
      error: () => {
        this.exibirMensagem(
          'Erro ao carregar currículos. Verifique o servidor.',
          'erro'
        );
        this.carregando = false;
      },
    });
  }

  excluir(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Tem certeza que deseja excluir este currículo?')) return;

    this.curriculoService.deleteCurriculo(id).subscribe({
      next: () => {
        this.curriculos = this.curriculos.filter((c) => c.id !== id);
        this.exibirMensagem('Currículo excluído com sucesso!', 'sucesso');
      },
      error: () => {
        this.exibirMensagem('Erro ao excluir currículo.', 'erro');
      },
    });
  }

  get curriculosFiltrados(): Curriculo[] {
    if (!this.termoBusca.trim()) return this.curriculos;
    const termo = this.termoBusca.toLowerCase();
    return this.curriculos.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.habilidades.toLowerCase().includes(termo) ||
        c.formacao.toLowerCase().includes(termo)
    );
  }

  filtrar(evento: Event): void {
    this.termoBusca = (evento.target as HTMLInputElement).value;
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
