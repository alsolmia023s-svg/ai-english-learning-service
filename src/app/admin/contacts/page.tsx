'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface Contact {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function AdminContactsPage() {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);

    const fetchContacts = async () => {
        try {
            const res = await fetch('/api/admin/contacts');
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('本当にこのお問合せを削除しますか？')) return;

        try {
            const res = await fetch(`/api/admin/contacts?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchContacts();
            }
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    };

    const handleView = (contact: Contact) => {
        setSelectedContact(contact);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'subject', headerName: 'Subject', width: 200 },
        { field: 'createdAt', headerName: 'Date', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleView(params.row)}
                    >
                        View
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
                お問合せ管理
            </Typography>
            <DataGrid
                rows={contacts}
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

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedContact?.subject}</DialogTitle>
                <DialogContent>
                    <DialogContentText gutterBottom>
                        From: {selectedContact?.name} ({selectedContact?.email})
                    </DialogContentText>
                    <DialogContentText gutterBottom>
                        Date: {selectedContact?.createdAt}
                    </DialogContentText>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                            {selectedContact?.message}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
