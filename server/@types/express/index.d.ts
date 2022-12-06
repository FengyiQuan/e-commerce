import { UserRole } from '../../enums/UserRole';
import mongoose from 'mongoose';
import { IUserModel } from '../../models/User';
import { Session } from 'express-session';
import { CartItem } from '../../models/Order';
export {};

declare global {
  namespace Express {
    interface User {
      id: mongoose.Types.ObjectId;
      username: string;
      roleType: UserRole;
      // cart: CartItem[];
    }
  }
}
declare module 'express-session' {
  interface Session {
    cart: CartItem[];
  }
}
