import useSWR from 'swr';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

import { AdminLayout } from '@/components/layouts'
import { IOrder, IUser } from '@/interfaces';

const columns:GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'total', headerName: 'Total', width: 300 },
    { field: 'isPaid', headerName: 'Paid', renderCell: ({ row }:GridRenderCellParams) => {
        return row.isPaid 
            ? (<Chip variant='outlined' label='Paid' color='success' />)
            : (<Chip variant='outlined' label='Pending' color='error' />)
    }, width: 300 },
    { field: 'numberProducts', headerName: 'N° Products', align: 'center', width: 150 },
    { field: 'check', headerName: 'See Order', renderCell: ({ row }:GridRenderCellParams) => {
        return (
            <a href={`/admin/orders/${ row.id }`} target='_blank' rel='noreferrer'>See Order</a>
        )
    }, width: 300 },
    { field: 'createdAt', headerName: 'Created At', width: 300 },
];

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if( !data && !error ) return (<></>);

    const rows = data!.map( order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        numberProducts: order.numberOfItems,
        createdAt: order.createdAt,
    }));

    return (
        <AdminLayout 
            title={'Orders'} 
            subTitle={'Order maintenance'}
            icon={ <ConfirmationNumberOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={ 12 } sx={{ height:'650px', width:'100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default OrdersPage;