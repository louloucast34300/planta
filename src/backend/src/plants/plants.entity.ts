import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Specie } from '../species/species.entity.js';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relation vers l'espèce de la plante 
  @ManyToOne(() => Specie, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'specieId' })
  specie: Specie | null;

  @Column({ type: 'uuid', nullable: true })
  specieId: string | null;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  purchase: Date | null;

  @Column({ type: 'varchar', nullable: true })
  featuredImage: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
