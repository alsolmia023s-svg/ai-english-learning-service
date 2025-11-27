'use client';
import * as React from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'name':
                return value.trim() === '' ? '名前を入力してください' : '';
            case 'email':
                if (value.trim() === '') return 'メールアドレスを入力してください';
                if (!/^\S+@\S+\.\S+$/.test(value)) return '正しいメールアドレスを入力してください';
                return '';
            case 'subject':
                return value.trim() === '' ? '件名を入力してください' : '';
            case 'message':
                return value.trim() === '' ? '本文を入力してください' : '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear submit status when user starts typing again
        if (submitStatus.type) {
            setSubmitStatus({ type: null, message: '' });
        }

        // Validate on change
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            subject: validateField('subject', formData.subject),
            message: validateField('message', formData.message),
        };

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some((error) => error !== '')) {
            return;
        }

        setLoading(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'お問合せを送信しました。ご連絡ありがとうございます。',
                });
                // Clear form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.error || 'お問合せの送信に失敗しました。',
                });
            }
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'ネットワークエラーが発生しました。もう一度お試しください。',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                        お問合せ
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph>
                        サービスに関するご質問やご意見がございましたら、お気軽にお問合せください。
                    </Typography>

                    {submitStatus.type && (
                        <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
                            {submitStatus.message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            label="名前"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="メールアドレス"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="件名"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="本文"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors.message}
                            helperText={errors.message}
                            margin="normal"
                            multiline
                            rows={6}
                            required
                        />

                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                                sx={{ flex: 1 }}
                            >
                                {loading ? '送信中...' : '送信'}
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => router.push('/')}
                            >
                                トップページに戻る
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
