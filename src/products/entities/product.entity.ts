import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from '.';
import { User } from 'src/auth/entities/user.entity';


@Entity({ name: 'products'})
export class Product {

    @ApiProperty({
        example: '02e8d40e-b6fa-459a-834f-9b5c935702a9',
        description: 'Product id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id:string; 

    @ApiProperty({
        example: 'T-Shirt Alestorm',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: '0',
        description: 'Product price'
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Esternocleidomastoideo',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't-shirt_alestorm',
        description: 'Product slug - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M','L','XL'],
        description: 'Product sizes',
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'unisex',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['tshirt','bands','alestorm'],
        description: 'Product tags'
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];
    
    
    //images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product_id,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];
    

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User;


    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate() {

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }
}
