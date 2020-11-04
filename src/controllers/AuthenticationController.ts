import { key } from '../config/jwtKey.json';
import jwt from 'jsonwebtoken';

export interface Context {
  userId: string;
}

class AuthenticationController {
  generateToken(userId: string) {
    const context: Context = {
      userId,
    };
    return jwt.sign({ data: context }, key);
  }

  validateToken(token: string): Context | false {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, key);
      if (decoded.data.userId) {
        return decoded.data;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}

export default new AuthenticationController();
