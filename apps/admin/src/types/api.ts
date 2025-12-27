export type ApiCommonRequest = number[];

export interface CommonRowsResponse {
  rows: number;
}

export interface CommonRowsWithLocalesResponse {
  rows: number;
  locales: string[];
}

export interface CommonDetailWithLocalesResponse {
  id: number;
  locales: string[];
}
