import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, Card, Divider, CardContent, Box, Button, Link } from '@mui/material';
import NextLink from 'next/link';

const SummaryPage = () => {
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