
import { Address } from "./address.model";
import { Role } from "./user.mode";

export interface UserRequest {
  fullName: string;
  email: string;
  phone: string;
  password?: string; // create may need password; edit optional
  role: Role;
  addresses: Address[]; // backend expects AddressRequestDTO shape similar
}