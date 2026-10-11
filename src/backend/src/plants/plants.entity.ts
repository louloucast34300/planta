import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
