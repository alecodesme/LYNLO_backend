export interface AppConfig {
  environment: string;
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    databaseName: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default (): AppConfig => ({
  environment: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    databaseName: process.env.DATABASE_NAME ?? 'crm_ventas',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret-not-safe-for-production',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
});