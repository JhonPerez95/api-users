export const configLoader = () => {
  return {
    environment: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    dbMysql: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  };
};
