/**
* Database entity for the product table.
• id: número entero (auto-incremental, clave primaria)
• nombre: cadena de texto (no nulo)
• descripción: cadena de texto (opcional)
• precio: número decimal (no nulo)
• cantidad: número entero (no nulo)
• fecha_creacion: fecha y hora (auto-generada, no nulo)
• fecha_actualizacion: fecha y hora (auto-generada, no nulo)
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', nullable: false })
  precio: number;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'fecha_creacion',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'fecha_actualizacion',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_actualizacion: Date;
}
