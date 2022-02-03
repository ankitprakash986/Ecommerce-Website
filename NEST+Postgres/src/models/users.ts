import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {
  

  @PrimaryGeneratedColumn()
  _id: number;

  @Column({type:'text'})
  isSeller: string;

  @Column({type:'text'})
  name: string;

  @Column({type:'text'})
  email: string;

  @Column({type:'text'})
  password: string;

  @Column({type:'text'})
  picture: string;

  @Column({type:'text'})
  __v: string;

  @Column({type:'text'})
  'address.addr1': string;

  @Column({type:'text'})
  'address.addr2': string;

  @Column({type:'text'})
  'address.city': string;

  @Column({type:'text'})
  'address.state': string;

  @Column({type:'text'})
  'address.postalCode': string;

  @Column({type:'text'})
  'address.country': string;
}