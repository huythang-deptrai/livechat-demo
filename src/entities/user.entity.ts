import { IUser } from 'src/interfaces/user.interface';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'
import { Conversation } from './conversation.entity';
import { Information } from './information.entity';
import { Message } from './message.entity';
import { Profile } from './profile.entity';
import { UserConversation } from './user-conversation.entity';

@Entity({name: 'users'})
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({length: 25, nullable: true})
  name: string;

  @Column({unique: true, length: 255})
  email: string;

  @Column({name: 'password', length: 255})
  password: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp', nullable: true})
  createdAt: Date;

  @CreateDateColumn({name: 'updated_at', type: 'timestamp', nullable: true})
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversation?: UserConversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];
  

  @OneToMany(() => Information, (information) => information.user, {
    eager: true,
  })
  information?: Information[];

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];
}