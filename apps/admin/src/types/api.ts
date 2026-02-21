export type ApiCommonRequest = number[];

export interface CommonRowsResponse {
  rows: number;
}

export interface CommonRowsAndLocalesResponse {
  rows: number;
  locales: string[];
}

export interface CommonIdsResponse {
  ids: number[];
}

export interface CommonIdAndLocalesResponse {
  id: number;
  locales: string[];
}
