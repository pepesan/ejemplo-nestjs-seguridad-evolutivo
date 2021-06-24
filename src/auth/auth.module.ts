import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { LocalStrategyService } from './strategies/local-strategy.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './strategies/jwt-strategy.service';
import { SessionSerializer } from './session.serializer';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategyService,
    JwtStrategyService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
