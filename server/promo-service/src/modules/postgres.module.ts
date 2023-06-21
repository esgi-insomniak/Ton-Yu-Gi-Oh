import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import postgresDataSource from '../config/database';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await postgresDataSource.initialize();
        return postgresDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class PostgresModule {}
