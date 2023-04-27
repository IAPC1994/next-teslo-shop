import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { Typography } from '@mui/material';
import { useProducts } from '@/hooks';


const WomenPage:NextPage = () => {
  const { products, isLoading } = useProducts('/products/?gender=women');

  return (
      <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Find the best products for women by Teslo Shop'}>
          <Typography variant="h1" component='h1'>Women section</Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>Products for women</Typography>
      
          {
              isLoading
                  ? <FullScreenLoading />
                  : <ProductList products={ products }/>
          }   
      </ShopLayout>
  )
}

export default WomenPage;