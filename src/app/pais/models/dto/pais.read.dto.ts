import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaisReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
