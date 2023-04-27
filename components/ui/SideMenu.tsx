import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemButton } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { UIContext } from "@/context";


export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        router.push(`/search/${ searchTerm }`);
        toggleSideMenu();
    }

    const navigateTo = ( url: string ) => {
        router.push(url);
        toggleSideMenu();
    }

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleSideMenu }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm(e.target.value )}
                            onKeyDown={ ({ key }) => key === 'Enter' ? onSearchTerm() : null }
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ onSearchTerm }
                                        aria-label="toggle password visibility"
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItemButton>

                    <ListItemButton
                        onClick={ () => navigateTo('/orders/history') }
                    > 
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'My Orders'} />
                    </ListItemButton>


                    <ListItemButton 
                        onClick={ () => navigateTo('/category/men') } 
                        sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Men'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/women') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Women'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/kid') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Kids'} />
                    </ListItemButton>


                    <ListItemButton onClick={ () => navigateTo('/auth/login') } >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItemButton>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    )
}