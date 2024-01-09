import dotenv from 'dotenv'

dotenv.config();

class JwtConfig {
  constructor() {
    this.secret = process.env.JWT_SECRET
    this.expiresIn = '1d';
  }
}

export default new JwtConfig();