import { useState, useMemo } from 'react';
import { IProducts } from "@/interfaces";
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';

interface Props{
    product: IProducts;
}

export const ProductCard = ({ product }:Props) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `products/${ product.images[1] }`
            : `products/${ product.images[0] }`
    }, [isHovered, product.images]);
    
    return(
        <Grid 
            item 
            xs={ 6 } 
            sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
            <CardActionArea>
                <CardMedia
                component='img'
                className='fadeIn'
                image={ productImage }
                alt={ product.title }
                />
            </CardActionArea>
            </Card>

            <Box sx={{ mt: 1 }} className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={500}>${ product.price }</Typography>
            </Box>

        </Grid>
    );
}