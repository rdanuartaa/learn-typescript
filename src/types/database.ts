export interface DbProject {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  href?: string | null;
  order_index: number;
  title_en?: string | null;
  description_en?: string | null;
  created_at?: string;
}

export interface DbExperience {
  id: string;
  period: string;
  role: string;
  description: string;
  details: string[];
  order_index: number;
  period_en?: string | null;
  role_en?: string | null;
  description_en?: string | null;
  details_en?: string[] | null;
  created_at?: string;
}

export interface DbCvSetting {
  id: string;
  cv_url: string;
  cv_filename: string;
  updated_at?: string;
}

export interface PortfolioData {
  projects: DbProject[];
  experiences: DbExperience[];
  cv: DbCvSetting | null;
}
