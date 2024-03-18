export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token?: string;
    userCreated?: Date;
    password?: string;
  }
  