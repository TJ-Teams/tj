import {
  AuthResponseDto,
  LoginDto,
  RegisterDto,
  UserInfo,
  UserInfoDto,
} from '~/types/user';
import { AUTH_STORAGE_KEY } from '~/utils/AuthProvide';
import safelyLocalStorage from '~/utils/safely-local-storage';
import BaseController from './BaseController';

export class UserController extends BaseController {
  async register(dto: RegisterDto): Promise<void> {
    const response = await this.post<AuthResponseDto, RegisterDto>(
      '/api/users/register',
      dto
    );

    safelyLocalStorage.set(AUTH_STORAGE_KEY, response.access_token);
  }

  async login(dto: LoginDto): Promise<void> {
    const response = await this.post<AuthResponseDto, LoginDto>(
      '/api/users/login',
      dto
    );

    safelyLocalStorage.set(AUTH_STORAGE_KEY, response.access_token);
  }

  async logout(): Promise<void> {
    await this.delete('/api/users/logout');

    safelyLocalStorage.remove(AUTH_STORAGE_KEY);
  }

  async getInfo(): Promise<UserInfo> {
    const response = await this.get<UserInfoDto>('/api/users/info');

    return {
      firstName: response.first_name,
      lastName: response.second_name,
      email: response.email,
    };
  }
}
