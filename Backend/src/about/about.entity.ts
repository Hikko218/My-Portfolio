import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
