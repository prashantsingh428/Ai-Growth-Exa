import React, { useState, useEffect, useMemo, memo } from 'react';
import { useTheme as useAppTheme } from '../context/ThemeContext';
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
    CssBaseline
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
    KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import InView from '../components/InView';

// Minimal animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ServiceCard = memo(({ service, index, theme }) => (
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
                        {service.shortDesc || service.overview}
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
                        href={`#service-${service.id}`}
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

const ServiceDetail = memo(({ service, expanded, onChange, theme }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="80px">
        <Accordion
            id={`service-${service.id}`}
            expanded={expanded}
            onChange={onChange}
            transitionProps={{ unmountOnExit: true }}
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
                                {service.shortDesc || service.overview}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<RocketLaunchIcon />}
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

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    const services = [
        {
            id: 1,
            title: "AI Marketing Solutions (LLM Growth)",
            icon: <AutoAwesomeIcon />,
            tagline: "Smart Growth Starts With Intelligent AI Systems",

            overview: "Traditional marketing relies on guesswork. We rely on intelligence.",
            features: [
                "Predict Customer Behavior",
                "Intelligent Targeting & Messaging",
                "Marketing Automation That Thinks",
                "Funnel Optimization With AI"
            ],
            benefits: [
                "Data-Driven Decisions – No assumptions, only insights",
                "Higher Conversion Rates – Smarter funnels powered by AI",
                "Cost Efficiency – Reduce ad waste with predictive targeting",
                "Scalable Growth – Systems that grow as your business grows",
                "Real-Time Optimization – Campaigns improve automatically",
                "Future-Proof Strategy – Built for evolving AI & digital trends"
            ],
            idealFor: [
                "SaaS & Tech Companies",
                "E-commerce Brands",
                "Startups & Scaleups",
                "Agencies looking to upgrade with AI",
                "Businesses tired of inconsistent marketing results"
            ]
        },
        {
            id: 2,
            title: "Performance Marketing",
            icon: <RocketLaunchIcon />,
            tagline: "AI-Powered Advertising That Delivers Real ROI",

            overview: "Smarter Ads. Faster Growth. Better Results.",
            platforms: ["Google Ads", "Meta Ads (Facebook & Instagram)", "LinkedIn Ads", "YouTube Ads"],
            features: [
                "Google Ads & Meta Ads",
                "LinkedIn & YouTube Ads",
                "AI-Assisted Decision Making",
                "Full-Funnel Performance Strategy"
            ]
        },
        {
            id: 3,
            title: "SEO & Growth Strategy",
            icon: <TrendingUpIcon />,
            tagline: "AI-Driven SEO That Fuels Long-Term Growth",

            overview: "Build Visibility. Drive Traffic. Scale Growth.",
            features: [
                "AI-Powered Keyword Research",
                "Technical SEO Optimization",
                "Content & Topical Authority",
                "Growth-Focused SEO Execution"
            ]
        },
        {
            id: 4,
            title: "Podcast & Social Media Marketing",
            icon: <CampaignIcon />,
            tagline: "Build Authority. Earn Attention. Create Trust at Scale.",

            overview: "Attention Is Currency — We Help You Earn It",
            features: [
                "Podcast Strategy & Positioning",
                "Authority-First Content Strategy",
                "Community Building & Engagement",
                "Multi-Platform Content Leverage"
            ]
        },
        {
            id: 5,
            title: "GMB with AI Model",
            icon: <StoreIcon />,
            tagline: "Dominate Local Search with AI-Powered Visibility",

            overview: "Local Businesses Need Visibility Where Buyers Search",
            features: [
                "Complete GMB Optimization",
                "AI-Driven Local Keyword Strategy",
                "Automated Reviews & Engagement",
                "Local Ranking Improvement"
            ]
        },
        {
            id: 6,
            title: "Funnel & Automation Systems",
            icon: <BoltIcon />,
            tagline: "Turn Traffic Into Revenue — Automatically",

            overview: "Traffic Without a Funnel Is Wasted Money",
            features: [
                "High-Converting Lead Funnels",
                "Sales Automation Workflows",
                "CRM Integrations & Data Syncing",
                "AI-Assisted Funnel Optimization"
            ]
        },
        {
            id: 7,
            title: "Branding, Creative & Design",
            icon: <StarIcon />,
            tagline: "Design That Builds Recall. Creativity That Drives Growth.",

            overview: "Growth Needs a Strong Brand Foundation",
            features: [
                "Brand Positioning & Messaging",
                "Visual Identity Systems",
                "Logo Design & Brand Guidelines",
                "Performance-Optimized Assets"
            ]
        },
        {
            id: 8,
            title: "Web, App & UX/UI Development",
            icon: <SmartphoneIcon />,
            tagline: "Your Digital Salesperson — Built to Convert",

            overview: "Your Website or App Is Your Digital Salesperson",
            features: [
                "High-Conversion Websites",
                "Mobile Apps (Android / iOS)",
                "User-Centric UX/UI Systems",
                "Conversion-Focused Development"
            ]
        },
        {
            id: 9,
            title: "Content Creation & Writing",
            icon: <EmailIcon />,
            tagline: "Words Sell. Stories Convert. Strategy Scales.",

            overview: "Content Is the Voice of Your Brand",
            features: [
                "Website Copy & Landing Pages",
                "SEO Blogs & Articles",
                "Brand Storytelling",
                "Sales-Driven Content"
            ]
        },
        {
            id: 10,
            title: "Sales-Aligned Marketing Systems",
            icon: <GroupsIcon />,
            tagline: "Where Marketing Meets Sales — and Revenue Follows",

            overview: "Marketing Without Sales Alignment Fails",
            features: [
                "Email Marketing Systems",
                "WhatsApp Bulk Messaging",
                "CRM Workflows & Automation",
                "Lead Qualification Systems"
            ]
        },
        {
            id: 11,
            title: "Social Media Marketing",
            icon: <CampaignIcon />,
            tagline: "Community-Led. Conversion-Focused. Trust-Driven.",

            overview: "Attention Is Currency — and We Help You Earn It",
            features: [
                "Community-Focused Content Creation",
                "Platform-Specific Strategy",
                "Engagement & Comment Management",
                "Brand Voice & Storytelling"
            ]
        },
        {
            id: 12,
            title: "Email Marketing",
            icon: <EmailIcon />,
            tagline: "Turn Inboxes Into Conversations — and Conversations Into Revenue",

            overview: "Email Is Still One of the Highest-ROI Channels",
            features: [
                "Email Strategy & Planning",
                "Automation Workflows",
                "Sales & Conversion Email Copy",
                "Analytics & Optimization"
            ]
        },
        {
            id: 13,
            title: "E-commerce Marketing",
            icon: <ShoppingCartIcon />,
            tagline: "Turn Browsers Into Buyers — and Buyers Into Repeat Customers",

            overview: "E-commerce Growth Is Not About Traffic — It's About Systems",
            features: [
                "Performance-Driven Campaigns",
                "Conversion Rate Optimization",
                "Retention Systems",
                "Data & Tracking"
            ]
        },
        {
            id: 14,
            title: "WhatsApp Bulk Marketing",
            icon: <ChatIcon />,
            tagline: "Direct. Personal. High-Conversion Messaging at Scale.",

            overview: "WhatsApp Is Where Conversations Convert",
            features: [
                "Bulk WhatsApp Campaigns",
                "Automation & Flows",
                "CRM Integration",
                "Performance Tracking"
            ]
        },
        {
            id: 15,
            title: "Brand Collaboration",
            icon: <HandshakeIcon />,
            tagline: "Grow Faster by Growing Together",

            overview: "Growth Multiplies When the Right Brands Align",
            features: [
                "Strategic Brand Partnerships",
                "Campaign & Co-Marketing",
                "Creator & Influencer Collaborations",
                "Audience Alignment Analysis"
            ]
        },
        {
            id: 16,
            title: "Influencer Marketing",
            icon: <PersonIcon />,
            tagline: "Leverage Trust. Amplify Reach. Drive Real Conversions.",
            color: "#eab308", // Yellow
            overview: "Influence Works When Trust Leads the Message",
            features: [
                "Influencer Discovery & Vetting",
                "Campaign Strategy & Execution",
                "Content & UGC Creation",
                "Tracking & Analytics"
            ]
        },
        {
            id: 17,
            title: "App Marketing",
            icon: <AppShortcutIcon />,
            tagline: "Drive Installs. Activate Users. Scale Retention.",
            color: "#84cc16", // Lime
            overview: "An App Without Users Is Just Code",
            features: [
                "App User Acquisition",
                "App Store Optimization (ASO)",
                "Activation & Onboarding",
                "Retention Systems"
            ]
        },
        {
            id: 18,
            title: "Go-To-Market Strategies",
            icon: <FlagIcon />,
            tagline: "Launch Smarter. Enter Faster. Scale Confidently.",
            color: "#f97316", // Orange
            overview: "A Great Product Fails Without the Right Market Strategy",
            features: [
                "Market & Customer Research",
                "Product Positioning & Messaging",
                "Pricing & Offer Strategy",
                "Channel & Launch Strategy"
            ]
        },
        {
            id: 19,
            title: "Site Optimization",
            icon: <TuneIcon />,
            tagline: "Turn Your Website Into a High-Performance Growth Engine",
            color: "#2dd4bf", // Teal
            overview: "A Slow, Confusing Website Kills Growth",
            features: [
                "Website Speed Optimization",
                "Technical SEO",
                "Conversion Rate Optimization",
                "UX/UI Optimization"
            ]
        },
        {
            id: 20,
            title: "Product Branding",
            icon: <CategoryIcon />,
            tagline: "Turn Your Product Into a Recognizable, Trust-Built Brand",
            color: "#a855f7", // Purple
            overview: "Great Products Don't Sell Themselves — Brands Do",
            features: [
                "Product Positioning & Strategy",
                "Visual Identity",
                "Product Messaging & Storytelling",
                "Brand Guidelines"
            ]
        }
    ];

    const handleServiceExpand = (serviceId) => {
        setExpandedService(expandedService === serviceId ? null : serviceId);
    };

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
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                {/* Hero Section */}
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Fade in={loaded} timeout={500}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                color: theme.palette.text.primary,
                                animation: `${fadeInUp} 0.8s ease-out`
                            }}
                        >
                            AI-Powered Marketing Solutions
                        </Typography>
                    </Fade>

                    <Fade in={loaded} timeout={800}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                color: 'text.secondary',
                                maxWidth: 800,
                                mx: 'auto',
                                animation: `${fadeInUp} 0.8s ease-out 0.2s both`
                            }}
                        >
                            Built for Scalable Growth. We don't offer random services. We build complete growth ecosystems.
                        </Typography>
                    </Fade>

                    <Fade in={loaded} timeout={1000}>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 6,
                                maxWidth: 900,
                                mx: 'auto',
                                fontSize: '1.1rem',
                                lineHeight: 1.7,
                                animation: `${fadeInUp} 0.8s ease-out 0.4s both`
                            }}
                        >
                            At AI Growth Exa, we don't offer random services. We build complete growth ecosystems where AI,
                            performance marketing, automation, and creativity work together. Whether your goal is leads,
                            sales, brand authority, or scaling, we design the system around your business not templates.
                        </Typography>
                    </Fade>
                </Box>

                {/* Philosophy Section */}
                <Box sx={{ py: 6, mb: 6 }}>
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            mb: 6,
                            fontWeight: 800,
                            fontWeight: 800,
                            color: theme.palette.text.primary
                        }}
                    >
                        Our Core Philosophy
                    </Typography>

                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            mb: 6,
                            maxWidth: 800,
                            mx: 'auto',
                            fontStyle: 'italic',
                            color: 'text.secondary'
                        }}
                    >
                        "Most agencies focus on activities. We focus on outcomes."
                    </Typography>

                    <Grid container spacing={4}>
                        {[
                            { icon: <AutoAwesomeIcon />, title: "AI-driven", desc: "Leveraging artificial intelligence for smarter decisions" },
                            { icon: <TrendingUpIcon />, title: "ROI-focused", desc: "Every strategy measured by return on investment" },
                            { icon: <RocketLaunchIcon />, title: "Designed to scale", desc: "Growth systems that expand with your business" },
                            { icon: <GroupsIcon />, title: "Integrated journeys", desc: "Seamless customer experiences across all touchpoints" }
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Fade in={loaded} timeout={index * 200 + 300}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: alpha(theme.palette.divider, 0.1),
                                        background: alpha(theme.palette.background.paper, 0.6),
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: alpha(theme.palette.primary.main, 0.2),
                                            background: alpha(theme.palette.background.paper, 0.9),
                                        }
                                    }}>
                                        <Box sx={{
                                            display: 'inline-flex',
                                            p: 2,
                                            borderRadius: '50%',
                                            p: 2,
                                            borderRadius: '50%',
                                            background: theme.palette.primary.main,
                                            color: 'white',
                                            mb: 2
                                        }}>
                                            {item.icon}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* All Services Grid */}
                <Box sx={{ py: 6 }}>
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            mb: 6,
                            fontWeight: 800,
                            fontWeight: 800,
                            color: theme.palette.text.primary
                        }}
                    >
                        Our Services
                    </Typography>

                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            mb: 6,
                            color: 'text.secondary',
                            maxWidth: 800,
                            mx: 'auto'
                        }}
                    >
                        Explore our comprehensive suite of growth solutions.
                    </Typography>

                    <Grid container spacing={4}>
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={6} md={4} key={service.id}>
                                <ServiceCard service={service} index={index} theme={theme} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Service Details Accordions */}
                <Box sx={{ py: 6 }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            mb: 4,
                            fontWeight: 700
                        }}
                    >
                        Service Details
                    </Typography>
                    {services.map((service) => (
                        <ServiceDetail
                            key={service.id}
                            service={service}
                            expanded={expandedService === service.id}
                            onChange={() => handleServiceExpand(service.id)}
                            theme={theme}
                        />
                    ))}
                </Box>

                { }
                <Box sx={{ py: 10, textAlign: 'center' }}>
                    <Fade in={loaded} timeout={1200}>
                        <Button
                            variant="contained"
                            size="large"
                            href="/contact"
                            sx={{
                                px: 6,
                                py: 2,
                                borderRadius: 2,
                                background: theme.palette.primary.main,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: theme.shadows[8]
                                }
                            }}
                        >
                            Start Your Growth Journey
                        </Button>
                    </Fade>
                </Box>
            </Container>
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
                default: appTheme === 'dark' ? '#111827' : '#ffffff',
                paper: appTheme === 'dark' ? '#1f2937' : '#ffffff',
            },
            text: {
                primary: appTheme === 'dark' ? '#ffffff' : '#111827',
                secondary: appTheme === 'dark' ? '#9ca3af' : '#4b5563',
            },
        },
        typography: {
            fontFamily: '"Geist Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    }
                }
            }
        }
    }), [appTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <ServicesContent />
        </ThemeProvider>
    );
};

export default ServicesPage;
