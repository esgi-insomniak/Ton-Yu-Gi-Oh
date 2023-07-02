import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfilePicture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  path: string;
}
