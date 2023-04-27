import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";

import { ProductList } from "@/components/products";
import { useProducts } from '../hooks';
import { FullScreenLoading } from "@/components/ui";

const HomePage:NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={"Teslo-Shop - Home"} pageDescription={"Find the best products of Teslo here..."}>
      <Typography variant="h1" component='h1'>Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>All the products</Typography>
    
    {
      isLoading
        ? <FullScreenLoading />
        : <ProductList products={ products }/>
    }   
    </ShopLayout>
  )
}

export default HomePage;
