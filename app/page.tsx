"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Briefcase, MapPin, DollarSign, Clock, GraduationCap, AlertCircle } from "lucide-react"
import { RegistrationForm, OPTIONS } from "@/formSchema"
import Link from "next/link"
import { JobData, ApiResponse } from "./types"
import {
  labelFor,
  EducationLevelLabels,
  NationalityLabels,
  HousingStatusLabels,
  GenderLabels,
  WorkHistoryLabels,
  SexualOrientationLabels,
  RaceLabels,
  DisabilitiesLabels,
  DiscoveredViaLabels,
  SocialProgramLabels,
  InterestCategoryLabels,
} from "@/lib/enumLabels"



// Using the RegistrationForm type inferred from the zod schema
// (imported above as RegistrationForm)

export default function JobSearchPage() {
  const [searchCode, setSearchCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userData, setUserData] = useState<RegistrationForm | null>(null)
  const [jobs, setJobs] = useState<JobData[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setError("Por favor, insira um código numérico")
      return
    }

    setLoading(true)
    setError("")
    setHasSearched(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user-cate?documentNumber=${searchCode}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error("Código não encontrado")
      }

      // Mock user data - conforms to RegistrationSchema (minimal example)
      setUserData(data)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar dados")
      setUserData(null)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const formatSalary = (salary: number, type: string, hidden: number) => {
    if (hidden === 1) return "A combinar"
    return `R$ ${salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${type === "monthly" ? "Mensal" : type})`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Consulta de Dados</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight">Consulte os Dados do Usuário</h2>
            <p className="text-lg text-muted-foreground">Insira o código numérico para visualizar as informações.</p>
          </div>

          {/* Search Form */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="search-code" className="mb-2 block text-sm font-medium">
               Identificação (CPF ou RNE)
              </label>
              <Input
                id="search-code"
                type="text"
                placeholder="Digite o código aqui"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-14 text-base"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading} className="h-14 px-8 text-base font-bold">
              {loading ? "Consultando..." : "Consultar"}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {hasSearched && !loading && (
            <>
              <div className="space-y-6">
                <h2 className="border-t border-border pt-8 text-2xl font-bold">Resultados da Busca</h2>

                {!userData ? (
                  <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
                    <Search className="mb-3 h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Os dados do usuário serão exibidos aqui após a consulta.</p>
                  </Card>
                ) : (
                  <Card className="border-border bg-muted/30 p-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                      <DataField label="Nome Completo" value={userData.name} />
                      <DataField label="E-mail" value={userData.email} />
                      <DataField label="Grau de Escolaridade" value={labelFor(EducationLevelLabels, userData.educationLevel)} />
                      <DataField label="Nacionalidade" value={labelFor(NationalityLabels, userData.nationality)} />
                      <DataField label="Situação de Moradia" value={labelFor(HousingStatusLabels, userData.housingStatus)} />
                      <DataField label="Gênero" value={labelFor(GenderLabels, userData.gender)} />
                      <DataField
                        label="Histórico de Trabalho"
                        value={labelFor(WorkHistoryLabels, userData.workHistory)}
                        className="md:col-span-2 lg:col-span-3"
                      />
                      <DataField label="Orientação Sexual" value={labelFor(SexualOrientationLabels, userData.sexualOrientation)} />
                      <DataField label="Raça / Cor" value={labelFor(RaceLabels, userData.race)} />
                      <DataField label="Deficiências" value={labelFor(DisabilitiesLabels, userData.disability)} />
                      <DataField label="Onde você nos conheceu?" value={labelFor(DiscoveredViaLabels, userData.discoveredVia)} />
                      <DataField
                        label="Programas Sociais"
                        value={(userData.socialPrograms || [])
                          .map(program => labelFor(SocialProgramLabels, program))
                          .join(", ")}
                        className="md:col-span-2 lg:col-span-2"
                      />
                      <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
                        <p className="text-sm font-medium text-muted-foreground">Interesses</p>
                        <div className="flex flex-col gap-2 pt-1">
                          {(() => {
                            const interestsObj = userData.interests || {}
                            const LABELS: Record<string, string> = {
                              creativeEconomy: labelFor(InterestCategoryLabels, 'CREATIVE_ECONOMY'),
                              gastronomy: labelFor(InterestCategoryLabels, 'GASTRONOMY'),
                              managementWork: labelFor(InterestCategoryLabels, 'MANAGEMENT_WORK'),
                              environment: labelFor(InterestCategoryLabels, 'ENVIRONMENT'),
                              health: labelFor(InterestCategoryLabels, 'HEALTH'),
                              technology: labelFor(InterestCategoryLabels, 'TECHNOLOGY'),
                            }

                            return Object.entries(interestsObj)
                              .filter(([, arr]) => Array.isArray(arr) && arr.length > 0)
                              .map(([key, arr]) => (
                                <div key={key}>
                                  <p className="text-sm font-semibold">{LABELS[key] ?? key}</p>
                                  <p className="text-base font-semibold">{(arr || []).join(", ")}</p>
                                </div>
                              ))
                          })()}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Recommended Jobs */}
              {jobs.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Vagas Recomendadas</h2>
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <Card key={job.id} className="border-border bg-muted/30 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-primary">{job.title}</h3>
                            <p className="text-base font-medium">{job.company.fantasy_name || job.company.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{job.job_location_string}</span>
                            </div>
                          </div>
                          <Link href={`https://cate.prefeitura.sp.gov.br/cate-vagas-admin/#/vagas/detalhes?id=${job.id}`}>
                          <Button className="w-full font-bold sm:w-auto">Ver Detalhes</Button>
                          </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-2 md:grid-cols-3">
                          <DataField
                            label="Salário"
                            value={formatSalary(job.salary, job.salary_type, job.hidden_salary)}
                            icon={<DollarSign className="h-4 w-4" />}
                          />
                          <DataField
                            label="Tipo de Contrato"
                            value={job.contract_type}
                            icon={<Clock className="h-4 w-4" />}
                          />
                          <DataField
                            label="Nível de Experiência"
                            value={job.experience_level.name}
                            icon={<Briefcase className="h-4 w-4" />}
                          />
                          <DataField
                            label="Nível de Escolaridade"
                            value={job.schooling_level.name}
                            icon={<GraduationCap className="h-4 w-4" />}
                          />
                          <DataField
                            label="Benefícios"
                            value={job.benefits.join(", ") || "Não informado"}
                            className="col-span-1 sm:col-span-2"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function DataField({
  label,
  value,
  icon,
  className = "",
}: {
  label: string
  value: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  )
}
