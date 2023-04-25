import NextLink from 'next/link';
import { ShopLayout } from "@/components/layouts";
import { Box, Typography, Link } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyPage = () => {
  return (
    <ShopLayout title="Empty Cart" pageDescription="There are not products in your shopping cart">
        <Box sx={{ flexDirection: { xs: 'column', sm:'row' } }} display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Your shopping cart is empty</Typography>
                <NextLink href='/' passHref legacyBehavior>
                    <Link typography='h4' color='secondary'>
                        Return
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage;