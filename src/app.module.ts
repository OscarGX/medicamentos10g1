import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoModule } from './app/estado/estado.module';
import { MapperModule } from './common/mapper/mapper.module';
import { PerfilModule } from './app/perfil/perfil.module';
import { AuthModule } from './app/auth/auth.module';
import { UsuarioModule } from './app/usuario/usuario.module';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE_NAME,
} from './config/constants.config';
import { PaisModule } from './app/pais/pais.module';
import { CapacitacionModule } from './app/capacitacion/capacitacion.module';
import { FarmaciaModule } from './app/farmacia/farmacia.module';
import { MunicipioModule } from './app/municipio/municipio.module';
import { ColoniaModule } from './app/colonia/colonia.module';
import { MedicamentoModule } from './app/medicamento/medicamento.module';
import { PagoModule } from './app/pago/pago.module';
import { OrdenModule } from './app/orden/orden.module';
import { OrdenDetalleModule } from './app/orden-detalle/orden-detalle.module';

@Module({
  imports: [
    AuthModule,
    PaisModule,
    EstadoModule,
    MunicipioModule,
    ColoniaModule,
    MapperModule,
    PerfilModule,
    UsuarioModule,
    FarmaciaModule,
    MedicamentoModule,
    CapacitacionModule,
    OrdenModule,
    OrdenDetalleModule,
    PagoModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DATABASE_HOST),
        port: configService.get<number>(DATABASE_PORT),
        username: configService.get<string>(DATABASE_USERNAME),
        password: configService.get<string>(DATABASE_PASSWORD),
        database: configService.get<string>(DATABASE_DATABASE_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
