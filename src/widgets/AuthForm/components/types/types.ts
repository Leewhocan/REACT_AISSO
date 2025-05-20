export type AuthType = "auth" | "login";

export interface IFormInput {
  language: IselectedLanguage;
  email: string;
  password: string;
  name: string;
  role?: "IMPORTER" | "EXPORTER";
}

export interface IAuthForm {
  email: string;
  password: string;
  name?: string;
  role?: "IMPORTER" | "EXPORTER";
}

export type IselectedLanguage = "RU" | "EN" | "CN";
