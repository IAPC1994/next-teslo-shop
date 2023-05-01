import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SummaryTile } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { DashboardSummaryResponse } from '@/interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
        refreshInterval: 30 * 1000,
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn-1 : 30 );
      },1000 );

      return () => clearInterval( interval );
    }, []);
    

    if( !error && !data ){
        return <></>;
    }

    if( error ){
        console.log(error);
        return <Typography>Error uploading information</Typography>;
    }

    const{
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        noPaidOrders,
        productsWithNoInventory,
        productsWithLowInventory,
    } = data!;

    return (
        <AdminLayout 
            title={'Dashboard'} 
            subTitle={'General statistics'} 
            icon={ <DashboardOutlined />}
        >
            <Grid container spacing={ 2 }>
                <SummaryTile 
                    title={ numberOfOrders }
                    subTitle='Total orders'
                    icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ paidOrders }
                    subTitle='Paid orders'
                    icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ noPaidOrders }
                    subTitle='Pending orders'
                    icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ numberOfClients }
                    subTitle='Customers'
                    icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ numberOfProducts }
                    subTitle='Products'
                    icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ productsWithNoInventory }
                    subTitle='Out of Stock'
                    icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ productsWithLowInventory }
                    subTitle='Low Inventory'
                    icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile 
                    title={ refreshIn }
                    subTitle='Update in: '
                    icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} /> }
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage