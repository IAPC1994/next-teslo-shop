import Head from "next/head";
import { Box } from '@mui/material';


interface Props {
    title: string;
    children: JSX.Element | JSX.Element[]
}

export const AuthLayout = ({ title, children }:Props) => {
    return(
        <>
            <Head>
                <title>{ title }</title>
            </Head>

            <main>
                <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center'
                height='calc(100vh - 200px)'
                >
                    { children }
                </Box>
            </main>
        </>
    );
}