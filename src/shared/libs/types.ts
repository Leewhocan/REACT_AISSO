export interface ITnved {
  value: string;
  title: string;
  titleEn: string;
  titleCn: string;
  disabled: boolean;
  search: string;
}

export interface ITnvedExtended extends ITnved {
  alpha2: string;
  friend: boolean;
}

export interface IContract {
  id: number;
  authorId: number;
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
