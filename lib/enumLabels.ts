/**
 * Mapping utilities to translate backend enum values into
 * human-readable Portuguese labels for the frontend.
 *
 * Usage examples:
 * import { documentTypeLabel } from '@/lib/enumLabels'
 * documentTypeLabel('CPF') // -> 'CPF'
 */

export const DocumentTypeLabels: Record<string, string> = {
  CPF: 'CPF',
  RNE: 'RNE (Documento de estrangeiro)',
};

export const NationalityLabels: Record<string, string> = {
  BR: 'Brasil',
  OTHER: 'Outra nacionalidade',
};

export const EducationLevelLabels: Record<string, string> = {
  FUNDAMENTAL_INCOMPLETE: 'Ensino fundamental incompleto',
  FUNDAMENTAL_COMPLETE: 'Ensino fundamental completo',
  HIGH_SCHOOL_INCOMPLETE: 'Ensino médio incompleto',
  HIGH_SCHOOL_COMPLETE: 'Ensino médio completo',
  HIGHER_INCOMPLETE: 'Superior incompleto',
  HIGHER_COMPLETE: 'Superior completo',
};

export const HousingStatusLabels: Record<string, string> = {
  HAS_RESIDENCE: 'Tenho residência',
  HOMELESS: 'Estou em situação de rua',
};

export const WorkHistoryLabels: Record<string, string> = {
  NEVER: 'Nunca trabalhei',
  NOT_WORKING: 'Não estou trabalhando',
  WORKING: 'Estou trabalhando',
};

export const GenderLabels: Record<string, string> = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  OTHER: 'Outro',
};

export const SexualOrientationLabels: Record<string, string> = {
  HETERO: 'Heterossexual',
  LGBTQIA_PLUS: 'LGBTQIA+',
  PREFER_NOT_TO_SAY: 'Prefiro não informar',
};

export const RaceLabels: Record<string, string> = {
  WHITE: 'Branca',
  BLACK: 'Preta',
  YELLOW: 'Amarela',
  BROWN: 'Parda',
  INDIGENOUS: 'Indígena',
};

export const DisabilitiesLabels: Record<string, string> = {
  NONE: 'Não tem deficiência',
  HEARING: 'Auditiva',
  SPEECH: 'Fala',
  PHYSICAL: 'Física',
  INTELLECTUAL: 'Intelectual',
  MULTIPLE: 'Múltipla',
  PSYCHOSOCIAL: 'Psicossocial',
  VISUAL: 'Visual',
  OTHER: 'Outras',
};

export const DiscoveredViaLabels: Record<string, string> = {
  PREFEITURA: 'No site da Prefeitura de São Paulo',
  CATE_UNIT: 'Em uma unidade do Cate',
  SOCIAL: 'Em redes sociais',
  MEDIA: 'Em propagandas/notícias (TV ou rádio)',
  GOV_INSTITUTIONS: 'Em instituições do governo (CRAS, UBS, etc.)',
  NGOS: 'Em instituições não governamentais / ONGs',
  FAMILY: 'Por meio de parentes, amigos ou vizinhos',
  UNICEF: 'Pela Unicef',
  MICROSOFT: 'Pela Microsoft',
  OTHER: 'Outros',
};

export const SocialProgramLabels: Record<string, string> = {
  POT_GAE: 'POT GAE',
  POT_ABAE: 'POT ABAE',
  BOLSA_JOVEM: 'Bolsa Jovem',
  BOLSA_TECH: 'Bolsa Tech',
  TEM_SAIDA: 'Tem Saída',
  NONE: 'Não participo de nenhum programa',
  OTHER: 'Outros',
};

export const InterestCategoryLabels: Record<string, string> = {
  CREATIVE_ECONOMY: 'Economia criativa',
  GASTRONOMY: 'Gastronomia',
  MANAGEMENT_WORK: 'Gestão, Empreendedorismo e Trabalho',
  ENVIRONMENT: 'Meio Ambiente e Sustentabilidade',
  HEALTH: 'Saúde e Bem-Estar',
  TECHNOLOGY: 'Tecnologia',
};

/**
 * Generic helper: given a mapping and a value, return a human label.
 * Falls back to the raw value or a provided fallback string.
 */
export function labelFor(
  mapping: Record<string, string>,
  value?: string | null,
  fallback = 'Não informado'
) {
  if (!value) return fallback;
  return mapping[value] ?? value;
}
