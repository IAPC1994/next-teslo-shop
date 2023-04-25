import { AuthLayout } from '@/components/layouts'
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <Typography variant='h1' component='h1'>Login</Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField 
                        label='Email'
                        variant='filled'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField 
                        label='Password'
                        variant='filled'
                        type='password'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Button color='secondary' className='circular-btn' size='large' fullWidth>Login</Button>
                </Grid>
                <Grid item xs={ 12 } display='flex' justifyContent='end'>
                    <NextLink href='/auth/register' passHref legacyBehavior>
                        <Link underline='always'>
                            ¿Don't have an account?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default LoginPage;