import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthDb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  email: string;

  @Column({ length: 61, nullable: false })
  password: string;
}
