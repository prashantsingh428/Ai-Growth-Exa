import React, { useEffect, useRef, useState } from 'react';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import {
  Box, Container, Typography, Grid, Button, useTheme as useMuiTheme, alpha,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  AutoAwesome as AutoAwesomeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Group as GroupIcon,
  Lightbulb as LightbulbIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  FormatQuote as FormatQuoteIcon
} from '@mui/icons-material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

// Import assets for custom logo grid
const imagesGlob = import.meta.glob('../assets/images/*.{png,jpeg,svg,jpg}', { eager: true, as: 'url' });
const clientImages = Object.values(imagesGlob);

// --- Custom Section Components ---

const HeroSection = () => {
  const theme = useMuiTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );

      gsap.fromTo(".client-logo-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} sx={{
      position: 'relative',
      pt: { xs: 15, md: 20 },
      pb: { xs: 10, md: 12 },
      textAlign: 'center',
      overflow: 'hidden',
      background: theme.palette.background.default
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="overline" className="hero-text" sx={{
          color: theme.palette.text.secondary,
          fontWeight: 600,
          letterSpacing: 3,
          mb: 2,
          display: 'block',
          fontSize: '0.85rem'
        }}>
          ABOUT US
        </Typography>
        <Typography variant="h1" className="hero-text" sx={{
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '4rem' },
          lineHeight: 1.2,
          mb: 3,
          color: theme.palette.text.primary,
          letterSpacing: '-0.02em'
        }}>
          Building Growth Systems <br /> for the AI-First World
        </Typography>
        <Typography variant="h5" className="hero-text" sx={{
          color: theme.palette.text.secondary,
          maxWidth: 700,
          mx: 'auto',
          mb: 8,
          fontWeight: 400,
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          lineHeight: 1.6
        }}>
          Trusted by top companies to scale smarter, faster, and more efficiently.
        </Typography>

        {/* Custom Horizontal Logo Marquee */}
        <Box className="hero-text" sx={{ mt: 10, overflow: 'hidden', position: 'relative', width: '100%' }}>
          <Typography variant="caption" sx={{
            color: theme.palette.text.secondary,
            opacity: 0.7,
            mb: 4,
            display: 'block',
            letterSpacing: 2,
            fontWeight: 600
          }}>
            TRUSTED PARTNERS
          </Typography>

          <Box sx={{
            display: 'flex',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}>
            <Box sx={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee 40s linear infinite',
              '&:hover': { animationPlayState: 'paused' },
              '@keyframes marquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' }
              }
            }}>
              {/* Double the logos for seamless loop */}
              {[...clientImages, ...clientImages].map((src, index) => (
                <Box key={index} sx={{
                  mx: 4,
                  width: 120,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}>
                  <img src={src} alt="Client" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      { }
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3 }}>
        <FloatingParticles theme={theme.palette.mode} />
      </Box>
    </Box>
  );
};

const WhoWeAreSection = () => {
  const theme = useMuiTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".who-we-are-item",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ py: 12, background: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="md">
        <Grid container spacing={8} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className="who-we-are-item" sx={{ fontWeight: 700, mb: 3, letterSpacing: '-0.01em' }}>
              Who We Are
            </Typography>
            <Typography variant="body1" className="who-we-are-item" sx={{ fontSize: '1.05rem', color: theme.palette.text.secondary, mb: 3, lineHeight: 1.8 }}>
              AI Growth Exa is more than a marketing agency; we are an <strong>AI-driven growth technology partner</strong>. Founded in 2019, we bridge the gap between creative strategy and rigorous data science.
            </Typography>
            <Typography variant="body1" className="who-we-are-item" sx={{ fontSize: '1.05rem', color: theme.palette.text.secondary, lineHeight: 1.8 }}>
              We don't just run campaigns; we build intelligent engines that learn, adapt, and scale your business with mathematical precision.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="who-we-are-item" sx={{ pl: { md: 6 }, pt: { md: 2 } }}>
              {[
                "Smart Data Decisions",
                "AI-Powered Performance Marketing",
                "Automation-Led Scalability"
              ].map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 24, height: 24, borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1), mr: 2,
                    color: theme.palette.primary.main
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const BeliefSection = () => {
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ py: 15, bgcolor: isDark ? '#000000' : '#f4f4f5', color: isDark ? '#fff' : '#111827' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, letterSpacing: '-0.02em' }}>
            Marketing Should Be Intelligent.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 400, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Stop guessing. Start growing.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Box sx={{
              p: 5,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
              bgcolor: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ color: theme.palette.error.main, mb: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.8rem' }}>The Old Way</Typography>
              <Stack spacing={3}>
                {['Money spent without clarity', 'Reports without insights', 'Vanity metrics instead of real growth'].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.secondary }}>
                    <Typography sx={{ mr: 2, color: theme.palette.error.main, fontWeight: 700 }}>&mdash;</Typography>
                    {item}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{
              p: 5,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              height: '100%',
              bgcolor: alpha(theme.palette.primary.main, 0.03)
            }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.8rem' }}>The AI Growth Exa Way</Typography>
              <Stack spacing={3}>
                {['Predictive spending models', 'Actionable, data-led intelligence', 'Tangible ROI & Scalability'].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                    <CheckCircleIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 20 }} />
                    {item}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const JourneySection = () => {
  const theme = useMuiTheme();
  const steps = [
    { year: '2019', title: 'The Problem', desc: 'We observed businesses wasting budget on blind campaigns.' },
    { year: '2021', title: 'The Pivot', desc: 'Integrated AI models to predict campaign outcomes with accuracy.' },
    { year: '2024', title: 'The Ecosystem', desc: 'Shifted to building full-stack growth engines for global brands.' },
  ];

  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 10, textAlign: 'center' }}>Our Journey</Typography>
        <Box sx={{ position: 'relative', borderLeft: `1px solid ${theme.palette.divider}`, ml: { xs: 3, md: 40 }, pl: 6, py: 2 }}>
          {steps.map((step, index) => (
            <Box key={index} sx={{ mb: 10, position: 'relative', '&:last-child': { mb: 0 } }}>
              <Box sx={{
                position: 'absolute',
                left: -54,
                top: 0,
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: theme.palette.text.secondary,
                border: `4px solid ${theme.palette.background.default}`
              }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{ position: { md: 'absolute' }, left: { md: -180 }, top: 0, textAlign: { md: 'right' } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    {step.year}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>{step.desc}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const ProcessSection = () => {
  const theme = useMuiTheme();
  const processes = [
    { title: "Research", icon: <PsychologyIcon sx={{ fontSize: 32 }} /> },
    { title: "Strategy", icon: <LightbulbIcon sx={{ fontSize: 32 }} /> },
    { title: "Execution", icon: <SpeedIcon sx={{ fontSize: 32 }} /> },
    { title: "Optimization", icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} /> },
    { title: "Scale", icon: <TrendingUpIcon sx={{ fontSize: 32 }} /> },
  ];

  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Scalable Framework
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            A systematic approach to predictable growth.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {processes.map((p, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Box sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                bgcolor: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.divider,
                textAlign: 'center',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: theme.palette.primary.main }
              }}>
                <Box sx={{ color: theme.palette.text.primary, mb: 2, opacity: 0.8 }}>{p.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{p.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const WhyChooseUsSection = () => {
  const theme = useMuiTheme();
  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 8 }}>Why Choose Us?</Typography>
        <Grid container spacing={4}>
          {[
            { title: "Performance-Driven", desc: "We focus purely on ROI and measurable outcomes, not vanity metrics." },
            { title: "Automation-First", desc: "We build systems that work continuously, reducing manual overhead." },
            { title: "Transparent Reporting", desc: "Complete clarity on every dollar spent and every result generated." }
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{
                p: 4, borderRadius: 2, height: '100%',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }} className="hover:border-gray-400 transition-colors duration-300">
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const MissionVisionValuesSection = () => {
  const theme = useMuiTheme();
  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: theme.palette.text.secondary, fontWeight: 700, letterSpacing: 1 }}>OUR MISSION</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 6, mt: 1, lineHeight: 1.4 }}>Helping brands grow smarter and faster using AI.</Typography>

            <Typography variant="overline" sx={{ color: theme.palette.text.secondary, fontWeight: 700, display: 'block', letterSpacing: 1 }}>OUR VISION</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, lineHeight: 1.4 }}>Becoming a global growth partner in the AI-first economy.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 6, borderRadius: 2, bgcolor: theme.palette.background.default, border: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>Core Values</Typography>
              <Grid container spacing={3}>
                {['Innovation', 'Data-Driven', 'Growth Mindset', 'Integrity'].map((v, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main, mr: 2 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{v}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// --- Updated Minimalist Stats Section ---
const CustomStatsSection = () => {
  const theme = useMuiTheme();
  const stats = [
    { value: "5000+", label: "Clients Served" },
    { value: "95%", label: "Satisfaction" },
    { value: "1100+", label: "Projects" },
    { value: "150+", label: "AI Deployments" }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: theme.palette.background.default, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container>
        <Grid container spacing={4} justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}>
          {stats.map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </Typography>
                <Typography variant="button" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const WhoWeWorkWithSection = () => {
  const theme = useMuiTheme();
  return (
    <Box sx={{ py: 12, bgcolor: theme.palette.background.paper, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Who We Work With</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
          We partner with ambitious Startups, Scaling Brands, and Established Enterprises tired of inconsistent leads.
        </Typography>
      </Container>
    </Box>
  );
};

// --- Updated Minimalist Testimonials Section ---
const CustomTestimonialsSection = () => {
  const theme = useMuiTheme();
  const reviews = [
    { name: "Rahul Sharma", role: "CEO, TechFlow", text: "AI Growth Exa completely transformed our brand identity. Professional, creative, and highly recommended." },
    { name: "Pooja Verma", role: "Founder, StyleUp", text: "Honest and transparent. The team didn't just design; they gave our brand a soul. Totally worth it." },
    { name: "Amit Patel", role: "Director, RetailOne", text: "Next level branding. We now have a consistent identity across all platforms thanks to their diligent work." }
  ];

  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.default }}>
      <Container>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 8 }}>Client Perspectives</Typography>
        <Grid container spacing={4}>
          {reviews.map((r, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{
                p: 4, height: '100%',
                bgcolor: theme.palette.background.paper,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}>
                <Typography variant="body1" sx={{
                  mb: 4, color: theme.palette.text.secondary,
                  fontStyle: 'italic', lineHeight: 1.6
                }}>"{r.text}"</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: theme.palette.grey[800], width: 32, height: 32, fontSize: '0.9rem' }}>{r.name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{r.name}</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{r.role}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// --- Updated Minimalist FAQ Section ---
const CustomFaqSection = () => {
  const theme = useMuiTheme();
  const faqs = [
    { q: "What industries do you work with?", a: "We work across startups, e-commerce, SaaS, real estate, education, healthcare, and B2B brands." },
    { q: "How does AI actually help in marketing?", a: "AI allows us to predict user behavior, optimize targeting, and improve conversions with precision." },
    { q: "Do you replace human marketers with AI?", a: "Never. AI enhances human strategy. We combine creativity with machine intelligence." },
    { q: "Is AI marketing expensive?", a: "Not when done right. It actually reduces costs by eliminating ad waste and improving efficiency." },
    { q: "How long before we see results?", a: "Most clients see initial traction within 30 days, with strong scalable growth in 60–90 days." }
  ];

  return (
    <Box sx={{ py: 15, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 8 }}>FAQ</Typography>

        <Box>
          {faqs.map((f, i) => (
            <Accordion key={i} disableGutters elevation={0} sx={{
              mb: 0, bgcolor: 'transparent',
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:before': { display: 'none' }
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, pb: 2, lineHeight: 1.6 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const FinalThoughtSection = () => {
  return (
    <Box sx={{ py: 15, bgcolor: '#111827', color: '#fff', textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, lineHeight: 1.4 }}>
          Growth isn’t about doing <span style={{ opacity: 0.5 }}>more marketing.</span> <br />
          It’s about doing the <span style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>right things</span>.
        </Typography>
      </Container>
    </Box>
  );
};

const CtaSection = () => {
  const theme = useMuiTheme();
  return (
    <Box sx={{ py: 15, textAlign: 'center', bgcolor: theme.palette.background.default }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em' }}>Ready to Transform?</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button variant="contained" size="large" disableElevation sx={{
            px: 5, py: 2, borderRadius: 1, fontSize: '1rem', fontWeight: 600,
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            textTransform: 'none',
            '&:hover': { bgcolor: theme.palette.primary.dark }
          }} href="/contact">
            Book a Strategy Call
          </Button>
          <Button variant="outlined" size="large" sx={{
            px: 5, py: 2, borderRadius: 1,
            fontSize: '1rem', fontWeight: 600,
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
            textTransform:
              'none',
            '&:hover': { borderColor: theme.palette.text.primary, bgcolor: 'transparent' }
          }} href="/services">

            Explore Services
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

// --- Main Page Component ---

const AboutPage = () => {
  const { theme: appTheme } = useAppTheme();

  const muiTheme = React.useMemo(() => createTheme({
    palette: {
      mode:
        appTheme || 'light',
      primary:
        { main: '#667eea' },
      background: {
        default: appTheme === 'dark' ? '#0b0f19' : '#ffffff',
        paper: appTheme === 'dark' ? '#111827' : '#f9fafb',
      },
      text: {
        primary: appTheme === 'dark' ? '#f3f4f6' : '#111827',
        secondary: appTheme === 'dark' ? '#9ca3af' : '#4b5563',
      },
      divider: appTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
    },
    typography: {
      fontFamily:
        '"Inter", "system-ui", sans-serif',
    },
    components: {

      MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
      MuiAccordion: { styleOverrides: { root: { '&.Mui-expanded': { margin: 0 } } } }
    }
  }), [appTheme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ overflowX: 'hidden' }}>
        <HeroSection />
        <WhoWeAreSection />
        <BeliefSection />
        <JourneySection />

        <ProcessSection />
        <WhyChooseUsSection />

        <MissionVisionValuesSection />
        <CustomStatsSection />
        <WhoWeWorkWithSection />
        <CustomTestimonialsSection />
        <CustomFaqSection />
        <FinalThoughtSection />
        <CtaSection />
      </Box>

    </ThemeProvider>
  );
};

export default AboutPage;
