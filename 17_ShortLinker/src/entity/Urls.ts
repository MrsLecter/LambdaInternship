import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UrlsDb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  url: string;

  @Column({ length: 255, nullable: false })
  url_shorted: string;
}
