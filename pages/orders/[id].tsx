import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, Card, Divider, CardContent, Box, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const OrderPage = () => {
    return(
        <ShopLayout title='Summary of the order 213213213' pageDescription='Summary of the order'>
            <Typography variant='h1' component='h1'>
                Order: ABC123
            </Typography>

            {/* <Chip 
                sx={{ my: 2 }}
                label='Pending payment'
                variant='outlined'
                color='error'
                icon={ <CreditCardOffOutlined /> }
            /> */}

            <Chip 
                sx={{ my: 2 }}
                label='Order already paid'
                variant='outlined'
                color='success'
                icon={ <CreditScoreOutlined /> }
            />
            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume (3 products)</Typography>
                            <Divider sx={{ my:1 }}/>
                            
                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Delivery Address</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always' >
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <Typography>Ivan Panussis</Typography>
                            <Typography>313 Somewhere</Typography>
                            <Typography>Stittsville, HYA 235</Typography>
                            <Typography>Canada</Typography>
                            <Typography>+1 3213212313</Typography>
                            
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
                                {/* TODO: */}
                                <h1>Pay</h1>
                                <Chip 
                                    sx={{ my: 2 }}
                                    label='Order already paid'
                                    variant='outlined'
                                    color='success'
                                    icon={ <CreditScoreOutlined /> }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default OrderPage;