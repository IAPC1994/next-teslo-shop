import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, Divider, CardContent, Box, Button, Link } from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartContext } from '@/context';
import { countries } from '@/utils';
import Cookies from 'js-cookie';

const SummaryPage = () => {
    const router = useRouter();
    const { shippingAddress, numberOfItems } = useContext(CartContext);

    useEffect(() => {
      if( !Cookies.get('name') ){
        router.push('/checkout/address');
      }
    }, [ router ]);
    

    if( !shippingAddress ){
        return <></>;
    }

    const { name, lastName, address, address2 = '', city, country, phoneNumber, zip } = shippingAddress;

    return(
        <ShopLayout title='Purchase summary' pageDescription='Summary of the order'>
            <Typography variant='h1' component='h1'>
                Summary of the order
            </Typography>
            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume ({ numberOfItems } { numberOfItems === 1 ? 'item' : 'items' })</Typography>
                            <Divider sx={{ my:1 }}/>
                            
                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Delivery Address</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always' >
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <Typography>{ name } { lastName }</Typography>
                            <Typography>{ address } { address2 ? `,${ address2 }` : '' }</Typography>
                            <Typography>{ city}, { zip }</Typography>
                            {/* <Typography>{ countries.find( c => c.code === country)?.name }</Typography> */}
                            <Typography>{ country }</Typography>
                            <Typography>{ phoneNumber }</Typography>
                            
                            <Divider sx={{ my:1 }}/>

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always' >
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirm Order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default SummaryPage;