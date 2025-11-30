'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Header from '@/components/Header';

export default function DashboardPage() {
    const { data: session } = useSession();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header />
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    ダッシュボード
                </Typography>

                <Paper elevation={2} sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                        alt={session?.user?.name || 'User'}
                        src={session?.user?.image || undefined}
                        sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            ようこそ、{session?.user?.name} さん
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            メールアドレス: {session?.user?.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            権限: {session?.user?.role || 'user'}
                        </Typography>
                    </Box>
                </Paper>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        最近のアクティビティ
                    </Typography>
                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            まだアクティビティはありません。
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}
