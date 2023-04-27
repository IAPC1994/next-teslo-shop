import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";

const KidPage:NextPage = () => {
  const { products, isLoading } = useProducts('/products/?gender=kid');

  return (
      <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Find the best products for kids by Teslo Shop'}>
          <Typography variant="h1" component='h1'>Kids section</Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>Products for kids</Typography>
      
          {
              isLoading
                  ? <FullScreenLoading />
                  : <ProductList products={ products }/>
          }   
      </ShopLayout>
  )
}

export default KidPage;