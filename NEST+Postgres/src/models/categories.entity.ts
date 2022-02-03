import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class categories {
  

  @PrimaryGeneratedColumn()
  _id: number;

  @Column({type:'text'})
  name: string;
}