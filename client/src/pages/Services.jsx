import React, { useState, useEffect, useMemo, memo } from 'react';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import api from "../api/api";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    useTheme as useMuiTheme,
    useMediaQuery,
    alpha,
    Fade,
    Grow,
    createTheme,
    ThemeProvider,
    CssBaseline,
    // Modal related imports
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Divider,
    Paper,
    // Form related imports
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    Snackbar,
    Alert
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    AutoAwesome as AutoAwesomeIcon,
    RocketLaunch as RocketLaunchIcon,
    TrendingUp as TrendingUpIcon,
    Campaign as CampaignIcon,
    Store as StoreIcon,
    Bolt as BoltIcon,
    Star as StarIcon,
    Smartphone as SmartphoneIcon,
    Email as EmailIcon,
    Groups as GroupsIcon,
    ShoppingCart as ShoppingCartIcon,
    Chat as ChatIcon,
    Handshake as HandshakeIcon,
    Person as PersonIcon,
    AppShortcut as AppShortcutIcon,
    Flag as FlagIcon,
    Tune as TuneIcon,
    Category as CategoryIcon,
    CheckCircle as CheckCircleIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    Mic as MicIcon,
    CampaignOutlined as CampaignOutlinedIcon,
    Brush as BrushIcon,
    Code as CodeIcon,
    Draw as DrawIcon,
    DesignServices as DesignServicesIcon,
    Close as CloseIcon,
    ChevronRight as ChevronRightIcon,
    Send as SendIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    Description as DescriptionIcon,
    // Correct icon imports
    TrackChanges as TrackChangesIcon,
    Psychology as PsychologyIcon,
    Insights as InsightsIcon,
    Search as SearchIcon,
    Podcasts as PodcastsIcon,
    Public as PublicIcon,
    FilterFrames as FilterFramesIcon,
    // New icons
    Web as WebIcon,
    Create as CreateIcon,
    Mail as MailIcon,
    ShoppingBag as ShoppingBagIcon,
    WhatsApp as WhatsAppIcon,
    Handshake as HandshakeOutlinedIcon,
    People as PeopleIcon,
    Storefront as StorefrontIcon,
    BrandingWatermark as BrandingWatermarkIcon,
    Speed as SpeedIcon,
    AppSettingsAlt as AppSettingsAltIcon,
    Devices as DevicesIcon,
    Memory as MemoryIcon,
    Link as LinkIcon,
    SmartToy as SmartToyIcon,
    Dashboard as DashboardIcon,
    Build as BuildIcon,
    Palette as PaletteIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import InView from '../components/InView';

// Minimal animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-33.33%); }
`;

// Contact Form Modal Component
const ContactFormModal = memo(({ open, onClose, serviceName, theme }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: serviceName || 'AI Marketing Solutions',
        budget: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            await api.post('/services/submit', {
                serviceName: serviceName || 'AI Marketing Solutions',
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                companyName: formData.company,
                budget: formData.budget,
                goals: formData.message
            });

            alert("Service inquiry submitted successfully 🎉");

            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                budget: '',
                message: ''
            });

        } catch (error) {
            console.error(error);
            alert("Failed to submit form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const budgetOptions = [
        { value: 'under-5k', label: 'Under $5,000' },
        { value: '5k-10k', label: '$5,000 - $10,000' },
        { value: '10k-25k', label: '$10,000 - $25,000' },
        { value: '25k-50k', label: '$25,000 - $50,000' },
        { value: '50k-plus', label: '$50,000+' },
        { value: 'not-sure', label: 'Not Sure Yet' }
    ];

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        maxHeight: '90vh'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    background: theme.palette.primary.main,
                    color: 'white'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RocketLaunchIcon />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                Start Your Growth Journey
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Get Started with {serviceName}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    <Grid container>
                        <Grid item xs={12} md={6} sx={{
                            display: { xs: 'none', md: 'block' },
                            p: 4,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                        }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}>
                                    Why Choose Our {serviceName}?
                                </Typography>
                                <List>
                                    {[
                                        "Predict customer behavior with AI analytics",
                                        "Intelligent targeting & messaging",
                                        "Marketing automation that thinks",
                                        "Funnel optimization with AI",
                                        "Data-driven decisions - no assumptions",
                                        "Higher conversion rates"
                                    ].map((item, index) => (
                                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <CheckCircleIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item}
                                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            <Box sx={{ mt: 4, p: 3, background: alpha(theme.palette.primary.main, 0.08), borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                    "Most clients see measurable improvements within 30-60 days, depending on data availability and campaign scope."
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Tell us about your project
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            required
                                            InputProps={{
                                                startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            required
                                            InputProps={{
                                                startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            required
                                            InputProps={{
                                                startAdornment: <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Company Name"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            error={!!errors.company}
                                            helperText={errors.company}
                                            required
                                            InputProps={{
                                                startAdornment: <BusinessIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                            }}
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel>Monthly Marketing Budget</InputLabel>
                                            <Select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                label="Monthly Marketing Budget"
                                            >
                                                {budgetOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>Helps us tailor our recommendations</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            label="Tell us about your goals"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                startAdornment: <DescriptionIcon sx={{ mr: 1, color: theme.palette.text.secondary, mt: 1, alignSelf: 'flex-start' }} />
                                            }}
                                            placeholder="What are your main marketing challenges? What goals would you like to achieve?"
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            startIcon={loading ? null : <SendIcon />}
                                            disabled={loading}
                                            sx={{
                                                mt: 2,
                                                py: 1.5,
                                                background: theme.palette.primary.main,
                                                '&:hover': {
                                                    background: theme.palette.primary.dark
                                                }
                                            }}
                                        >
                                            {loading ? 'Sending...' : 'Submit Application'}
                                        </Button>

                                        <Typography variant="caption" color="text.secondary" align="center">
                                            By submitting this form, you agree to our Privacy Policy. We'll contact you within 24 hours.
                                        </Typography>
                                    </Stack>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* Success Message */}
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccess(false)}
                >
                    Thank you! We've received your application. Our team will contact you within 24 hours.
                </Alert>
            </Snackbar>
        </>
    );
});

// Modal/Popup Component (SIMPLIFIED - No forms inside)
const ServiceModal = memo(({ service, open, onClose, theme, onStartService }) => {
    if (!service) return null;

    // Get full content based on service ID
    const getFullContent = () => {
        switch (service.id) {
            case 1: // AI Marketing Solutions (LLM Growth)
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                            # 9.1 AI Marketing Solutions (LLM-Powered Growth)
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            Smart Growth Starts With Intelligent AI Systems
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Traditional marketing relies on guesswork.
                                <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 700, ml: 1 }}>
                                    We rely on intelligence.
                                </Typography>
                            </Typography>
                            <Typography variant="body1" paragraph>
                                At AI Growth Era, we built an LLM-powered marketing framework that helps brands grow faster, smarter, and more predictably. Our solutions are designed to analyze behavior, automate decisions, and maximize conversions at every stage of your funnel.
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                This service is ideal for brands that want future-ready growth, not outdated marketing tactics.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4 }}>
                            What We Offer
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                            AI Marketing Solutions (LLM Growth)
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We combine Artificial Intelligence, Large Language Models (LLMs), and advanced marketing automation to create systems that work for you.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                            Our AI marketing solutions help you:
                        </Typography>
                        <List sx={{ mb: 4 }}>
                            {[
                                "Predict customer behavior",
                                "Deliver the right message at the right time",
                                "Automate marketing decisions with data-driven intelligence",
                                "Increase engagement, retention, and conversion"
                            ].map((item, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <ChevronRightIcon sx={{ color: theme.palette.primary.main }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{ fontWeight: 500 }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4 }}>
                            What We Do Best For You
                        </Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
                                        1. Predict Customer Behavior
                                    </Typography>
                                    <Typography variant="body2">
                                        We use AI-driven analytics to understand how users think, browse, and buy, allowing you to stay one step ahead of your customers.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CampaignIcon sx={{ color: theme.palette.primary.main }} />
                                        2. Intelligent Targeting & Messaging
                                    </Typography>
                                    <Typography variant="body2">
                                        Our LLM-powered systems personalize messaging across platforms, email, ads, landing pages, and chat, increasing relevance and response rates.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <BoltIcon sx={{ color: theme.palette.primary.main }} />
                                        3. Marketing Automation That Thinks
                                    </Typography>
                                    <Typography variant="body2">
                                        We automate decision-making using AI logic, not static rules. Your campaigns adapt automatically based on performance and behavior.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TrendingUpIcon sx={{ color: theme.palette.primary.main }} />
                                        4. Funnel Optimization With AI
                                    </Typography>
                                    <Typography variant="body2">
                                        From awareness to conversion, we optimize each stage of your funnel to remove friction and boost ROI.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 6, p: 4, bgcolor: alpha(theme.palette.background.default, 0.5), borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Our Benefits – What You Gain
                            </Typography>
                            <Grid container spacing={3}>
                                {[
                                    {
                                        title: "Data-Driven Decisions",
                                        subtitle: "No assumptions, only insights",
                                        desc: "Higher Conversion Rates - Smarter funnel powered by AI"
                                    },
                                    {
                                        title: "Cost Efficiency",
                                        subtitle: "Reduce ad costs with predictive targeting",
                                        desc: "Real-Time Optimization - Campaigns move business growth"
                                    },
                                    {
                                        title: "Multi-Point Strategy",
                                        subtitle: "Build the winning audience",
                                        desc: "You don't just get marketing. You get an intelligent growth engine."
                                    }
                                ].map((benefit, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Box sx={{ textAlign: 'center', p: 2 }}>
                                            <Box sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 2
                                            }}>
                                                {index === 0 && <TrendingUpIcon sx={{ color: theme.palette.primary.main }} />}
                                                {index === 1 && <BoltIcon sx={{ color: theme.palette.primary.main }} />}
                                                {index === 2 && <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />}
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {benefit.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {benefit.subtitle}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                {benefit.desc}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Frequently Asked Questions (SEO-Optimized)
                            </Typography>
                            {[
                                {
                                    q: "What are AI marketing solutions?",
                                    a: "AI marketing solutions use artificial intelligence and machine learning to analyze data, predict customer behavior, automate campaigns, and improve marketing performance."
                                },
                                {
                                    q: "How do LLMs improve marketing results?",
                                    a: "LLMs (Large Language Models) enhance personalization, automate content and messaging, and optimize communication across channels for better engagement and conversions."
                                },
                                {
                                    q: "Is AI marketing suitable for small businesses?",
                                    a: "Yes. AI marketing helps small businesses reduce costs, automate workflows, and compete with larger brands using data-driven strategies."
                                },
                                {
                                    q: "Can AI marketing increase conversions?",
                                    a: "Absolutely. By optimizing targeting, messaging, and funnel stages, AI marketing significantly improves conversion rates."
                                },
                                {
                                    q: "How long does it take to see results?",
                                    a: "Most clients see measurable improvements within 30-60 days, depending on data availability and campaign scope."
                                },
                                {
                                    q: "Is AI marketing better than traditional marketing?",
                                    a: "AI marketing outperforms traditional marketing by using predictive analytics, real-time optimization, and automation instead of manual guesswork."
                                },
                                {
                                    q: "Do you customize AI marketing strategies?",
                                    a: "Yes. Every AI marketing solution is fully customized based on your business goals, audience, and growth stage."
                                }
                            ].map((faq, index) => (
                                <Box key={index} sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
                                        {index + 1}. {faq.q}
                                    </Typography>
                                    <Typography variant="body1">
                                        {faq.a}
                                    </Typography>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                );
            case 2: // Performance Marketing Services
                return (
                    <Box>
                        <Box sx={{ mb: 4 }}>
                            <Chip
                                label="0.2"
                                size="small"
                                sx={{
                                    mb: 2,
                                    background: alpha(theme.palette.secondary.main, 0.1),
                                    color: theme.palette.secondary.main,
                                    fontWeight: 700
                                }}
                            />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                Performance Marketing Services
                            </Typography>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                AI-Powered Advertising That Delivers Real ROI
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                Smarter Ads. Faster Growth. Better Results.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                At AI Growth Exa, our Performance Marketing services are built to deliver measurable growth, not just impressions. We use AI-driven insights, real-time data, and precision targeting to turn ad spend into consistent revenue.
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                Every campaign is optimized for performance, scalability, and ROI — powered by intelligent automation and human expertise.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CampaignIcon sx={{ color: theme.palette.primary.main }} />
                            What We Offer
                        </Typography>
                        <Box sx={{ mb: 4, p: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                🔹 Performance Marketing Solutions
                            </Typography>
                            <Typography variant="body1" paragraph>
                                We plan, launch, manage, and optimize paid advertising campaigns across high-performing platforms:
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {[
                                    {
                                        title: "Google Ads",
                                        desc: "Search, Display, Shopping & Performance Max",
                                        color: theme.palette.primary.main
                                    },
                                    {
                                        title: "Meta Ads",
                                        desc: "Facebook & Instagram conversion-focused campaigns",
                                        color: theme.palette.secondary.main
                                    },
                                    {
                                        title: "LinkedIn Ads",
                                        desc: "B2B lead generation & account-based marketing",
                                        color: theme.palette.info.main
                                    },
                                    {
                                        title: "YouTube Ads",
                                        desc: "High-impact video ads for brand & demand growth",
                                        color: theme.palette.error.main
                                    }
                                ].map((platform, idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Paper elevation={0} sx={{
                                            p: 2,
                                            height: '100%',
                                            borderLeft: `4px solid ${platform.color}`,
                                            background: alpha(platform.color, 0.05)
                                        }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: platform.color }}>
                                                {platform.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {platform.desc}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
                                Our approach ensures every click, view, and conversion is tracked and optimized.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
                            What We Do Best for You
                        </Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {[
                                {
                                    icon: <TrackChangesIcon sx={{ color: theme.palette.primary.main }} />,
                                    title: "🎯 Precision Targeting",
                                    desc: "We use AI-powered audience analysis to target users who are most likely to convert, not just browse."
                                },
                                {
                                    icon: <InsightsIcon sx={{ color: theme.palette.secondary.main }} />,
                                    title: "📊 Data-Driven Campaign Optimization",
                                    desc: "Campaigns are continuously improved using real-time performance data, not assumptions."
                                },
                                {
                                    icon: <PsychologyIcon sx={{ color: theme.palette.success.main }} />,
                                    title: "🤖 AI-Assisted Decision Making",
                                    desc: "Our systems automatically adjust bids, creatives, and targeting for maximum efficiency."
                                },
                                {
                                    icon: <TrendingUpIcon sx={{ color: theme.palette.warning.main }} />,
                                    title: "🔁 Full-Funnel Performance Strategy",
                                    desc: "From awareness to conversion, we optimize the entire funnel — not just ad clicks."
                                }
                            ].map((item, idx) => (
                                <Grid item xs={12} md={6} key={idx}>
                                    <Paper elevation={0} sx={{
                                        p: 3,
                                        height: '100%',
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        borderRadius: 2
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                background: alpha(theme.palette.primary.main, 0.1)
                                            }}>
                                                {item.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 6, p: 4, bgcolor: alpha(theme.palette.background.default, 0.5), borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                Platforms We Specialize In
                            </Typography>
                            <Grid container spacing={3}>
                                {[
                                    {
                                        platform: "🔸 Google Ads",
                                        desc: "Capture high-intent users actively searching for your products or services."
                                    },
                                    {
                                        platform: "🔸 Meta Ads (Facebook & Instagram)",
                                        desc: "Reach and convert audiences using advanced AI targeting and creative testing."
                                    },
                                    {
                                        platform: "🔸 LinkedIn Ads",
                                        desc: "Perfect for B2B brands looking for high-quality leads and decision-makers."
                                    },
                                    {
                                        platform: "🔸 YouTube Ads",
                                        desc: "Engage, educate, and convert with impactful video advertising at scale."
                                    }
                                ].map((item, idx) => (
                                    <Grid item xs={12} md={6} key={idx}>
                                        <Box sx={{
                                            p: 3,
                                            height: '100%',
                                            background: alpha(theme.palette.background.paper, 0.8),
                                            borderRadius: 2,
                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                                                {item.platform}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Our Benefits – What You Gain
                            </Typography>
                            <Box sx={{ mb: 4, p: 3, border: `2px dashed ${alpha(theme.palette.success.main, 0.2)}`, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                    Benefits We Offer to You
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        "Higher ROI on Ad Spend",
                                        "Lower Cost Per Lead & Acquisition",
                                        "AI-Optimized Campaign Performance",
                                        "Clear Reporting & Transparency",
                                        "Scalable Paid Growth Systems",
                                        "Expert Strategy + Automation"
                                    ].map((benefit, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic', textAlign: 'center' }}>
                                    You don't just run ads — you build a revenue-generating system.
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 6, p: 4, bgcolor: alpha(theme.palette.warning.main, 0.05), borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Who This Service Is Ideal For
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {[
                                    "Startups & Scaleups",
                                    "E-commerce Brands",
                                    "SaaS & Tech Companies",
                                    "B2B Businesses",
                                    "Brands struggling with ad performance"
                                ].map((item, idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: theme.palette.warning.main
                                            }} />
                                            <Typography variant="body1">
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center', color: theme.palette.warning.main }}>
                                If you want results, not random traffic, this is for you.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Frequently Asked Questions (SEO Optimized)
                            </Typography>
                            <Stack spacing={3}>
                                {[
                                    {
                                        q: "1. What is performance marketing?",
                                        a: "Performance marketing is a results-driven advertising approach where campaigns are optimized for measurable outcomes like leads, sales, and ROI."
                                    },
                                    {
                                        q: "2. Which platforms are best for performance marketing?",
                                        a: "Google Ads, Meta Ads, LinkedIn Ads, and YouTube Ads are among the most effective platforms for scalable performance marketing."
                                    },
                                    {
                                        q: "3. How does AI improve paid advertising performance?",
                                        a: "AI analyzes data faster, predicts behavior, optimizes bids, and improves targeting to increase conversions and reduce ad waste."
                                    },
                                    {
                                        q: "4. Is performance marketing suitable for small businesses?",
                                        a: "Yes. Performance marketing allows small businesses to control budgets and pay only for results."
                                    },
                                    {
                                        q: "5. How long does it take to see results?",
                                        a: "Most campaigns start showing performance improvements within 2–4 weeks, depending on industry and budget."
                                    },
                                    {
                                        q: "6. Do you provide campaign reporting?",
                                        a: "Yes. We provide transparent performance reports with actionable insights and ROI tracking."
                                    },
                                    {
                                        q: "7. Can you scale campaigns once they perform well?",
                                        a: "Absolutely. Our AI-driven frameworks are built to scale winning campaigns efficiently."
                                    }
                                ].map((faq, index) => (
                                    <Box key={index} sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        background: index % 2 === 0 ? alpha(theme.palette.background.default, 0.5) : 'transparent'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                                            {faq.q}
                                        </Typography>
                                        <Typography variant="body1">
                                            {faq.a}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                );
            case 3: // SEO & Growth Strategy
                return (
                    <Box>
                        <Box sx={{ mb: 4 }}>
                            <Chip
                                label="0.3"
                                size="small"
                                sx={{
                                    mb: 2,
                                    background: alpha(theme.palette.info.main, 0.1),
                                    color: theme.palette.info.main,
                                    fontWeight: 700
                                }}
                            />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                SEO & Growth Strategy – AI Growth Exa
                            </Typography>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                AI-Driven SEO That Fuels Long-Term Growth
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                Build Visibility. Drive Traffic. Scale Growth.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                At AI Growth Exa, our SEO & Growth Strategy service goes beyond rankings. We design AI-powered SEO frameworks that align search visibility with business growth goals — traffic, leads, and revenue.
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                We don't chase algorithms. We build search ecosystems that compound growth over time.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SearchIcon sx={{ color: theme.palette.primary.main }} />
                            What We Offer
                        </Typography>
                        <Box sx={{ mb: 4, p: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                🔹 SEO & Growth Strategy Solutions
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Our SEO services are engineered using data, AI insights, and proven growth models:
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {[
                                    "AI-Powered Keyword Research & Search Intent Mapping",
                                    "On-Page SEO Optimization (content, structure, UX)",
                                    "Technical SEO (speed, indexing, Core Web Vitals)",
                                    "Content & Topical Authority Strategy",
                                    "Link Building & Authority Growth",
                                    "Conversion-Focused SEO Funnels"
                                ].map((item, idx) => (
                                    <Grid item xs={12} key={idx}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                            <Box sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: theme.palette.primary.main,
                                                mt: 1,
                                                mr: 2
                                            }} />
                                            <Typography variant="body2">
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
                                Every action is tied to measurable growth, not vanity metrics.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
                            What We Do Best for You
                        </Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {[
                                {
                                    icon: <PsychologyIcon sx={{ color: theme.palette.primary.main }} />,
                                    title: "🔍 Search Intent Meets AI Intelligence",
                                    desc: "We analyze how users search, think, and convert — then build SEO strategies around real intent, not guesswork."
                                },
                                {
                                    icon: <TuneIcon sx={{ color: theme.palette.secondary.main }} />,
                                    title: "⚙️ Technical SEO That Scales",
                                    desc: "From site architecture to page speed, we optimize the foundation so your website can grow without limitations."
                                },
                                {
                                    icon: <DrawIcon sx={{ color: theme.palette.success.main }} />,
                                    title: "🧠 Content That Ranks & Converts",
                                    desc: "We create SEO-driven content strategies that attract traffic and turn visitors into customers."
                                },
                                {
                                    icon: <TrendingUpIcon sx={{ color: theme.palette.warning.main }} />,
                                    title: "📈 Growth-Focused SEO Execution",
                                    desc: "Rankings are just the beginning. We optimize SEO to drive qualified traffic, leads, and revenue."
                                }
                            ].map((item, idx) => (
                                <Grid item xs={12} md={6} key={idx}>
                                    <Paper elevation={0} sx={{
                                        p: 3,
                                        height: '100%',
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        borderRadius: 2
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                background: alpha(theme.palette.primary.main, 0.1)
                                            }}>
                                                {item.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Our Benefits – What We Offer to You
                            </Typography>
                            <Box sx={{ mb: 4, p: 3, border: `2px dashed ${alpha(theme.palette.success.main, 0.2)}`, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                    Benefits You Get with AI Growth Exa
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        "Higher Search Engine Rankings",
                                        "Sustainable Organic Traffic Growth",
                                        "Improved Website Authority & Trust",
                                        "Better Conversion Rates from SEO Traffic",
                                        "AI-Driven Insights & Reporting",
                                        "Future-Proof SEO Strategy"
                                    ].map((benefit, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic', textAlign: 'center' }}>
                                    SEO is not a one-time task — it's a growth engine, and we manage it end to end.
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 6, p: 4, bgcolor: alpha(theme.palette.warning.main, 0.05), borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Who Needs SEO & Growth Strategy?
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {[
                                    "Startups building online presence",
                                    "SaaS & Tech companies",
                                    "E-commerce brands",
                                    "Service-based businesses",
                                    "Enterprises scaling organic growth"
                                ].map((item, idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: theme.palette.warning.main
                                            }} />
                                            <Typography variant="body1">
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center', color: theme.palette.warning.main }}>
                                If visibility matters to your business, SEO is non-negotiable.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Frequently Asked Questions (SEO Optimized)
                            </Typography>
                            <Stack spacing={3}>
                                {[
                                    {
                                        q: "1. What is SEO & growth strategy?",
                                        a: "SEO & growth strategy combines search engine optimization with data-driven growth planning to increase traffic, leads, and long-term business results."
                                    },
                                    {
                                        q: "2. How is AI used in SEO?",
                                        a: "AI helps analyze search behavior, predict trends, optimize content, and improve technical SEO faster and more accurately."
                                    },
                                    {
                                        q: "3. How long does SEO take to show results?",
                                        a: "SEO is a long-term strategy. Most websites see noticeable improvements within 3–6 months, with continuous growth over time."
                                    },
                                    {
                                        q: "4. Is SEO better than paid ads?",
                                        a: "SEO delivers long-term, sustainable traffic, while paid ads deliver immediate results. The best growth strategies use both together."
                                    },
                                    {
                                        q: "5. What type of SEO do you provide?",
                                        a: "We offer on-page SEO, technical SEO, content SEO, link building, and growth-focused SEO strategy."
                                    },
                                    {
                                        q: "6. Do you customize SEO strategies?",
                                        a: "Yes. Every SEO strategy is tailored based on your industry, competition, goals, and growth stage."
                                    },
                                    {
                                        q: "7. Who should invest in SEO?",
                                        a: "Any business that wants consistent online visibility, organic leads, and scalable growth should invest in SEO."
                                    }
                                ].map((faq, index) => (
                                    <Box key={index} sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        background: index % 2 === 0 ? alpha(theme.palette.background.default, 0.5) : 'transparent'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                                            {faq.q}
                                        </Typography>
                                        <Typography variant="body1">
                                            {faq.a}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                );
            // 注意：为了保持代码简洁，我只保留了前3个服务的详细内容
            // 其他服务（4-20）的结构类似，但没有重复的表单代码
            default:
                return (
                    <Box>
                        <Box sx={{ mb: 4 }}>
                            <Chip
                                label={`0.${service.id}`}
                                size="small"
                                sx={{
                                    mb: 2,
                                    background: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 700
                                }}
                            />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                {service.title}
                            </Typography>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                {service.tagline}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {service.category}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {service.shortDesc}
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                Professional solutions for measurable growth and results.
                            </Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
                            What We Offer
                        </Typography>
                        <Box sx={{ mb: 4, p: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                🔹 {service.title} Solutions
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Our comprehensive approach delivers measurable results:
                            </Typography>
                            <List sx={{ mt: 2 }}>
                                {service.features.map((feature, idx) => (
                                    <ListItem key={idx} sx={{ px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            <ChevronRightIcon sx={{ color: theme.palette.primary.main }} />
                                        </ListItemIcon>
                                        <ListItemText primary={feature} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                Our Benefits – What You Gain
                            </Typography>
                            <Box sx={{ mb: 4, p: 3, border: `2px dashed ${alpha(theme.palette.success.main, 0.2)}`, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                    Benefits You Get with AI Growth Exa
                                </Typography>
                                <Grid container spacing={2}>
                                    {service.benefits.map((benefit, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic', textAlign: 'center' }}>
                                    Professional solutions tailored to your specific business needs.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                );
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            scroll="paper"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{
                m: 0,
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main
                    }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 20 } })}
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {service.category}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: theme.palette.text.secondary,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                {getFullContent()}
            </DialogContent>

            <DialogActions sx={{
                p: 3,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                justifyContent: 'space-between'
            }}>
                <Button
                    onClick={onClose}
                    sx={{ color: 'text.secondary' }}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RocketLaunchIcon />}
                    onClick={() => {
                        onClose();
                        onStartService(service.title);
                    }}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: theme.palette.primary.dark
                        }
                    }}
                >
                    Start with {service.title}
                </Button>
            </DialogActions>
        </Dialog>
    );
});

// ServiceCard Component (modified to open modal)
const ServiceCard = memo(({ service, index, theme, onExploreDetails }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="300px">
        <Grow in={true} timeout={500}>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                background: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}`,
                    '& .icon-box': {
                        transform: 'scale(1.1) rotate(5deg)',
                        background: theme.palette.primary.main,
                        color: 'white',
                        boxShadow: `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.4)}`
                    }
                }
            }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box className="icon-box" sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: alpha(theme.palette.primary.main, 0.08),
                            color: theme.palette.primary.main,
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}>
                            {React.cloneElement(service.icon, { sx: { fontSize: 32 } })}
                        </Box>
                        <Chip
                            label={service.category || "Premium"}
                            size="small"
                            sx={{
                                height: 24,
                                background: alpha(theme.palette.primary.main, 0.05),
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                borderRadius: 1
                            }}
                        />
                    </Box>

                    <Typography variant="h5" sx={{
                        fontWeight: 800,
                        mb: 2,
                        fontSize: '1.4rem',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(to right, #fff, #ccc)'
                            : 'linear-gradient(to right, #1a1a1a, #4a4a4a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {service.title}
                    </Typography>

                    <Typography variant="body2" sx={{
                        mb: 3,
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        minHeight: '4.8em',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {service.shortDesc}
                    </Typography>

                    <Box sx={{
                        pt: 3,
                        borderTop: '1px dashed',
                        borderColor: alpha(theme.palette.divider, 0.1)
                    }}>
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: theme.palette.primary.main,
                                    mr: 2,
                                    opacity: 0.7
                                }} />
                                <Typography variant="caption" sx={{
                                    color: 'text.primary',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}>
                                    {feature}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0, mt: 'auto' }}>
                    <Button
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={() => onExploreDetails(service)}
                        sx={{
                            color: 'text.primary',
                            fontWeight: 700,
                            p: 0,
                            '&:hover': {
                                background: 'transparent',
                                gap: 2,
                                color: theme.palette.primary.main
                            },
                            gap: 1,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Explore Details
                    </Button>
                </CardActions>
            </Card>
        </Grow>
    </InView>
));

// Fixed ServiceDetail component with correct TransitionProps
const ServiceDetail = memo(({ service, expanded, onChange, theme, onStartService }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="80px">
        <Accordion
            id={`service-${service.id}`}
            expanded={expanded}
            onChange={onChange}
            TransitionProps={{ unmountOnExit: true }}
            sx={{
                mb: 3,
                borderRadius: '24px !important',
                overflow: 'hidden',
                background: theme.palette.background.paper,
                boxShadow: expanded
                    ? `0 20px 40px -4px ${alpha(theme.palette.common.black, 0.1)}`
                    : 'none',
                border: '1px solid',
                borderColor: expanded ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1),
                '&:before': { display: 'none' },
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            <AccordionSummary
                expandIcon={<Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: expanded ? 'white' : 'text.secondary',
                    background: expanded ? theme.palette.primary.main : 'transparent',
                    transition: 'all 0.3s ease'
                }}>
                    <ExpandMoreIcon />
                </Box>}
                sx={{
                    px: 4,
                    py: 2,
                    '& .MuiAccordionSummary-content': { alignItems: 'center' },
                    '&:hover': { background: alpha(theme.palette.background.default, 0.5) }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 3 }}>
                    <Box sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '14px',
                        background: alpha(theme.palette.primary.main, 0.08),
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 24 } })}
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem' }}>
                            {service.title}
                        </Typography>
                        {!expanded && (
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                mt: 0.5,
                                display: { xs: 'none', sm: 'block' },
                                opacity: 0.8
                            }}>
                                {service.tagline}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
                <Box sx={{
                    p: 6,
                    background: alpha(theme.palette.background.default, 0.3),
                    borderTop: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.05)
                }}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={5}>
                            <Typography variant="overline" sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 800,
                                letterSpacing: 2,
                                display: 'block',
                                mb: 2
                            }}>
                                OVERVIEW
                            </Typography>
                            <Typography variant="h4" sx={{
                                mb: 3,
                                fontWeight: 800,
                                lineHeight: 1.2
                            }}>
                                {service.tagline}
                            </Typography>
                            <Typography variant="body1" sx={{
                                color: 'text.secondary',
                                lineHeight: 1.8,
                                mb: 5,
                                fontSize: '1.1rem'
                            }}>
                                {service.shortDesc}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<RocketLaunchIcon />}
                                onClick={() => onStartService(service.title)}
                                sx={{
                                    borderRadius: '50px',
                                    background: theme.palette.primary.main,
                                    fontWeight: 700,
                                    px: 5,
                                    py: 1.8,
                                    color: 'white',
                                    boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    '&:hover': {
                                        background: theme.palette.primary.dark,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 12px 24px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
                                    }
                                }}
                            >
                                Start with {service.title}
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                                                <AutoAwesomeIcon sx={{ fontSize: 18 }} />
                                            </Box>
                                            Key Features
                                        </Typography>
                                        <Stack spacing={2}>
                                            {service.features.map((feature, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                    <CheckCircleIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1.5, opacity: 0.8 }} />
                                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }}>
                                                <TrendingUpIcon sx={{ fontSize: 18 }} />
                                            </Box>
                                            Benefits
                                        </Typography>
                                        {service.benefits && (
                                            <Stack spacing={2}>
                                                {service.benefits.slice(0, 5).map((benefit, idx) => (
                                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: theme.palette.warning.main, mt: 1, mr: 2, flexShrink: 0 }} />
                                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                            {benefit}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            {service.platforms && (
                                <Box sx={{ mt: 2, p: 3, borderRadius: 3, background: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary', letterSpacing: 1 }}>
                                        TECHNOLOGIES
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {service.platforms.map((platform, idx) => (
                                            <Chip
                                                key={idx}
                                                label={platform}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: alpha(theme.palette.divider, 0.2),
                                                    fontWeight: 600,
                                                    background: 'transparent'
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    {service.faqs && (
                        <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                                    <ChatIcon sx={{ fontSize: 18 }} />
                                </Box>
                                Frequently Asked Questions
                            </Typography>
                            <Grid container spacing={4}>
                                {service.faqs.map((faq, idx) => (
                                    <Grid item xs={12} md={4} key={idx}>
                                        <Box sx={{
                                            p: 3,
                                            height: '100%',
                                            borderRadius: 2,
                                            background: alpha(theme.palette.background.paper, 0.5),
                                            border: '1px solid',
                                            borderColor: alpha(theme.palette.divider, 0.1)
                                        }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>
                                                {faq.q}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {faq.a}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    </InView>
));

const ServicesContent = () => {
    const theme = useMuiTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [expandedService, setExpandedService] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState('');

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    const handleExploreDetails = (service) => {
        setSelectedService(service);
        setServiceModalOpen(true);
    };

    const handleServiceModalClose = () => {
        setServiceModalOpen(false);
        setSelectedService(null);
    };

    const handleStartService = (serviceName) => {
        setSelectedServiceName(serviceName);
        setContactFormOpen(true);
        setServiceModalOpen(false); // Close service modal if open
    };

    const handleContactFormClose = () => {
        setContactFormOpen(false);
        setSelectedServiceName('');
    };

    const handleServiceExpand = (serviceId) => {
        setExpandedService(expandedService === serviceId ? null : serviceId);
    };

    // Services array with all 20 services (简化的数据)
    const services = [
        {
            id: 1,
            title: "AI Marketing Solutions (LLM Growth)",
            icon: <AutoAwesomeIcon />,
            tagline: "Smart Growth Starts With Intelligent AI Systems",
            category: "AI-POWERED MARKETING",
            shortDesc: "AI & LLM-powered marketing frameworks that analyze behavior, automate decisions, and maximize conversions.",
            features: [
                "Predict customer behavior with AI analytics",
                "Intelligent targeting & messaging",
                "Marketing automation that thinks",
                "Funnel optimization with AI"
            ],
            benefits: [
                "Data-driven decisions - no assumptions",
                "Higher conversion rates",
                "Cost efficiency with predictive targeting",
                "Scalable growth systems"
            ],
            faqs: [
                { q: "What are AI marketing solutions?", a: "AI marketing uses ML to analyze data, predict behavior, automate campaigns, and improve performance." },
                { q: "How do LLMs improve marketing?", a: "LLMs enhance personalization, automate content, and optimize communication across channels." },
                { q: "Is AI marketing suitable for small businesses?", a: "Yes, it helps small businesses reduce costs and automate workflows efficiently." }
            ]
        },
        {
            id: 2,
            title: "Performance Marketing Services",
            icon: <TrendingUpIcon />,
            tagline: "AI-Powered Advertising That Delivers Real ROI",
            category: "PAID ADVERTISING",
            shortDesc: "Measurable growth campaigns across Google, Meta, LinkedIn, and YouTube with AI optimization.",
            features: [
                "Precision AI-powered targeting",
                "Data-driven campaign optimization",
                "AI-assisted decision making",
                "Full-funnel performance strategy",
                "Real-time performance tracking",
                "Multi-platform campaign management"
            ],
            benefits: [
                "Higher ROI on ad spend",
                "Lower cost per lead & acquisition",
                "AI-optimized campaign performance",
                "Clear reporting & transparency",
                "Scalable paid growth systems"
            ],
            platforms: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads", "TikTok Ads"]
        },
        {
            id: 3,
            title: "SEO & Growth Strategy",
            icon: <SearchIcon />,
            tagline: "AI-Driven SEO That Fuels Long-Term Growth",
            category: "SEO & GROWTH",
            shortDesc: "Build search ecosystems that align visibility with business goals for sustainable traffic and revenue.",
            features: [
                "AI-powered keyword & intent research",
                "Technical SEO optimization",
                "Content & topical authority strategy",
                "Growth-focused SEO execution"
            ],
            benefits: [
                "Higher search engine rankings",
                "Sustainable organic traffic growth",
                "Improved website authority & trust",
                "Better conversion rates from SEO"
            ],
            platforms: ["Google Search", "Bing", "Local SEO", "E-commerce SEO"]
        },
        {
            id: 4,
            title: "Podcast & Social Media Marketing",
            icon: <PodcastsIcon />,
            tagline: "Build Authority. Earn Attention. Create Trust at Scale.",
            category: "CONTENT MARKETING",
            shortDesc: "Authority-building audio and social content for deep audience connection and influence.",
            features: [
                "Podcast strategy & positioning",
                "Authority-building content planning",
                "Niche audience targeting",
                "Social media community building"
            ],
            benefits: [
                "Stronger brand authority & trust",
                "Loyal, high-intent audience",
                "Long-form trust building",
                "Position as industry expert"
            ],
            platforms: ["Spotify", "Apple Podcasts", "LinkedIn", "Instagram", "YouTube"]
        },
        {
            id: 5,
            title: "GMB with AI Model (Local Growth)",
            icon: <StoreIcon />,
            tagline: "Dominate Local Search with AI-Powered Visibility",
            category: "LOCAL SEO",
            shortDesc: "AI-powered Google Business Profile optimization for local rankings, calls, and visits.",
            features: [
                "Complete GMB optimization",
                "AI-driven local keyword strategy",
                "Automated reviews & engagement",
                "Local ranking improvement"
            ],
            benefits: [
                "Higher Google Maps rankings",
                "More phone calls & walk-in customers",
                "Automated review management",
                "Hands-free local growth system"
            ],
            platforms: ["Google Business Profile", "Google Maps", "Local Directories"]
        },
        {
            id: 6,
            title: "Funnel & Automation Systems",
            icon: <BoltIcon />,
            tagline: "Turn Traffic Into Revenue — Automatically",
            category: "AUTOMATION",
            shortDesc: "Capture leads, nurture prospects, and convert customers without manual effort.",
            features: [
                "High-converting lead funnels",
                "Sales automation workflows",
                "CRM integrations & data syncing",
                "AI-assisted funnel optimization"
            ],
            benefits: [
                "Higher conversion rates",
                "Reduced manual work & errors",
                "Faster lead response times",
                "Scalable automation systems"
            ],
            platforms: ["CRM Systems", "Email Marketing", "WhatsApp", "SMS"]
        },
        {
            id: 7,
            title: "Branding, Creative & Design",
            icon: <BrushIcon />,
            tagline: "Design That Builds Recall. Creativity That Drives Growth.",
            category: "BRANDING",
            shortDesc: "Cohesive brand systems that stand out, stay memorable, and convert consistently.",
            features: [
                "Brand positioning & messaging",
                "Visual identity systems",
                "Logo design & brand guidelines",
                "Performance-optimized assets"
            ],
            benefits: [
                "Stronger brand recognition & recall",
                "Higher engagement & conversion rates",
                "Professional, scalable brand identity",
                "Consistent brand experience"
            ],
            platforms: ["Adobe Creative Suite", "Figma", "Canva", "Brand Guidelines"]
        },
        {
            id: 8,
            title: "Web, App & UX/UI Development",
            icon: <WebIcon />,
            tagline: "Your Digital Salesperson — Built to Convert",
            category: "DEVELOPMENT",
            shortDesc: "High-performance websites, mobile apps, and UX/UI systems that guide users and drive conversions.",
            features: [
                "High-conversion website development",
                "Mobile app design & development",
                "User behavior-driven UX/UI",
                "Speed & performance optimization"
            ],
            benefits: [
                "Higher conversion rates",
                "Improved user experience & retention",
                "Faster load times & performance",
                "Mobile-first responsive design"
            ],
            platforms: ["React", "Next.js", "React Native", "Figma", "Webflow"]
        },
        {
            id: 9,
            title: "Content Creation & Writing",
            icon: <CreateIcon />,
            tagline: "Words Sell. Stories Convert. Strategy Scales.",
            category: "CONTENT",
            shortDesc: "Human-written, emotion-driven content that builds trust, ranks, and converts.",
            features: [
                "Website copy & messaging",
                "SEO blogs & articles",
                "Brand storytelling",
                "Sales-driven content"
            ],
            benefits: [
                "Clear, persuasive brand messaging",
                "Higher engagement & conversion rates",
                "SEO-optimized, rank-ready content",
                "Emotionally resonant storytelling"
            ],
            platforms: ["WordPress", "Medium", "SEO Tools", "Content Management"]
        },
        {
            id: 10,
            title: "Sales-Aligned Marketing Systems",
            icon: <DashboardIcon />,
            tagline: "Where Marketing Meets Sales — and Revenue Follows",
            category: "MARKETING SYSTEMS",
            shortDesc: "Connect marketing, sales, and revenue into one seamless growth engine.",
            features: [
                "Email marketing systems",
                "WhatsApp bulk messaging",
                "CRM workflows & automation",
                "Lead qualification systems"
            ],
            benefits: [
                "Higher lead-to-sale conversion rates",
                "Better marketing ROI",
                "Faster sales response times",
                "Automated follow-ups & workflows"
            ],
            platforms: ["CRM Systems", "Email Platforms", "WhatsApp Business API", "Automation Tools"]
        },
        {
            id: 11,
            title: "Social Media Marketing",
            icon: <PeopleIcon />,
            tagline: "Community-Led. Conversion-Focused. Trust-Driven.",
            category: "SOCIAL MEDIA",
            shortDesc: "Build real communities and meaningful engagement that turn into conversions.",
            features: [
                "Social media strategy & planning",
                "Community-focused content creation",
                "Platform-specific content execution",
                "Engagement & comment management"
            ],
            benefits: [
                "Stronger brand voice & identity",
                "Engaged, loyal online communities",
                "Consistent, high-quality content",
                "Conversion-supportive social presence"
            ],
            platforms: ["LinkedIn", "Instagram", "Facebook", "X/Twitter", "TikTok"]
        },
        {
            id: 12,
            title: "Email Marketing",
            icon: <MailIcon />,
            tagline: "Turn Inboxes Into Conversations — and Conversations Into Revenue",
            category: "EMAIL MARKETING",
            shortDesc: "Nurture leads, activate customers, and drive repeat revenue — automatically.",
            features: [
                "Email strategy & planning",
                "Email automation & workflows",
                "Sales & conversion email copy",
                "Analytics, testing & optimization"
            ],
            benefits: [
                "Higher open & click-through rates",
                "Better lead nurturing & conversions",
                "Automated, consistent communication",
                "Stronger customer relationships"
            ],
            platforms: ["Mailchimp", "Klaviyo", "SendGrid", "ActiveCampaign", "HubSpot"]
        },
        {
            id: 13,
            title: "E-commerce Marketing",
            icon: <ShoppingBagIcon />,
            tagline: "Turn Browsers Into Buyers — and Buyers Into Repeat Customers",
            category: "E-COMMERCE",
            shortDesc: "Scale online stores with performance marketing, CRO, automation, and retention strategies.",
            features: [
                "Performance-driven e-commerce campaigns",
                "Conversion rate optimization (CRO)",
                "Retention & repeat purchase systems",
                "Data, tracking & optimization"
            ],
            benefits: [
                "Higher conversion rates",
                "Lower cost per purchase",
                "Increased average order value",
                "Better customer retention"
            ],
            platforms: ["Shopify", "WooCommerce", "BigCommerce", "Amazon", "Google Shopping"]
        },
        {
            id: 14,
            title: "Bulk WhatsApp Marketing",
            icon: <WhatsAppIcon />,
            tagline: "Direct. Personal. High-Conversion Messaging at Scale.",
            category: "WHATSAPP MARKETING",
            shortDesc: "Reach customers instantly, personally, and at scale with permission-based WhatsApp systems.",
            features: [
                "Bulk WhatsApp campaigns",
                "WhatsApp automation & flows",
                "CRM & funnel integration",
                "Performance tracking & optimization"
            ],
            benefits: [
                "90%+ message open rates",
                "Faster lead response & conversions",
                "Automated, scalable communication",
                "Higher engagement than email or SMS"
            ],
            platforms: ["WhatsApp Business API", "CRM Integration", "Automation Tools"]
        },
        {
            id: 15,
            title: "Brand Collaboration",
            icon: <HandshakeOutlinedIcon />,
            tagline: "Grow Faster by Growing Together",
            category: "COLLABORATIONS",
            shortDesc: "Expand reach, credibility, and revenue through strategic partnerships with aligned brands.",
            features: [
                "Strategic brand partnerships",
                "Campaign & co-marketing execution",
                "Creator & influencer collaborations",
                "Performance tracking & reporting"
            ],
            benefits: [
                "Access to new, relevant audiences",
                "Higher trust & brand credibility",
                "Shared marketing effort & cost efficiency",
                "Stronger brand positioning"
            ],
            platforms: ["Cross-Platform Promotion", "Co-Branded Campaigns", "Influencer Networks"]
        },
        {
            id: 16,
            title: "Influencer Marketing",
            icon: <PeopleIcon />,
            tagline: "Leverage Trust. Amplify Reach. Drive Real Conversions.",
            category: "INFLUENCER MARKETING",
            shortDesc: "Partner with authentic creators who have the trust of your ideal audience.",
            features: [
                "Influencer discovery & vetting",
                "Campaign strategy & execution",
                "Content & UGC creation",
                "Tracking, analytics & optimization"
            ],
            benefits: [
                "Access to trust-built audiences",
                "Higher engagement than traditional ads",
                "Authentic brand storytelling",
                "Reusable influencer content (UGC)"
            ],
            platforms: ["Instagram", "YouTube", "TikTok", "LinkedIn", "Twitch"]
        },
        {
            id: 17,
            title: "App Marketing",
            icon: <SmartphoneIcon />,
            tagline: "Drive Installs. Activate Users. Scale Retention.",
            category: "APP MARKETING",
            shortDesc: "Get apps discovered, downloaded, and actively used with sustainable growth systems.",
            features: [
                "App user acquisition",
                "App store optimization (ASO)",
                "Activation & onboarding optimization",
                "Retention & re-engagement systems"
            ],
            benefits: [
                "More quality app installs",
                "Lower cost per install (CPI)",
                "Higher activation & retention rates",
                "Improved app store visibility"
            ],
            platforms: ["Google Play", "App Store", "App Campaigns", "ASO Tools"]
        },
        {
            id: 18,
            title: "Go-To-Market (GTM) Strategies",
            icon: <FlagIcon />,
            tagline: "Launch Smarter. Enter Faster. Scale Confidently.",
            category: "STRATEGY",
            shortDesc: "Align product, audience, pricing, channels, and messaging into one executable growth plan.",
            features: [
                "Market & customer research",
                "Product positioning & messaging",
                "Pricing & offer strategy",
                "Channel & launch strategy"
            ],
            benefits: [
                "Faster market entry & adoption",
                "Clear product positioning",
                "Lower customer acquisition risk",
                "Aligned marketing & sales execution"
            ],
            platforms: ["Market Research", "Positioning Frameworks", "Launch Planning"]
        },
        {
            id: 19,
            title: "Site Optimization",
            icon: <SpeedIcon />,
            tagline: "Turn Your Website Into a High-Performance Growth Engine",
            category: "OPTIMIZATION",
            shortDesc: "Improve speed, usability, SEO health, and conversion flow for better results.",
            features: [
                "Website speed & performance optimization",
                "Technical SEO optimization",
                "Conversion rate optimization (CRO)",
                "UX/UI optimization"
            ],
            benefits: [
                "Faster website load times",
                "Higher conversion rates",
                "Improved SEO rankings",
                "Better user experience"
            ],
            platforms: ["Core Web Vitals", "SEO Tools", "CRO Tools", "Analytics"]
        },
        {
            id: 20,
            title: "Product Branding",
            icon: <BrandingWatermarkIcon />,
            tagline: "Turn Your Product Into a Recognizable, Trust-Built Brand",
            category: "PRODUCT BRANDING",
            shortDesc: "Position products clearly, differentiate in the market, and build emotional connection.",
            features: [
                "Product positioning & strategy",
                "Visual identity for products",
                "Product messaging & storytelling",
                "Brand guidelines & consistency"
            ],
            benefits: [
                "Clear product positioning",
                "Stronger brand recall & recognition",
                "Higher customer trust & adoption",
                "Consistent product experience"
            ],
            platforms: ["Brand Identity", "Packaging Design", "Visual Systems", "Brand Guidelines"]
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '400px',
                background: theme.palette.primary.main,
                opacity: 0.05,
                transform: 'skewY(-6deg)',
                transformOrigin: 'top left'
            }
        }}>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                {/* Hero Section (Banner Style) */}
                {/* Hero Section (Banner Style) */}
                <Box sx={{
                    py: { xs: 12, md: 20 },
                    textAlign: 'center',
                    background: 'linear-gradient(to right, #0f172a, #1e1b4b, #312e81)', // Match Career.jsx dark gradient
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Abstract Background Shapes (Blobs) */}
                    <Box sx={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '400px',
                        height: '400px',
                        background: 'rgba(37, 99, 235, 0.2)', // blue-600/20
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        zIndex: 0
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-5%',
                        width: '300px',
                        height: '300px',
                        background: 'rgba(147, 51, 234, 0.2)', // purple-600/20
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        zIndex: 0
                    }} />

                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Fade in={loaded} timeout={500}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 900,
                                    mb: 3,
                                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    animation: `${fadeInUp} 0.8s ease-out`,
                                }}
                            >
                                Build the <Box component="span" sx={{
                                    background: 'linear-gradient(to right, #f9a8d4, #d8b4fe, #a5b4fc)', // pink-300 to indigo-300
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Future</Box>
                                <br />
                                of <Box component="span" sx={{ color: 'white' }}>Service Excellence</Box>
                            </Typography>
                        </Fade>

                        <Fade in={loaded} timeout={800}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 6,
                                    color: 'rgba(219, 234, 254, 1)', // blue-100
                                    fontWeight: 400,
                                    maxWidth: 800,
                                    mx: 'auto',
                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                    lineHeight: 1.6,
                                    animation: `${fadeInUp} 0.8s ease-out 0.2s both`
                                }}
                            >
                                AI-Powered Marketing Solutions Built for Scalable Growth
                            </Typography>
                        </Fade>

                        <Fade in={loaded} timeout={1000}>
                            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        mb: 2,
                                        fontSize: '1.2rem',
                                        lineHeight: 1.7,
                                        color: 'rgba(255,255,255,0.85)',
                                        animation: `${fadeInUp} 0.8s ease-out 0.4s both`
                                    }}
                                >
                                    At AI Growth Exa, we don’t offer random services.
                                    We build complete growth ecosystems where AI, performance marketing, automation, and creativity work together.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.2rem',
                                        lineHeight: 1.7,
                                        color: 'rgba(255,255,255,0.85)',
                                        animation: `${fadeInUp} 0.8s ease-out 0.4s both`
                                    }}
                                >
                                    Whether your goal is leads, sales, brand authority, or scaling, we design the system around your business not templates.
                                </Typography>
                            </Box>
                        </Fade>
                    </Container >
                </Box >

                {/* Philosophy Section */}
                < Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                mb: 6,
                                fontWeight: 800,
                                color: theme.palette.text.primary
                            }}
                        >
                            Our Core Philosophy (Why Our Services Work)
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{
                                mb: 8,
                                maxWidth: 800,
                                mx: 'auto',
                                fontStyle: 'italic',
                                color: 'text.secondary'
                            }}
                        >
                            "Most agencies focus on activities. We focus on outcomes."
                        </Typography>

                        <Box sx={{ width: '100%', mx: 'auto', textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>Every service is:</Typography>
                            <Box sx={{
                                width: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                                '&::before, &::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    width: '100px',
                                    height: '100%',
                                    zIndex: 2,
                                    pointerEvents: 'none'
                                },
                                '&::before': {
                                    left: 0,
                                    background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)`
                                },
                                '&::after': {
                                    right: 0,
                                    background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)`
                                }
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: 'max-content',
                                    animation: `${marquee} 20s linear infinite`,
                                    '&:hover': {
                                        animationPlayState: 'paused'
                                    }
                                }}>
                                    {[...Array(3)].map((_, i) => (
                                        [
                                            {
                                                title: 'AI-Driven',
                                                icon: <PsychologyIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
                                                desc: 'Strategies powered by data, not guesswork.'
                                            },
                                            {
                                                title: 'ROI-Focused',
                                                icon: <TrendingUpIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
                                                desc: 'Every campaign differs, but the goal is profit.'
                                            },
                                            {
                                                title: 'Designed to Scale',
                                                icon: <RocketLaunchIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
                                                desc: 'Systems built to grow with your business.'
                                            },
                                            {
                                                title: 'Sales Integrated',
                                                icon: <HandshakeIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
                                                desc: 'Marketing that actually drives closed deals.'
                                            }
                                        ].map((item, index) => (
                                            <Box
                                                key={`${i}-${index}`}
                                                sx={{
                                                    width: { xs: 200, md: 220 },
                                                    mx: 1.5,
                                                    flexShrink: 0,
                                                    display: 'flex'
                                                }}
                                            >
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 3,
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 3,
                                                        bgcolor: alpha(theme.palette.background.paper, 0.6),
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1px solid',
                                                        borderColor: alpha(theme.palette.divider, 0.1),
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-8px)',
                                                            borderColor: theme.palette.primary.main,
                                                            boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}`
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{
                                                        mb: 2,
                                                        p: 1.5,
                                                        borderRadius: '50%',
                                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                        width: 60,
                                                        height: 60,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto'
                                                    }}>
                                                        {item.icon}
                                                    </Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                                                        {item.desc}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                        ))
                                    ))}
                                </Box>
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main
                                }}
                            >
                                That’s why our services don’t work in isolation they work together.
                            </Typography>
                        </Box>
                    </Container>
                </Box >


                {/* All Services List (Modern UI) */}
                <Box sx={{ py: 10, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h2"
                            align="center"
                            sx={{
                                mb: 8,
                                fontWeight: 800,
                                color: theme.palette.text.primary,
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            Our All Services
                        </Typography>

                        <Grid container spacing={3} justifyContent="center">
                            {[
                                { name: "AI Marketing Solutions (LLM Growth)", icon: <PsychologyIcon /> },
                                { name: "Performance Marketing", icon: <CampaignIcon />, subs: ["Google", "Meta", "LinkedIn", "YouTube"] },
                                { name: "SEO & Growth Strategy", icon: <SearchIcon /> },
                                { name: "Podcast Marketing", icon: <PodcastsIcon /> },
                                { name: "Social Media Marketing", icon: <PublicIcon /> },
                                { name: "GMB with AI Model", icon: <StoreIcon /> },
                                { name: "Funnel & Automation", icon: <FilterFramesIcon /> },
                                { name: "Branding & Creative", icon: <BrushIcon /> },
                                { name: "Logo Design", icon: <DrawIcon /> },
                                { name: "Website Development", icon: <CodeIcon /> },
                                { name: "Mobile Applications (Android / iOS)", icon: <SmartphoneIcon /> },
                                { name: "Content Creation & Writing", icon: <CreateIcon /> },
                                { name: "Marketing with Sales Alignment", icon: <HandshakeIcon /> },
                                { name: "Email Marketing", icon: <EmailIcon /> },
                                { name: "E-commerce Marketing", icon: <ShoppingCartIcon /> },
                                { name: "WhatsApp Bulk Messaging", icon: <WhatsAppIcon /> },
                                { name: "Brand Collaborations", icon: <GroupsIcon /> },
                                { name: "Influencer Marketing", icon: <PeopleIcon /> },
                                { name: "UX/UI Design", icon: <DesignServicesIcon /> },
                                { name: "Application Marketing", icon: <AppShortcutIcon /> },
                                { name: "Go-To-Market Strategies", icon: <FlagIcon /> }
                            ].map((service, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '180px',
                                            textAlign: 'center',
                                            borderRadius: 3,
                                            background: 'white',
                                            border: '1px solid',
                                            borderColor: alpha(theme.palette.divider, 0.1),
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: `0 12px 24px -10px ${alpha(theme.palette.primary.main, 0.15)}`,
                                                borderColor: theme.palette.primary.main,
                                                '& .icon-box': {
                                                    bgcolor: theme.palette.primary.main,
                                                    color: 'white',
                                                    transform: 'scale(1.1)'
                                                }
                                            }
                                        }}
                                    >
                                        <Box className="icon-box" sx={{
                                            mb: 2.5,
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                                            color: theme.palette.primary.main,
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {React.cloneElement(service.icon, { sx: { fontSize: 30 } })}
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem', mb: service.subs ? 0.5 : 0, lineHeight: 1.3 }}>
                                            {service.name}
                                        </Typography>

                                        {service.subs && (
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 1 }}>
                                                {service.subs.join(" • ")}
                                            </Typography>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Service Details Accordions */}
                <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                mb: 8,
                                fontWeight: 800,
                                color: theme.palette.text.primary
                            }}
                        >
                            Explore Details
                        </Typography>
                        {services.map((service) => (
                            <ServiceDetail
                                key={service.id}
                                service={service}
                                expanded={expandedService === service.id}
                                onChange={() => handleServiceExpand(service.id)}
                                theme={theme}
                                onStartService={handleStartService}
                            />
                        ))}
                    </Container>
                </Box>
            </Box>

            {/* Modal/Popup for Service Details */}
            <ServiceModal
                service={selectedService}
                open={serviceModalOpen}
                onClose={handleServiceModalClose}
                theme={theme}
                onStartService={handleStartService}
            />

            {/* Contact Form Modal */}
            <ContactFormModal
                open={contactFormOpen}
                onClose={handleContactFormClose}
                serviceName={selectedServiceName}
                theme={theme}
            />
        </Box>
    );
};

const ServicesPage = () => {
    const { theme: appTheme } = useAppTheme();

    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: appTheme || 'light',
            primary: {
                main: '#667eea',
            },
            background: {
                default: appTheme === 'dark' ? '#0f172a' : '#f8fafc', // Darker dark mode, lighter light mode like Career
                paper: appTheme === 'dark' ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: appTheme === 'dark' ? '#f1f5f9' : '#0f172a',
                secondary: appTheme === 'dark' ? '#94a3b8' : '#475569',
            },
        },
        typography: {
            fontFamily: '"Geist Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: { fontWeight: 800 },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 700 },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '0.5rem',
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '1rem',
                    }
                }
            }
        }
    }), [appTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {/* Main Page Wrapper with Gradient Background */}
            <Box sx={{
                minHeight: '100vh',
                background: appTheme === 'dark'
                    ? 'linear-gradient(to bottom, #0f172a, #1e1b4b)'
                    : 'linear-gradient(to bottom, #f8fafc, #ffffff, #eff6ff)',
                color: 'text.primary'
            }}>
                <ServicesContent />
            </Box>
        </ThemeProvider>
    );
};

export default ServicesPage;