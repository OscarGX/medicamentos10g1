import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MunicipioReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
