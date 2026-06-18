import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../service/curriculo.service';

@Component({
  selector: 'app-curriculo-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './curriculo-detail.html',
  styleUrl: './curriculo-detail.scss',
})
export class CurriculoDetail implements OnInit {
  public curriculo?: Curriculo;
  public carregando: boolean = true;
  public erro: string = '';

  constructor(
    private curriculoService: CurriculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarCurriculo(Number(id));
    } else {
      this.erro = 'ID do currículo não informado.';
      this.carregando = false;
    }
  }

  carregarCurriculo(id: number): void {
    this.curriculoService.getCurriculoById(id).subscribe({
      next: (dados) => {
        this.curriculo = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar currículo. Verifique o servidor.';
        this.carregando = false;
      },
    });
  }

  voltar(): void {
    this.router.navigate(['/curriculos']);
  }

  // Separa habilidades em tags individuais
  getHabilidades(): string[] {
    if (!this.curriculo?.habilidades) return [];
    return this.curriculo.habilidades
      .split(/[,;]/)
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
  }
}
