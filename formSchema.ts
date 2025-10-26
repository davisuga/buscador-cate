import { z } from "zod";

/**
 * Labels / opções "bonitinhas" para UI
 */
export const OPTIONS = {
  documentType: {
    CPF: "CPF",
    RNE: "RNE (Documento de estrangeiro)",
  },
  nationality: {
    BR: "Brasil",
    OTHER: "Outra nacionalidade",
  },

  educationLevel: {
    FUNDAMENTAL_INCOMPLETE: "Ensino fundamental incompleto",
    FUNDAMENTAL_COMPLETE: "Ensino fundamental completo",
    HIGH_SCHOOL_INCOMPLETE: "Ensino médio incompleto",
    HIGH_SCHOOL_COMPLETE: "Ensino médio completo",
    HIGHER_INCOMPLETE: "Superior incompleto",
    HIGHER_COMPLETE: "Superior completo",
  },

  housingStatus: {
    HAS_RESIDENCE: "Tenho residência",
    HOMELESS: "Estou em situação de rua",
  },

  workHistory: {
    NEVER: "Nunca trabalhei",
    NOT_WORKING: "Não estou trabalhando",
    WORKING: "Estou trabalhando",
  },

  gender: {
    MALE: "Masculino",
    FEMALE: "Feminino",
    OTHER: "Outro",
  },

  sexualOrientation: {
    HETERO: "Heterossexual",
    LGBTQIA: "LGBTQIA+",
    PREFER_NOT_TO_SAY: "Prefiro não informar",
  },

  race: {
    WHITE: "Branca",
    BLACK: "Preta",
    YELLOW: "Amarela",
    BROWN: "Parda",
    INDIGENOUS: "Indígena",
  },

  disabilities: {
    NONE: "Não tem deficiência",
    AUDITIVA: "Auditiva",
    SPEECH: "Fala",
    PHYSICAL: "Física",
    INTELLECTUAL: "Intelectual",
    MULTIPLE: "Múltipla",
    PSYCHOSOCIAL: "Psicossocial",
    VISUAL: "Visual",
    OTHER: "Outras",
  },

  discoveredVia: {
    PREFEITURA: "No site da Prefeitura de São Paulo",
    CATE_UNIT: "Em uma unidade do Cate",
    SOCIAL: "Em redes sociais",
    MEDIA: "Em propagandas/notícias (TV ou rádio)",
    GOV_INSTITUTIONS: "Em instituições do governo (CRAS, UBS, etc.)",
    NGOs: "Em instituições não governamentais / ONGs",
    FAMILY: "Por meio de parentes, amigos ou vizinhos",
    UNICEF: "Pela Unicef",
    MICROSOFT: "Pela Microsoft",
    OTHER: "Outros",
  },

  socialPrograms: {
    POT_GAE: "POT GAE",
    POT_ABAE: "POT ABAE",
    BOLSA_JOVEM: "Bolsa Jovem",
    BOLSA_TECH: "Bolsa Tech",
    TEM_SAIDA: "Tem Saída",
    NONE: "Não participo de nenhum programa",
    OTHER: "Outros",
  },

  // Exemplos de grupos de interesses: categorias -> opções
  interestsCategories: {
    CREATIVE_ECONOMY: {
      label: "Economia criativa",
      options: [
        "Arquitetura, design e decoração",
        "Audiovisual",
        "Beleza e estética",
        "Dança",
        "Eventos e entretenimento",
        "Fotografia",
        "Literatura",
        "Moda e têxtil",
        "Música",
        "Produção digital",
        "Teatro",
        "Trabalhos manuais e artesanato",
        "Turismo",
      ],
    },
    GASTRONOMY: {
      label: "Gastronomia",
      options: [
        "Bebidas",
        "Comida de festas e eventos",
        "Comida típica",
        "Confeitaria e panificação",
        "Manipulação de alimentos",
        "Nutrição",
      ],
    },
    MANAGEMENT_WORK: {
      label: "Gestão, Empreendedorismo e Trabalho",
      options: [
        "Apresentação e currículo",
        "Atendimento",
        "Competências socioemocionais",
        "Comunicação e linguagem",
        "Conhecimentos gerais",
        "Contabilidade",
        "Design Thinking",
        "Empreendedorismo",
        "Finanças",
        "Gestão da informação",
        "Gestão da produção e qualidade",
        "Gestão de pessoas",
        "Idiomas estrangeiros",
        "Informática",
        "Logística",
        "Marketing pessoal",
        "MEI",
        "Pensamento criativo",
        "Precificação",
        "Relacionamento com cliente",
        "Soft-skills",
      ],
    },
    ENVIRONMENT: {
      label: "Meio Ambiente e Sustentabilidade",
      options: [
        "Agricultura",
        "Água",
        "Educação ambiental",
        "Energia",
        "Fiscalização ambiental",
        "Meio ambiente",
        "Práticas sustentáveis",
        "Projetos sociais",
        "Resíduos sólidos",
      ],
    },
    HEALTH: {
      label: "Saúde e Bem-Estar",
      options: [
        "Auxiliares gerais da saúde",
        "Beleza",
        "Cuidadores",
        "Diagnóstico e análise clínica",
        "Enfermagem e primeiros socorros",
        "Farmácia",
        "Gestão da saúde",
        "Nutrição",
        "Saúde bucal",
        "Saúde e cuidados com animais",
        "Saúde mental",
        "Terapias complementares",
      ],
    },
    TECHNOLOGY: {
      label: "Tecnologia",
      options: [
        "3D",
        "Audiovisual",
        "Backend",
        "Data Science",
        "Frontend",
        "Games",
        "Gestão em TI",
        "Infraestrutura",
        "Marketing digital",
        "Mobile",
        "Programação",
        "Softwares",
        "UX",
        "Webdesign",
      ],
    },
  },
} as const;

/**
 * Zod schemas
 */

const emailSchema = z
  .string({ required_error: "E-mail é obrigatório" })
  .email({ message: "E-mail inválido" })
  .describe("Seu e-mail (será usado para login e contato)");

const passwordSchema = z
  .string({ required_error: "Senha é obrigatória" })
  .min(6, { message: "Mínimo de 6 caracteres" })
  .describe(
    "Senha de mínimo 6 caracteres, com letras, números e ao menos 1 símbolo (recomendado)"
  );

// (campo simples; para CPF real sugiro usar um validador extra)
const cpfSchema = z
  .string()
  .optional()
  .describe("CPF (somente números). Opcional se escolher outro documento");

/**
 * Main form schema
 */
export const RegistrationSchema = z
  .object({
    // identificação básica
    name: z
      .string({ required_error: "Nome é obrigatório" })
      .min(2)
      .describe("Nome completo do participante"),

    email: emailSchema,
    confirmEmail: z
      .string({ required_error: "Confirmação de e-mail é obrigatória" })
      .email()
      .describe("Confirme seu e-mail"),

    // contatos
    celular: z
      .string()
      .optional()
      .describe("Celular com DDD (ex: 11 9xxxx-xxxx)"),
    telefone: z.string().optional().describe("Telefone com DDD (opcional)"),

    // documento
    documentType: z
      .enum([OPTIONS.documentType.CPF, OPTIONS.documentType.RNE])
      .describe("Informe qual documento você vai usar"),
    cpf: cpfSchema,


    // pessoais
    birthDate: z
      .string()
      .optional()
      .describe("Data de nascimento (DD/MM/AAAA)"),
    nationality: z
      .enum([OPTIONS.nationality.BR, OPTIONS.nationality.OTHER])
      .describe("Nacionalidade do participante"),
    monthlyIncome: z
      .number({ invalid_type_error: "Renda deve ser um número" })
      .nonnegative()
      .optional()
      .describe("Renda média mensal (em R$)"),

    // seleção única tipo radio / choice
    educationLevel: z
      .enum([
        OPTIONS.educationLevel.FUNDAMENTAL_INCOMPLETE,
        OPTIONS.educationLevel.FUNDAMENTAL_COMPLETE,
        OPTIONS.educationLevel.HIGH_SCHOOL_INCOMPLETE,
        OPTIONS.educationLevel.HIGH_SCHOOL_COMPLETE,
        OPTIONS.educationLevel.HIGHER_INCOMPLETE,
        OPTIONS.educationLevel.HIGHER_COMPLETE,
      ])
      .describe("Grau de escolaridade"),

    housingStatus: z
      .enum([OPTIONS.housingStatus.HAS_RESIDENCE, OPTIONS.housingStatus.HOMELESS])
      .describe("Situação de moradia"),

    residesInSaoPaulo: z
      .boolean()
      .describe("Reside na cidade de São Paulo?"),

    workHistory: z
      .enum([
        OPTIONS.workHistory.NEVER,
        OPTIONS.workHistory.NOT_WORKING,
        OPTIONS.workHistory.WORKING,
      ])
      .describe("Histórico de trabalho"),

    gender: z
      .enum([OPTIONS.gender.MALE, OPTIONS.gender.FEMALE, OPTIONS.gender.OTHER])
      .optional()
      .describe("Gênero"),

    sexualOrientation: z
      .enum([
        OPTIONS.sexualOrientation.HETERO,
        OPTIONS.sexualOrientation.LGBTQIA,
        OPTIONS.sexualOrientation.PREFER_NOT_TO_SAY,
      ])
      .optional()
      .describe("Orientação sexual"),

    race: z
      .enum([
        OPTIONS.race.WHITE,
        OPTIONS.race.BLACK,
        OPTIONS.race.YELLOW,
        OPTIONS.race.BROWN,
        OPTIONS.race.INDIGENOUS,
      ])
      .optional()
      .describe("Raça / cor"),

    disability: z
      .enum([
        OPTIONS.disabilities.NONE,
        OPTIONS.disabilities.AUDITIVA,
        OPTIONS.disabilities.SPEECH,
        OPTIONS.disabilities.PHYSICAL,
        OPTIONS.disabilities.INTELLECTUAL,
        OPTIONS.disabilities.MULTIPLE,
        OPTIONS.disabilities.PSYCHOSOCIAL,
        OPTIONS.disabilities.VISUAL,
        OPTIONS.disabilities.OTHER,
      ])
      .optional()
      .describe("Deficiências (se houver)"),

    discoveredVia: z
      .enum([
        OPTIONS.discoveredVia.PREFEITURA,
        OPTIONS.discoveredVia.CATE_UNIT,
        OPTIONS.discoveredVia.SOCIAL,
        OPTIONS.discoveredVia.MEDIA,
        OPTIONS.discoveredVia.GOV_INSTITUTIONS,
  OPTIONS.discoveredVia.NGOs,
        OPTIONS.discoveredVia.FAMILY,
        OPTIONS.discoveredVia.UNICEF,
        OPTIONS.discoveredVia.MICROSOFT,
        OPTIONS.discoveredVia.OTHER,
      ])
      .optional()
      .describe("Onde você nos conheceu?"),

    socialPrograms: z
      .array(
        z.enum([
          OPTIONS.socialPrograms.POT_GAE,
          OPTIONS.socialPrograms.POT_ABAE,
          OPTIONS.socialPrograms.BOLSA_JOVEM,
          OPTIONS.socialPrograms.BOLSA_TECH,
          OPTIONS.socialPrograms.TEM_SAIDA,
          OPTIONS.socialPrograms.NONE,
          OPTIONS.socialPrograms.OTHER,
        ])
      )
      .optional()
      .describe("Você está participando de algum dos programas sociais abaixo?"),

    // interesses: objetos com arrays de strings (multi-select por categoria)
    interests: z
      .object({
        creativeEconomy: z
          .array(z.enum(OPTIONS.interestsCategories.CREATIVE_ECONOMY.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Economia Criativa"),

        gastronomy: z
          .array(z.enum(OPTIONS.interestsCategories.GASTRONOMY.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Gastronomia"),

        managementWork: z
          .array(z.enum(OPTIONS.interestsCategories.MANAGEMENT_WORK.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Gestão, Empreendedorismo e Trabalho"),

        environment: z
          .array(z.enum(OPTIONS.interestsCategories.ENVIRONMENT.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Meio Ambiente e Sustentabilidade"),

        health: z
          .array(z.enum(OPTIONS.interestsCategories.HEALTH.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Saúde e Bem-Estar"),

        technology: z
          .array(z.enum(OPTIONS.interestsCategories.TECHNOLOGY.options as unknown as [string, ...string[]]))
          .optional()
          .describe("Interesses em Tecnologia"),
      })
      .optional()
      .describe("Interesses por categoria (multi-select)"),
  })
  .superRefine((data, ctx) => {
    // validações compostas (ex.: email e confirmações, senha e confirmação)
    if (data.email && data.confirmEmail && data.email !== data.confirmEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "E-mail e confirmação de e-mail não conferem",
        path: ["confirmEmail"],
      });
    }
 

    // Se documento escolhido for CPF, exigir CPF (apenas presença — não validação de dígitos aqui)
    if (data.documentType === OPTIONS.documentType.CPF && !data.cpf) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF é obrigatório quando selecionar CPF como documento",
        path: ["cpf"],
      });
    }
  });

/**
 * Tipagem TypeScript inferida
 */
export type RegistrationForm = z.infer<typeof RegistrationSchema>;

/**
 * Observações / sugestões:
 * - Para CPF: substituir `cpf` por um refinamento que valide dígitos e máscara.
 * - Para data: usar z.string().refine(...) ou z.date() com parser dependendo do input.
 * - Para renda: aceitar string com formato monetário e fazer parse para number.
 * - Para performance: exportar `OPTIONS` para backend/frontend usar as mesmas labels.
 */
