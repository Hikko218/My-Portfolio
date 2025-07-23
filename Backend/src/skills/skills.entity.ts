import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill: string;

  @Column()
  level: number;
}
