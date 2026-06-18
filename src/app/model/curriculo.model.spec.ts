import { Curriculo } from './curriculo.model';

describe('Curriculo Interface', () => {
  it('should create a curriculo object with all required fields', () => {
    const curriculo: Curriculo = {
      id: 1,
      usuarioId: 1,
      nome: 'Ana Silva',
      email: 'ana@email.com',
      telefone: '(11) 91234-5678',
      formacao: 'Bacharelado em Ciência da Computação',
      experiencia: 'Desenvolvedora Frontend na TechBR (2021–2024)',
      habilidades: 'Angular, TypeScript, HTML',
      linkedin: 'https://linkedin.com/in/anasilva',
    };

    expect(curriculo.nome).toBe('Ana Silva');
    expect(curriculo.usuarioId).toBe(1);
    expect(curriculo.email).toContain('@');
  });

  it('should allow optional id field', () => {
    const curriculo: Curriculo = {
      usuarioId: 2,
      nome: 'Carlos Mendes',
      email: 'carlos@email.com',
      telefone: '(21) 99876-5432',
      formacao: 'Tecnólogo em ADS',
      experiencia: 'Desenvolvedor Backend',
      habilidades: 'Node.js, Java',
      linkedin: '',
    };

    expect(curriculo.id).toBeUndefined();
    expect(curriculo.usuarioId).toBe(2);
  });
});
