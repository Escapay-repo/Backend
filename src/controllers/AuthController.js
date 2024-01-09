import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

class AuthController {
  constructor() { }
  generateToken(user) {
    const token = jwt.sign({ userId: user._id, admin: user.admin }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
  }
}

export default new AuthController();