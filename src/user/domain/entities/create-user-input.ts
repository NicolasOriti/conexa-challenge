export interface CreateUserInput {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  isActive?: boolean;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
