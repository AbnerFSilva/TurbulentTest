import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  email: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
