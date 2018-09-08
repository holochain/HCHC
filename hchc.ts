
export interface CreateAppParams {
  title: string;
  description?: string;
  thumbnail?: string;
}

export interface CodeParams {
  dna: string;
  test: string;
}

export interface UiSkinParams {
  title: string;
  link: string;
  author:string;
  thumbnail?:string;
}
