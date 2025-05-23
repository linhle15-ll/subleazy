export interface Base {
  _id?: string;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
