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
import ThreeScene from '@/components/ThreeScene';
import AnimatedSection from '@/components/AnimatedSection';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#0a192f', color: 'white', overflowX: 'hidden' }}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ThreeScene />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <AnimatedSection>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #64ffda 30%, #bd34fe 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 4 }}>
              AI × English Learning
            </Typography>
            <Typography variant="h4" component="p" sx={{ color: '#8892b0', mb: 6, lineHeight: 1.6 }}>
              あなたの英語を、<br />
              もっと自然に、もっとプロフェッショナルに。
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/auth/signin"
                sx={{
                  bgcolor: 'transparent',
                  border: '1px solid #64ffda',
                  color: '#64ffda',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
                }}
              >
                Start for Free
              </Button>
            </Stack>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 15, bgcolor: '#112240' }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 10, fontWeight: 'bold', color: '#ccd6f6' }}>
              Why Choose Us?
            </Typography>
          </AnimatedSection>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[
              { icon: <AutoFixHighIcon sx={{ fontSize: 50, color: '#64ffda' }} />, title: 'AI Instant Correction', desc: 'Claude Haiku 4.5による瞬時のフィードバック' },
              { icon: <SchoolIcon sx={{ fontSize: 50, color: '#bd34fe' }} />, title: 'Detailed Explanation', desc: '修正理由の丁寧な解説で深い学びを提供' },
              { icon: <HistoryIcon sx={{ fontSize: 50, color: '#64ffda' }} />, title: 'History Tracking', desc: '過去の添削履歴から成長を可視化' },
            ].map((feature, index) => (
              <Box key={index} sx={{ width: { xs: '100%', md: '30%' }, flexGrow: 1 }}>
                <AnimatedSection delay={index * 0.2} className="h-full">
                  <Card sx={{
                    height: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#8892b0',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-10px)', borderColor: '#64ffda' }
                  }}>
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#ccd6f6', fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1">
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#ccd6f6', mb: 4 }}>
              Ready to Upgrade Your English?
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/auth/signin"
              sx={{
                bgcolor: '#64ffda',
                color: '#0a192f',
                fontWeight: 'bold',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': { bgcolor: '#4cdbb9' }
              }}
            >
              Join Now
            </Button>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, bgcolor: '#020c1b', color: '#8892b0' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#ccd6f6' }}>
              AI English Learning
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
