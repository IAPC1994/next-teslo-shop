import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Typography, Grid, Card, Divider, CardContent, Box, Link, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '@/components/cart';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

interface Props {
    order: IOrder;
}

const OrderPage:NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return(
        <ShopLayout title='Summary of the order' pageDescription='Summary of the order'>
            <Typography variant='h1' component='h1'>
                Order: { order._id }
            </Typography>

            {
                order.isPaid
                    ?(
                        <Chip 
                            sx={{ my: 2 }}
                            label='Order already paid'
                            variant='outlined'
                            color='success'
                            icon={ <CreditScoreOutlined /> }
                        />
                    ):(
                        <Chip 
                            sx={{ my: 2 }}
                            label='Pending payment'
                            variant='outlined'
                            color='error'
                            icon={ <CreditCardOffOutlined /> }
                        />
                    )
            }
            
            <Grid container className='fadeIn'>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList products={ order.orderItems }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume ({ order.numberOfItems } { order.numberOfItems > 1 ? 'items' : 'item' })</Typography>
                            <Divider sx={{ my:1 }}/>
                            
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Delivery Address</Typography>
                            </Box>
                            
                            <Typography>{ shippingAddress.name } { shippingAddress.lastName }</Typography>
                            <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }` : '' }</Typography>
                            <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                            <Typography>{ shippingAddress.country }</Typography>
                            <Typography>{ shippingAddress.phoneNumber }</Typography>
                            
                            <Divider sx={{ my:1 }}/>
                            
                            <OrderSummary orderValues={ order }/>

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {
                                    order.isPaid
                                        ?(
                                            <Chip 
                                                sx={{ my: 2 }}
                                                label='Order already paid'
                                                variant='outlined'
                                                color='success'
                                                icon={ <CreditScoreOutlined /> }
                                            />
                                        ):(
                                            <h1>Pay</h1>
                                        )
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if( !session ){
        return {
            redirect: {
                destination: `/auth/login?p=/orders${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if( !order ){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if( order.user !== session.user._id ){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;