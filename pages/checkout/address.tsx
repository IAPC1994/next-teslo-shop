import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Typography, Grid, TextField, FormControl, MenuItem, Box, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { ShopLayout } from "@/components/layouts";
import { countries } from '@/utils';
import { useForm } from 'react-hook-form';
import { CartContext } from '@/context';


type FormData = {
    name        : string;
    lastName    : string;
    address     : string;
    address2    : string;
    zip         : string;
    city        : string;
    country     : string;
    phoneNumber : string;
}

const getAddressFromCookies = ():FormData => {
    return {
        name       : Cookies.get('name') || '',
        lastName   : Cookies.get('lastName') || '',
        address    : Cookies.get('address') || '',
        address2   : Cookies.get('address2') || '',
        zip        : Cookies.get('zip') || '',
        city       : Cookies.get('city') || '',
        country    : Cookies.get('country') || '',
        phoneNumber: Cookies.get('phoneNumber') || '',
    }
}


const AddressPage = () => {
    
    const { updateAddress } = useContext(CartContext);
    const router = useRouter();

    const { register , handleSubmit,formState:{ errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitAddress = ( { name, lastName, address, address2, zip, city, country, phoneNumber }:FormData ) => {
        updateAddress({ name, lastName, address, address2, zip, city, country, phoneNumber });
        router.push('/checkout/summary');
    }

    return(
        <ShopLayout title={"Address"} pageDescription={"Confirm destination address"}>
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Typography variant='h1' component='h1'>
                    Address
                </Typography>
                <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Name'
                            variant="filled"
                            fullWidth
                            {
                                ...register('name',{
                                    required: 'The name is required',
                                })
                            }
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Last Name'
                            variant="filled"
                            fullWidth
                            {
                                ...register('lastName',{
                                    required: 'The last name is required',
                                })
                            }
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Address'
                            variant="filled"
                            fullWidth
                            {
                                ...register('address',{
                                    required: 'The address is required',
                                })
                            }
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Address 2'
                            variant="filled"
                            fullWidth
                            {
                                ...register('address2')
                            }
                            error={ !!errors.address2 }
                            helperText={ errors.address2?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Postal Code'
                            variant="filled"
                            fullWidth
                            {
                                ...register('zip',{
                                    required: 'The postal code is required',
                                })
                            }
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='City'
                            variant="filled"
                            fullWidth
                            {
                                ...register('city',{
                                    required: 'The city is required',
                                })
                            }
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label='Country'
                                defaultValue={ Cookies.get('country') || countries[0].code }
                                {
                                    ...register('country',{
                                        required: 'The country is required',
                                    })
                                }
                                error={ !!errors.country }
                                helperText={ errors.country?.message }
                            >
                                {
                                    countries.map( country => 
                                        <MenuItem key={ country.code } value={ country.code }>{ country.name }</MenuItem>
                                    )
                                }

                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Phone number'
                            variant="filled"
                            fullWidth
                            {
                                ...register('phoneNumber',{
                                    required: 'The phone number is required',
                                })
                            }
                            error={ !!errors.phoneNumber }
                            helperText={ errors.phoneNumber?.message }
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type='submit' color="secondary" className='circular-btn' size="large">
                        Checkout order
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    );
}

export default AddressPage;