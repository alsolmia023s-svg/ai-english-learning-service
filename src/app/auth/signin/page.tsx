'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import GoogleIcon from '@mui/icons-material/Google';
import Header from '@/components/Header';

export default function SignInPage() {
    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header />
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                        ログイン
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Googleアカウントを使ってログインしてください。
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleSignIn}
                        fullWidth
                        sx={{ py: 1.5 }}
                    >
                        Googleでログイン
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}
