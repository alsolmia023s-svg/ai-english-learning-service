import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SchoolIcon from '@mui/icons-material/School';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            あなたの英語を、<br />
            もっと自然に、もっとプロフェッショナルに。
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" paragraph>
            AIが瞬時に英文を添削・フィードバック。<br />
            ビジネスメールもアカデミックなエッセイも、自信を持って発信しよう。
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="/login">
              無料で始める
            </Button>
            <Button variant="outlined" size="large">
              詳しく見る
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'action.hover' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
            Why Choose Us?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <AutoFixHighIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    AIによる瞬時添削
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Claude Haiku 4.5を使用し、待ち時間なく高精度なフィードバックを提供します。
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    詳細な解説
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    なぜ修正されたのか、理由を丁寧に解説。ただ直すだけでなく、学びがあります。
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <HistoryIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    履歴管理
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    過去の添削内容を保存。自分の成長を振り返ることができます。
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How it works Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
            How it Works
          </Typography>
          <Stack spacing={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h2" color="primary" sx={{ mr: 4, fontWeight: 'bold', opacity: 0.5 }}>01</Typography>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>入力</Typography>
                <Typography variant="body1" color="text.secondary">添削したい英文を入力フォームに貼り付けます。</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h2" color="primary" sx={{ mr: 4, fontWeight: 'bold', opacity: 0.5 }}>02</Typography>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>添削</Typography>
                <Typography variant="body1" color="text.secondary">ワンクリックでAIが解析・修正します。</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h2" color="primary" sx={{ mr: 4, fontWeight: 'bold', opacity: 0.5 }}>03</Typography>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>学習</Typography>
                <Typography variant="body1" color="text.secondary">解説を読んで納得。修正案をコピーして利用します。</Typography>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            まずは無料で体験してみませんか？
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            登録は1分で完了します。
          </Typography>
          <Button variant="contained" color="secondary" size="large" href="/login" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>
            今すぐ登録する
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, bgcolor: 'grey.900', color: 'white', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                AI English Learning
              </Typography>
              <Typography variant="body2" color="grey.400">
                AIを活用して、あなたの英語ライティングスキルを向上させましょう。
              </Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>利用規約</Link>
              <Link href="#" color="inherit" display="block">プライバシーポリシー</Link>
            </Box>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="grey.500">
              © {new Date().getFullYear()} AI English Learning. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
