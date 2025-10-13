import { AddressResponse } from "./address.model";

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  isActive: boolean;
  addresses: AddressResponse[];
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR'
}