import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from '@mui/material';

const MenPage:NextPage = () => {

    const { products, isLoading } = useProducts('/products/?gender=men');

    return (
        <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Find the best products for men by Teslo Shop'}>
            <Typography variant="h1" component='h1'>Men section</Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>Products for men</Typography>
        
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products }/>
            }   
        </ShopLayout>
    )
}

export default MenPage;