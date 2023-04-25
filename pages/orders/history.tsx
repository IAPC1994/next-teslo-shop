import { ShopLayout } from '@/components/layouts';
import { Grid, Typography, Chip, Link, Button } from '@mui/material';
import { DataGrid, GridColDef,GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import NextLink from 'next/link';

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
                <NextLink href={`/orders/${ params.row.id }`} passHref legacyBehavior>
                    <Link underline='always'>
                        Order { params.row.id }
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows: GridRowsProp = [
    { id: 1, paid: true, fullname: 'Ivan Panussis' },
    { id: 2, paid: false, fullname: 'Ivan Panussis' },
    { id: 3, paid: true, fullname: 'Ivan Panussis' },
    { id: 4, paid: false, fullname: 'Ivan Panussis' },
    { id: 5, paid: false, fullname: 'Ivan Panussis' },
    { id: 6, paid: true, fullname: 'Ivan Panussis' },
];


const HistoryPage = () => {
  return (
    <ShopLayout title={'Order History'} pageDescription={'Order history of the customer'}>
        <Typography variant='h1' component='h1'>Order History</Typography>
    
        <Grid container>
            <Grid item xs={ 12 } sx={{ height:'650px', width:'100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSizeOptions={[5, 10, 25]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage;