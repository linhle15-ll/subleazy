export interface Base {
  _id?: string;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Result<T> {
  success: boolean;
  data: T | string;
}
