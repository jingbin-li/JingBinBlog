const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_NAME: database,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
} = process.env;
export const DATABASE_CONFIG = {
  url: `mongodb://${username}:${password}@${host}:${port}/${database}`,
};

