import {
  Controller,
  Post,
  UseGuards,
  Request,
  Session,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthenticatedGuard } from '../authenticated.guard';
import { LoginGuard } from '../login.guard';
import { Role } from '../role.enum';
import { Roles } from '../roles.decorator';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req, @Session() session: Record<string, any>) {
    const response = await this.authService.login(req.user);
    session.user = response.payload;
    return { access_token: response.access_token };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get('miguard')
  @UseGuards(AuthenticatedGuard)
  getGuard() {
    return 'logueado';
  }

  @Get('roles')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.Admin)
  getRole(@Request() req) {
    const roles = req.user.roles;
    console.log(roles);
    return roles;
  }
}
