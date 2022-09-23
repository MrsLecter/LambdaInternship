import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TokensDb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 61, nullable: false })
  token: string;
}
