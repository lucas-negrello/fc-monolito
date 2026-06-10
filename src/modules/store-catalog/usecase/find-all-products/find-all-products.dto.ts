export interface FindAllProductsInputDto {}

export interface FindAllProductsOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salePrice: number;
    }[];
}