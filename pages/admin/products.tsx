import NextLink from 'next/link';
import useSWR from 'swr';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';

import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces';

const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Image',
        renderCell: ({ row }:GridRenderCellParams ) => {
            return (
                <a href={`/product/${ row.slug }`} target='_blank' rel='noreferrer'>
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ row.img }
                        sx={{ width: '60%', height: '60%', borderRadius: 50, boxShadow: 3 }}
                    />
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}:GridRenderCellParams) => {
            return(
                <NextLink href={`/admin/products/${ row.slug }`} passHref legacyBehavior>
                    <Link underline='always'>
                        { row.title }
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Gender'},
    { field: 'type', headerName: 'Type'},
    { field: 'inStock', headerName: 'In Stock'},
    { field: 'Price', headerName: 'Price'},
    { field: 'sizes', headerName: 'Sizes', width: 250 },
];

const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if( !data && !error ) return (<></>);

    const rows = data!.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        Price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));

    return (
        <AdminLayout 
            title={`Products (${ data?.length })`} 
            subTitle={'Products maintenance'}
            icon={ <CategoryOutlined />}
        >
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
                <Button
                    startIcon={ <AddOutlined /> }
                    color='secondary'
                    href='/admin/products/new'
                >
                    Create Product
                </Button>
            </Box>
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

export default ProductsPage;