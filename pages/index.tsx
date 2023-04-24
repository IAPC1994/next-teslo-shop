import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";

import { initialData } from '../database/products';
import { ProductList } from "@/components/products";

const Home:NextPage = () => {
  return (
    <ShopLayout title={"Teslo-Shop - Home"} pageDescription={"Find the best products of Teslo here..."}>
      <Typography variant="h1" component='h1'>Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>All the products</Typography>
    
      <ProductList 
        products={ initialData.products as any }
      />

    </ShopLayout>
  )
}

export default Home;
