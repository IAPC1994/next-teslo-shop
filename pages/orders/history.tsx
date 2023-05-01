import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { Grid, Typography, Chip, Link, Button } from '@mui/material';
import { DataGrid, GridColDef,GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '@/components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

const columns:GridColDef[] = [
    {field: 'id', headerName:'ID', width: 100},
    {field: 'fullname', headerName:'Full name', width: 300},
    {
        field: 'paid', 
        headerName:'Paid', 
        description:'Shows if the order is paid or not',
        width: 200,
        renderCell: (params:GridRenderCellParams) => {
            return (
                params.row.paid 
                 ? <Chip color='success' label='Paid' variant='outlined' />
                 : <Chip color='error' label='Unpaid' variant='outlined' />
            )
        },
    },
    {
        field:'order',
        headerName:'See order',
        width: 200,
        sortable: false,
        renderCell: (params:GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${ params.row.orderId }`} passHref legacyBehavior>
                    <Link underline='always'>
                        Order { params.row.id }
                    </Link>
                </NextLink>
            )
        }
    }
];

interface Props {
    orders: IOrder[],
}

const HistoryPage:NextPage<Props> = ({ orders  }) => {
    
    const rows = orders.map( (order, i) => ({
        id: i + 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.name} ${ order.shippingAddress.lastName }`,
        orderId: order._id
    }));

    return (
        <ShopLayout title={'Order History'} pageDescription={'Order history of the customer'}>
            <Typography variant='h1' component='h1'>Order History</Typography>
        
            <Grid container className='fadeIn'>
                <Grid item xs={ 12 } sx={{ height:'650px', width:'100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if( !session ){
        return{
            redirect:{
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrderByUser( session.user._id );

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;