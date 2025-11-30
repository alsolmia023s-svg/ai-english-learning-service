'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';

export default function AdminDashboard() {
    const [stats, setStats] = React.useState({ userCount: 0, contactCount: 0 });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                ダッシュボード
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                            <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mr: 3 }} />
                            <Box>
                                <Typography variant="h6" color="text.secondary">
                                    総ユーザー数
                                </Typography>
                                <Typography variant="h3">
                                    {stats.userCount}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                            <EmailIcon sx={{ fontSize: 60, color: 'secondary.main', mr: 3 }} />
                            <Box>
                                <Typography variant="h6" color="text.secondary">
                                    総お問合せ数
                                </Typography>
                                <Typography variant="h3">
                                    {stats.contactCount}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
