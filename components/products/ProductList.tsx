import { IProduct } from '@/interfaces';
import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

interface Props{
    products: IProduct[];
}
export const ProductList = ({ products }:Props) => {
    return(
        <Grid container spacing={4}>
            {
                products.map( product => (
                    <ProductCard 
                        product={ product } 
                        key={ product.slug } 
                    />
                ))
            }
        </Grid>
    );
}