import { Box, IconButton, Typography } from '@mui/material';
import { RemoveCircleOutlined, AddCircleOutlined } from '@mui/icons-material';

interface Props {

}

export const ItemCounter = ({  }:Props) => {
    return(
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleOutlined />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>
                1
            </Typography>
            <IconButton>
                <AddCircleOutlined />
            </IconButton>
        </Box>
    );
}