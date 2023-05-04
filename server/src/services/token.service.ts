import jwt from 'jsonwebtoken';
import { UserRole } from '../types/role';
import expiresAuth from '../constants/expiresAuth';

class TokenService {
  async generateTokens(
    payload: { _id: string; role: UserRole },
    accessTokenTime: string = expiresAuth.expiresAccessToken,
    refreshTokenTime: string = expiresAuth.expiresRefreshToken
  ) {
    const accessToken = await jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || '',
      {
        expiresIn: accessTokenTime,
      }
    );
    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '',
      { expiresIn: refreshTokenTime }
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async validateAccessToken(accessToken) {
    try {
      const userData = await jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET || ''
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
