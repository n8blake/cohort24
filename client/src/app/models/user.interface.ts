export interface IUser {
    _id?: string;
    firstName: string;
    preferredName?: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    role: string;
    token?: string;
    userCreated?: Date;
    password?: string;
  }
  