import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';
import UserModel from '../models/UserModel.js';
class AuthMiddleware {
  authenticateToken(req, res, next) {
    if (req.path === '/users/register' || req.path === '/users/login') {
      return next();
    }
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado.' });

    jwt.verify(token, jwtConfig.secret, async (err, decodedToken) => {
      if (err) return res.status(403).json({ error: 'Token inválido.' });

      const user = await UserModel.findById(decodedToken.userId);
      if (!user) return res.status(403).json({ error: 'Usuário não encontrado.' });

      req.user = user;
      next();
    });

    // jwt.verify(token, jwtConfig.secret, (err, user) => {
    //   if (err) return res.status(403).json({ error: 'Token inválido.' });

    //   req.user = user;
    //   next();
    // });
  }
}

export default new AuthMiddleware();