import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { AuthLayout } from "@/components/layouts";
import { useForm } from 'react-hook-form';
import { validations } from "@/utils";
import { tesloApi } from "@/api";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "@/context";

type FormData = {
    name    : string,
    lastName: string,
    password: string,
    email   : string,
}

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState:{ errors } } = useForm<FormData>();

    const onRegisterForm = async( { email, lastName, name, password }:FormData ) => {
        setShowError(false);
        const { hasError, message } = await registerUser( name, lastName, email, password );
        
        if( hasError ) {
            setErrorMessage( message! );
            setShowError(true);
            setTimeout( () => setShowError(false), 3000);
            return;
        }
        
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
    }   

    return (
        <AuthLayout title={'Register'}>
            <form onSubmit={ handleSubmit( onRegisterForm )} noValidate>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1'>Register Form</Typography>
                        </Grid>
                        <Chip
                            label='Error in the register, please contact support'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Name'
                                variant='filled'
                                fullWidth
                                {...register("name",{
                                    required: 'The name is required',
                                    minLength: { value: 2, message: 'At least 2 characters ' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Last Name'
                                variant='filled'
                                fullWidth
                                {...register("lastName",{
                                    required: 'The last name is required',
                                    minLength: { value: 2, message: 'At least 2 characters ' }
                                })}
                                error={ !!errors.lastName }
                                helperText={ errors.lastName?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                type='email'
                                label='Email'
                                variant='filled'
                                fullWidth
                                {...register("email",{
                                    required: 'The email is required',
                                    validate: validations.isEmail
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Password'
                                variant='filled'
                                type='password'
                                fullWidth
                                { ...register('password',{
                                    required: 'The password is required',
                                    minLength: { value: 6, message:'At least 6 characters' }
                                }) }
                                error = { !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button 
                                type='submit'
                                color='secondary' 
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                                >
                                    Create an account
                                </Button>
                        </Grid>
                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <NextLink 
                                href={router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'} 
                                passHref 
                                legacyBehavior
                            >
                                <Link underline='always'>
                                    ¿Do you already register? Return to login
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;