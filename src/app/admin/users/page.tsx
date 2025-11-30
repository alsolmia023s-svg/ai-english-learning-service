'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('本当にこのユーザーを削除しますか？')) return;

        try {
            const res = await fetch(`/api/admin/users?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleRoleChange = async (id: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (!confirm(`権限を ${newRole} に変更しますか？`)) return;

        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role: newRole }),
            });
            if (res.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'image',
            headerName: 'Avatar',
            width: 70,
            renderCell: (params: GridRenderCellParams) => (
                <Avatar src={params.value} alt={params.row.name} sx={{ width: 32, height: 32 }} />
            )
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'createdAt', headerName: 'Joined At', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRoleChange(params.row._id, params.row.role)}
                    >
                        {params.row.role === 'admin' ? 'Demote' : 'Promote'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                ユーザー管理
            </Typography>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
