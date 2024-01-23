import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'm_user' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', length: 200, nullable: true, type: 'varchar' })
  name: string;

  @Column({ name: 'first_name', length: 100, nullable: true, type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: true, type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', length: 100, type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'username', length: 100, type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', length: 100, type: 'varchar' })
  password: string;

  @Column({
    name: 'active',
    length: 1,
    nullable: true,
    default: 'Y',
    type: 'varchar',
  })
  active: string;

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertActions() {
    this.name = this.firstName + ' ' + this.lastName;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
