export interface EnvironmentVariables {
  env: string;
  appName: string;
  http: {
    port: number;
    host: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    synchronize: boolean;
    migrationsRun?: boolean;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  googleOAuth: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export const appConfig = (): EnvironmentVariables => ({
  env: process.env.NODE_ENV || 'dev',
  appName: process.env.APP_NAME || 'NestJS API Starter',

  http: {
    port: process.env.PORT ? +process.env.PORT : 3000,
    host: process.env.APP_HOST || 'localhost',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  },

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'nestjs',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'cloudName',
    apiKey: process.env.CLOUDINARY_API_KEY || 'apiKey',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'apiSecret',
  },
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'clientId',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'callbackUrl',
  },
});
