import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ipAddress: string;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'boolean' })
  isSuccess: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
