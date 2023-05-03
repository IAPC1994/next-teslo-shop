import { useEffect, useState } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';

import { DataGrid, GridColDef,GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';

import { AdminLayout } from '@/components/layouts';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/axiosApi';



const UsersPage = () => {
    
    const { data, error } = useSWR<IUser[]>('/api/admin/users');

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
      if( data ){
        setUsers(data);
      }
    }, [data]);
    

    if( !data && !error ) return (<></>);

    const onRoleChange = async( userId:string, newRole:string ) => {
        const previousUsers = users.map( user => ({ ...user }));

        const updatedUsers = users.map( user  => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers( updatedUsers );

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole });
            
        } catch (error) {
            setUsers( previousUsers );
            console.log(error);
            alert('The user role could not be updated')
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Name', width: 300 },
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 300,
            renderCell: ({ row }:GridRenderCellParams) => {

                return (
                    <Select
                        value={ row.role }
                        label='Role'
                        onChange={ ({ target }) => onRoleChange( row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'>ADMIN</MenuItem>
                        <MenuItem value='client'>CLIENT</MenuItem>
                        <MenuItem value='super-user'>SUPER USER</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name + ' ' + user.lastName,
        role: user.role
    }));

    return (
        <AdminLayout 
            title={'Users'} 
            subTitle={'User maintenance'}
            icon={ <PeopleOutline /> }
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

export default UsersPage;