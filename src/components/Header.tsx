'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await signOut({ callbackUrl: '/' });
    };

    const handleDashboard = () => {
        handleClose();
        router.push('/dashboard');
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'rgba(10, 25, 47, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} elevation={0}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    href="/"
                    sx={{ flexGrow: 1, fontWeight: 'bold', textDecoration: 'none', color: '#64ffda' }}
                >
                    AI English Learning
                </Typography>

                {status === 'loading' ? (
                    <Button disabled>Loading...</Button>
                ) : session ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: '#ccd6f6' }}>
                            {session.user?.name}
                        </Typography>
                        <Button onClick={handleMenu} sx={{ p: 0, minWidth: 'auto' }}>
                            <Avatar alt={session.user?.name || 'User'} src={session.user?.image || undefined} />
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleDashboard}>ダッシュボード</MenuItem>
                            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button variant="outlined" href="/auth/signin" sx={{ color: '#64ffda', borderColor: '#64ffda' }}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
