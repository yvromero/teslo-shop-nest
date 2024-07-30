import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '.';

@Entity({ name: 'product_images' })
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        ( product ) => product.images,
        { onDelete: 'CASCADE'}
    )

    @JoinColumn({ name: 'product_id'})
    product_id: Product
}