const jwt = require('jsonwebtoken');
const config = require('../config');
const Usuario = require('../models/Usuario');

class AuthController {
  // Login de usuario
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const usuario = await Usuario.findByEmail(email);
      
      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Verificar si el usuario está activo
      if (!usuario.activo) {
        return res.status(401).json({
          success: false,
          message: 'Usuario inactivo'
        });
      }

      // Verificar password
      const isValidPassword = await Usuario.verifyPassword(password, usuario.password);
      
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Actualizar último login
      await Usuario.updateLastLogin(usuario.id);

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          email: usuario.email, 
          rol: usuario.rol 
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Respuesta sin password
      const { password: _, ...usuarioSinPassword } = usuario;

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          usuario: usuarioSinPassword,
          token
        }
      });

    } catch (error) {
      next(error);
    }
  }

  // Verificar token y devolver usuario actual
  async verify(req, res, next) {
    try {
      // El middleware de auth ya validó el token y agregó el usuario al request
      const { password: _, ...usuarioSinPassword } = req.user;

      res.json({
        success: true,
        message: 'Token válido',
        data: {
          usuario: usuarioSinPassword
        }
      });

    } catch (error) {
      next(error);
    }
  }

  // Cambiar password
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Obtener usuario actual
      const usuario = await Usuario.findById(userId);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Verificar password actual
      const isValidPassword = await Usuario.verifyPassword(currentPassword, usuario.password);
      
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'Password actual incorrecto'
        });
      }

      // Actualizar password
      await Usuario.update(userId, { password: newPassword });

      res.json({
        success: true,
        message: 'Password actualizado correctamente'
      });

    } catch (error) {
      next(error);
    }
  }

  // Actualizar perfil del usuario autenticado
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { nombre, email } = req.body;

      // Verificar si el email ya existe (excluyendo el usuario actual)
      if (email !== req.user.email) {
        const existeEmail = await Usuario.findByEmail(email);
        if (existeEmail && existeEmail.id !== userId) {
          return res.status(409).json({
            success: false,
            message: 'El email ya está en uso'
          });
        }
      }

      // Actualizar usuario
      const usuarioActualizado = await Usuario.update(userId, {
        nombre,
        email
      });

      const { password: _, ...usuarioSinPassword } = usuarioActualizado;

      res.json({
        success: true,
        message: 'Perfil actualizado correctamente',
        data: usuarioSinPassword
      });

    } catch (error) {
      next(error);
    }
  }

  // Logout (en el frontend se elimina el token)
  async logout(req, res) {
    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  }
}

module.exports = new AuthController();