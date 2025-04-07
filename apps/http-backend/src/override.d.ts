import { Profile } from 'passport';
declare global {
  namespace Express {
    interface User extends Profile {}
  }
}
