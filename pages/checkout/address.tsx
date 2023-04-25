import { ShopLayout } from "@/components/layouts";
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';

const AddressPage = () => {
    return(
        <ShopLayout title={"Address"} pageDescription={"Confirm destination address"}>
            <Typography variant='h1' component='h1'>
                Address
            </Typography>
            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Name'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Last Name'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Address'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Address 2'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Postal Code'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='City'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <FormControl fullWidth>
                        <Select
                            variant="filled"
                            label='Country'
                            value={ 1 }
                        >
                            <MenuItem value={ 1 }>Chile</MenuItem>
                            <MenuItem value={ 2 }>Ireland</MenuItem>
                            <MenuItem value={ 3 }>Germany</MenuItem>
                            <MenuItem value={ 4 }>Spain</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField 
                        label='Phone number'
                        variant="filled"
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button color="secondary" className='circular-btn' size="large">
                    Checkout order
                </Button>
            </Box>
        </ShopLayout>
    );
}

export default AddressPage;