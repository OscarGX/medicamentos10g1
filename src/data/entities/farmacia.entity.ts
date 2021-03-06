import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direccion } from './direccion.entity';
import { Perfil } from './perfil.entity';
import { Medicamento } from './medicamento.entity';

@Entity('farmacias')
export class Farmacia {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 100,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 13,
  })
  rfc: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  telefono: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.farmacia)
  medicamentos: Medicamento[];

  @ManyToOne(() => Perfil, (perfil) => perfil.id, {
    nullable: false,
    cascade: ['insert', 'remove', 'update'],
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  perfil: Perfil;

  @ManyToOne(() => Direccion, (direccion) => direccion.id, {
    nullable: false,
    eager: true,
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  direccion: Direccion;
}
