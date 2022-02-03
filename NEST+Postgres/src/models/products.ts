import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class products {
  

  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  reviews__id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;
  
  @Column()
  __v: number;

  @Column()
  isDeleted: boolean;

  @Column()
  quantity: number;

  @Column()
  category__id: number;
}