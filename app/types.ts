"use client";

export type JobData = {
  id: number;
  title: string;
  company: {
    id: number;
    name: string;
    fantasy_name: string;
  };
  salary: number;
  salary_type: string;
  hidden_salary: number;
  contract_type: string;
  benefits: string[];
  experience_level: {
    id: number;
    name: string;
  };
  schooling_level: {
    id: number;
    name: string;
  };
  occupation: {
    id: number;
    name: string;
  };
  job_location_string: string;
  description?: string;
  available_seats: number;
};
export type ApiResponse = {
  current_page: number
  data: JobData[]
  total: number
  per_page: number
  sum_total_jobs: string
  next_page_url: string | null
}