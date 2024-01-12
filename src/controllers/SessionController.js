import User from "../models/UserModel.js";
import AuthController from "./AuthController.js";

class SessionController {
  async userCreate(req, res) {
    const { name, email, password, admin } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      }

      const newUser = await User.create({ name, email, password, admin, active: false });

      return res.json({ user: newUser });
    } catch (error) {
      console.error('Erro durante o registro:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async userLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Email ou senha incorreta.' });
      }
      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Email ou senha incorreta.' });
      }

      if (!password) {
        return res.status(400).json({ error: 'A senha é obrigatória.' });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = AuthController.generateToken(user);

      return res.json({
        user,
        admin: user.admin,
        token,
        active: user.active,
        dateLogin: user.lastLogin,
      });

    } catch (error) {
      console.error('Erro durante o login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async userLogout(req, res) {
    try {
      return res.json({ message: 'Logout bem-sucedido.' });
    } catch (error) {
      console.error('Erro durante o logout:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async getUserDetails(req, res) {
    try {
      const user = req.user;
      console.log('req session user', req.user);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json({ user });

    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }
    // Verificar se a senha atual fornecida corresponde à senha armazenada
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    // Verificar se a nova senha é diferente da senha atual
    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'A nova senha não pode ser igual à senha atual.' });
    }
    // Atualizar a senha do usuário
    user.password = newPassword;
    await user.save();

    return res.json({ message: 'Senha alterada com sucesso.' });
  }

  async changeEmail(req, res) {
    const { newEmail } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Verificar se o novo email já está sendo usado por outro usuário
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    // Atualizar o email do usuário
    user.email = newEmail;
    await user.save();

    return res.json({ message: 'Email alterado com sucesso.' });
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.error('Erro ao obter todos os usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteUser(req, res) {
    const userId = req.params._id;
    try {
      await User.findByIdAndDelete(userId);
      return res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async toggleUserStatus(req, res) {
    const userId = req.params._id;
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      user.active = !user.active; // Inverte o status
      await user.save();

      return res.json({ message: `Usuário ${user.active ? 'ativado' : 'desativado'} com sucesso.` });
    } catch (error) {
      console.error(`Erro ao ativar/desativar o usuário:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }


}

export default new SessionController()