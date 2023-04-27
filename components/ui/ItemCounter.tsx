import { Box, IconButton, Typography } from '@mui/material';
import { RemoveCircleOutlined, AddCircleOutlined } from '@mui/icons-material';

interface Props {
    currentValue: number;
    maxValue: number;
    updateQuantity: ( newQuantity:number ) => void;
}

export const ItemCounter = ({ currentValue, maxValue, updateQuantity }:Props) => {
    
    const addOrRemove = ( value:number ) => {
        if( value === -1 ){
            if( currentValue === 1 ) return;
           
            return updateQuantity( currentValue - 1)
        }

        if( currentValue >= maxValue ) return;

        updateQuantity( currentValue + 1 ); 
    }

    return(
        <Box display='flex' alignItems='center'>
            <IconButton
                onClick={ () => addOrRemove(-1) }
            >
                <RemoveCircleOutlined />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>
                { currentValue }
            </Typography>
            <IconButton
                onClick={ () => addOrRemove(+1) }
            >
                <AddCircleOutlined />
            </IconButton>
        </Box>
    );
}