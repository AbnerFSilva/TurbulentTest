import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  date: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
