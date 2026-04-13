import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

interface KeycloakJwtPayload {
  sub: string;
  email: string;
  groups?: string[];
  user_type?: string;
  realm_access?: { roles: string[] };
  scope?: string;
}

export interface AuthenticatedUser {
  sub: string;
  email: string;
  groups: string[];
  userType: string | undefined;
  realmRoles: string[];
  scope: string | undefined;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: configService.getOrThrow<string>('KEYCLOAK_AUDIENCE'),
      issuer: configService.getOrThrow<string>('KEYCLOAK_ISSUER'),
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.getOrThrow<string>('KEYCLOAK_JWKS_URI'),
      }),
    });
  }

  validate(payload: KeycloakJwtPayload): AuthenticatedUser {
    return {
      sub: payload.sub,
      email: payload.email,
      groups: payload.groups ?? [],
      userType: payload.user_type,
      realmRoles: payload.realm_access?.roles ?? [],
      scope: payload.scope,
    };
  }
}
