import { IInformation, TypeInformation } from 'src/interfaces/information.interface';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity';
@Entity({name: 'information'})
export class Information implements IInformation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({name: 'user_id', nullable: true})
  user_id: string | number;

  @Column({name: 'status', default: false})
  status: boolean;

  @Column({name: 'type'})
  type: TypeInformation;

  @Column({name: 'value', length: 255})
  value: string;

  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
