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
    KeyboardArrowRight as KeyboardArrowRightIcon,
    Mic as MicIcon,
    CampaignOutlined as CampaignOutlinedIcon,
    Brush as BrushIcon,
    Code as CodeIcon,
    Draw as DrawIcon,
    DesignServices as DesignServicesIcon
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
            title: "Performance Marketing",
            icon: <RocketLaunchIcon />,
            tagline: "AI-Powered Advertising That Delivers Real ROI",
            category: "PAID ADVERTISING",
            shortDesc: "Measurable growth campaigns across Google, Meta, LinkedIn, and YouTube with AI optimization.",
            platforms: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads"],
            features: [
                "Precision AI-powered targeting",
                "Data-driven campaign optimization",
                "AI-assisted decision making",
                "Full-funnel performance strategy"
            ],
            benefits: [
                "Higher ROI on ad spend",
                "Lower cost per lead & acquisition",
                "AI-optimized campaign performance",
                "Clear reporting & transparency"
            ],
            faqs: [
                { q: "What is performance marketing?", a: "Results-driven advertising optimized for measurable outcomes like leads, sales, and ROI." },
                { q: "How does AI improve paid ads?", a: "AI analyzes data faster, predicts behavior, optimizes bids, and improves targeting." },
                { q: "How long to see results?", a: "Most campaigns show improvements within 2-4 weeks." }
            ]
        },
        {
            id: 3,
            title: "SEO & Growth Strategy",
            icon: <TrendingUpIcon />,
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
            faqs: [
                { q: "What is SEO & growth strategy?", a: "Combines SEO with data-driven planning to increase traffic, leads, and business results." },
                { q: "How is AI used in SEO?", a: "AI analyzes search behavior, predicts trends, and optimizes content faster." },
                { q: "How long does SEO take?", a: "Most websites see improvements within 3-6 months with continuous growth." }
            ]
        },
        {
            id: 4,
            title: "Podcast Marketing",
            icon: <MicIcon />,
            tagline: "Build Authority. Earn Attention. Create Trust at Scale.",
            category: "CONTENT MARKETING",
            shortDesc: "Authority-building audio content and strategy for deep audience connection and influence.",
            features: [
                "Podcast strategy & positioning",
                "Authority-building content planning",
                "Niche audience targeting",
                "Episode optimization & distribution"
            ],
            benefits: [
                "Stronger brand authority & trust",
                "Loyal, high-intent audience",
                "Long-form trust building",
                "Position as industry expert"
            ],
            faqs: [
                { q: "What is podcast marketing?", a: "Uses audio content to build authority, trust, and long-term audience engagement." },
                { q: "Effective for B2B brands?", a: "Yes, highly effective for B2B authority building and thought leadership." },
                { q: "Better than paid ads?", a: "Builds long-term trust while ads deliver short-term results - both work together." }
            ]
        },
        {
            id: 5,
            title: "Social Media Marketing",
            icon: <CampaignOutlinedIcon />,
            tagline: "Community-Led. Conversion-Focused. Trust-Driven.",
            category: "SOCIAL MEDIA",
            shortDesc: "Build real communities and meaningful engagement that convert, not just vanity metrics.",
            platforms: ["LinkedIn", "Instagram", "Facebook", "X/Twitter"],
            features: [
                "Community-focused content creation",
                "Platform-specific strategy",
                "Engagement & comment management",
                "Brand voice & storytelling"
            ],
            benefits: [
                "Stronger brand voice & identity",
                "Engaged, loyal communities",
                "Higher engagement & trust signals",
                "Conversion-supportive presence"
            ],
            faqs: [
                { q: "What is social media marketing?", a: "Uses content and engagement strategies to build brand awareness and generate leads." },
                { q: "How does it help business growth?", a: "Builds trust, improves visibility, engages audiences, and supports conversions." },
                { q: "Better than paid ads?", a: "Builds long-term trust while ads deliver faster visibility - use both." }
            ]
        },
        {
            id: 6,
            title: "GMB with AI Model",
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
            faqs: [
                { q: "What is GMB optimization?", a: "Improves your Google Business Profile to increase visibility in local search results." },
                { q: "How does AI help local SEO?", a: "AI automates reviews, engagement, keyword optimization for better local rankings." },
                { q: "Can GMB increase calls?", a: "Yes, fully optimized GMB directly increases phone calls and walk-in traffic." }
            ]
        },
        {
            id: 7,
            title: "Funnel & Automation",
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
            faqs: [
                { q: "What is a funnel & automation system?", a: "Captures leads, nurtures prospects, automates sales follow-ups to increase conversions." },
                { q: "Why important for growth?", a: "Guides users through buying journey, increasing trust and purchase likelihood." },
                { q: "Suitable for small businesses?", a: "Yes, helps small businesses compete efficiently by automating processes." }
            ]
        },
        {
            id: 8,
            title: "Branding & Creative",
            icon: <StarIcon />,
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
            faqs: [
                { q: "What is branding?", a: "Defines how a business looks, feels, and communicates with its audience." },
                { q: "Why important for growth?", a: "Builds trust, improves recall, increases conversions across all channels." },
                { q: "Do you redesign existing brands?", a: "Yes, we offer brand refresh services while maintaining brand equity." }
            ]
        },
        {
            id: 9,
            title: "Logo Design",
            icon: <BrushIcon />,
            tagline: "Strategic Logos That Build Brand Recognition",
            category: "DESIGN",
            shortDesc: "Scalable, modern logo systems designed for recall and recognition across platforms.",
            features: [
                "Strategic logo concepts",
                "Scalable logo systems",
                "Brand recall-focused design",
                "Multiple format delivery"
            ],
            benefits: [
                "Instant brand recognition",
                "Professional first impression",
                "Versatile across all media",
                "Timeless, scalable design"
            ],
            faqs: [
                { q: "Do you design logos from scratch?", a: "Yes, original strategic designs tailored to your brand positioning." },
                { q: "How long does logo design take?", a: "Typically 2-3 weeks including research, concepts, and revisions." },
                { q: "Do you provide brand guidelines?", a: "Yes, complete guidelines for consistent usage across platforms." }
            ]
        },
        {
            id: 10,
            title: "Website Development",
            icon: <CodeIcon />,
            tagline: "Your Digital Salesperson — Built to Convert",
            category: "DEVELOPMENT",
            shortDesc: "High-performance websites optimized for speed, SEO, and conversion-focused UX.",
            features: [
                "Business & corporate websites",
                "Landing pages & sales pages",
                "SEO-friendly architecture",
                "Speed-optimized responsive builds"
            ],
            benefits: [
                "Higher conversion rates",
                "Faster load times & better performance",
                "Mobile-first responsive design",
                "Scalable & secure development"
            ],
            faqs: [
                { q: "What is conversion-focused web development?", a: "Designs websites to guide users toward specific actions like leads or purchases." },
                { q: "Are websites SEO-friendly?", a: "Yes, built with clean code, fast load times, and SEO-friendly structure." },
                { q: "How long does development take?", a: "Websites typically take 3-6 weeks depending on complexity." }
            ]
        },
        {
            id: 11,
            title: "Mobile Applications",
            icon: <SmartphoneIcon />,
            tagline: "Drive Installs. Activate Users. Scale Retention.",
            category: "APP DEVELOPMENT",
            shortDesc: "Android & iOS apps with user-centric design and performance-driven functionality.",
            features: [
                "User-centric mobile app design",
                "Scalable app development",
                "Clean, intuitive interfaces",
                "Performance-driven functionality"
            ],
            benefits: [
                "Higher user engagement",
                "Improved retention rates",
                "Better app store visibility",
                "Scalable app architecture"
            ],
            faqs: [
                { q: "Do you build both Android and iOS?", a: "Yes, we develop for both platforms." },
                { q: "How long for app development?", a: "Depends on features, typically 2-4 months." },
                { q: "Do you provide ongoing support?", a: "Yes, we offer maintenance and optimization support." }
            ]
        },
        {
            id: 12,
            title: "Content Creation & Writing",
            icon: <DrawIcon />,
            tagline: "Words Sell. Stories Convert. Strategy Scales.",
            category: "CONTENT",
            shortDesc: "Human-written, SEO-optimized content that influences decisions and drives action.",
            features: [
                "Website copy & landing pages",
                "SEO blogs & articles",
                "Brand storytelling",
                "Sales-driven content"
            ],
            benefits: [
                "Clear, persuasive messaging",
                "Higher engagement & conversions",
                "SEO-optimized, rank-ready",
                "Consistent brand voice"
            ],
            faqs: [
                { q: "Is content human-written or AI?", a: "All content is human-written, AI used only for research & optimization." },
                { q: "How does content help SEO?", a: "Improves rankings by matching user intent, keywords, and value." },
                { q: "Can content increase conversions?", a: "Yes, builds trust, removes objections, guides users toward action." }
            ]
        },
        {
            id: 13,
            title: "Marketing with Sales Alignment",
            icon: <GroupsIcon />,
            tagline: "Where Marketing Meets Sales — and Revenue Follows",
            category: "SALES ENABLEMENT",
            shortDesc: "Connect marketing efforts directly with sales processes to increase conversions.",
            features: [
                "Email marketing systems",
                "WhatsApp bulk messaging",
                "CRM workflows & automation",
                "Lead qualification systems"
            ],
            benefits: [
                "Higher lead-to-sale conversion",
                "Better marketing ROI",
                "Faster sales response times",
                "Automated follow-ups"
            ],
            faqs: [
                { q: "What is sales-aligned marketing?", a: "Connects marketing directly with sales processes to increase conversions." },
                { q: "Why important?", a: "Prevents lead loss, improves follow-ups, ensures marketing generates sales." },
                { q: "Suitable for small businesses?", a: "Yes, automation helps small teams scale without increasing manpower." }
            ]
        },
        {
            id: 14,
            title: "Email Marketing",
            icon: <EmailIcon />,
            tagline: "Turn Inboxes Into Conversations — and Conversations Into Revenue",
            category: "EMAIL MARKETING",
            shortDesc: "Relationship-first email systems that nurture leads and drive repeat revenue automatically.",
            features: [
                "Email strategy & planning",
                "Automation workflows",
                "Sales & conversion email copy",
                "Analytics & optimization"
            ],
            benefits: [
                "Higher open & click-through rates",
                "Better lead nurturing & conversions",
                "Automated consistent communication",
                "Increased repeat sales"
            ],
            faqs: [
                { q: "Is email marketing still effective?", a: "Yes, consistently delivers highest ROI among digital channels." },
                { q: "Can email be automated?", a: "Yes, allows timely, personalized emails without manual effort." },
                { q: "How long to see results?", a: "Most campaigns show engagement improvements within 2-4 weeks." }
            ]
        },
        {
            id: 15,
            title: "E-commerce Marketing",
            icon: <ShoppingCartIcon />,
            tagline: "Turn Browsers Into Buyers — and Buyers Into Repeat Customers",
            category: "E-COMMERCE",
            shortDesc: "Performance marketing, CRO, and retention systems for scalable online store growth.",
            features: [
                "Performance-driven campaigns",
                "Conversion rate optimization",
                "Retention & repeat purchase systems",
                "Data & tracking"
            ],
            benefits: [
                "Higher conversion rates",
                "Lower cost per purchase",
                "Increased average order value",
                "Better customer retention"
            ],
            faqs: [
                { q: "What is e-commerce marketing?", a: "Digital strategies to attract shoppers, convert buyers, increase repeat purchases." },
                { q: "Do you manage e-commerce ads?", a: "Yes, manage and optimize performance-driven e-commerce campaigns." },
                { q: "Suitable for small brands?", a: "Yes, strategic optimization helps small brands compete efficiently." }
            ]
        },
        {
            id: 16,
            title: "WhatsApp Bulk Messaging",
            icon: <ChatIcon />,
            tagline: "Direct. Personal. High-Conversion Messaging at Scale.",
            category: "MESSAGING",
            shortDesc: "Permission-based WhatsApp automation for instant, personalized customer communication.",
            features: [
                "Bulk WhatsApp campaigns",
                "Automation & flows",
                "CRM integration",
                "Performance tracking"
            ],
            benefits: [
                "90%+ message open rates",
                "Faster lead response & conversions",
                "Automated scalable communication",
                "Higher engagement than email/SMS"
            ],
            faqs: [
                { q: "What is bulk WhatsApp marketing?", a: "Uses WhatsApp Business APIs to send messages to multiple users for promotions." },
                { q: "Is it legal?", a: "Yes, when done with user consent and WhatsApp policy compliance." },
                { q: "How effective?", a: "Significantly higher open and response rates than email and SMS." }
            ]
        },
        {
            id: 17,
            title: "Brand Collaborations",
            icon: <HandshakeIcon />,
            tagline: "Grow Faster by Growing Together",
            category: "PARTNERSHIPS",
            shortDesc: "Strategic partnerships with aligned brands for expanded reach and credibility.",
            features: [
                "Strategic brand partnerships",
                "Campaign & co-marketing execution",
                "Creator & influencer collaborations",
                "Audience alignment analysis"
            ],
            benefits: [
                "Access to new relevant audiences",
                "Higher trust & brand credibility",
                "Shared marketing cost efficiency",
                "Stronger brand positioning"
            ],
            faqs: [
                { q: "What is brand collaboration?", a: "Strategy where brands work together to reach new audiences and create value." },
                { q: "Better than paid ads?", a: "Builds long-term credibility while ads provide short-term visibility - both work." },
                { q: "Suitable for small brands?", a: "Yes, helps small brands grow faster without large ad budgets." }
            ]
        },
        {
            id: 18,
            title: "Influencer Marketing",
            icon: <PersonIcon />,
            tagline: "Leverage Trust. Amplify Reach. Drive Real Conversions.",
            category: "INFLUENCER MARKETING",
            shortDesc: "Authentic creator partnerships that build trust and drive measurable outcomes.",
            features: [
                "Influencer discovery & vetting",
                "Campaign strategy & execution",
                "Content & UGC creation",
                "Tracking & analytics"
            ],
            benefits: [
                "Access to trust-built audiences",
                "Higher engagement than traditional ads",
                "Authentic brand storytelling",
                "Reusable influencer content"
            ],
            faqs: [
                { q: "What is influencer marketing?", a: "Collaborate with creators to promote products through trusted, authentic content." },
                { q: "Work with micro-influencers?", a: "Yes, they often deliver higher engagement and niche influence." },
                { q: "Suitable for small brands?", a: "Yes, strategic partnerships help small brands grow with limited budgets." }
            ]
        },
        {
            id: 19,
            title: "UX/UI Design",
            icon: <DesignServicesIcon />,
            tagline: "User-Centric Design That Converts",
            category: "DESIGN",
            shortDesc: "Conversion-focused user experiences that reduce friction and guide actions.",
            features: [
                "User journey & behavior mapping",
                "Wireframes & design systems",
                "Conversion-focused UI patterns",
                "Accessibility & usability optimization"
            ],
            benefits: [
                "Improved user experience & retention",
                "Higher conversion rates",
                "Reduced bounce rates",
                "Better customer satisfaction"
            ],
            faqs: [
                { q: "Why is UX/UI important for growth?", a: "Improves usability, reduces bounce rates, increases conversions." },
                { q: "Do you redesign existing products?", a: "Yes, specialize in optimizing existing products for better performance." },
                { q: "Provide design systems?", a: "Yes, deliver complete design systems for consistency." }
            ]
        },
        {
            id: 20,
            title: "Application Marketing",
            icon: <AppShortcutIcon />,
            tagline: "Drive Installs. Activate Users. Scale Retention.",
            category: "APP MARKETING",
            shortDesc: "ASO, user acquisition, and retention systems for sustainable app growth.",
            features: [
                "App user acquisition",
                "App store optimization (ASO)",
                "Activation & onboarding optimization",
                "Retention systems"
            ],
            benefits: [
                "More quality app installs",
                "Lower cost per install (CPI)",
                "Higher activation & retention rates",
                "Improved app store visibility"
            ],
            faqs: [
                { q: "What is app marketing?", a: "Promotes mobile apps to increase installs, engagement, and user retention." },
                { q: "What is ASO?", a: "App Store Optimization improves app visibility in stores for organic downloads." },
                { q: "Reduce app uninstall rates?", a: "Yes, optimize onboarding and engagement to improve retention." }
            ]
        },
        {
            id: 21,
            title: "Go-To-Market Strategies",
            icon: <FlagIcon />,
            tagline: "Launch Smarter. Enter Faster. Scale Confidently.",
            category: "STRATEGY",
            shortDesc: "Structured market entry plans aligning product, audience, and channels for success.",
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
                "Aligned marketing & sales"
            ],
            faqs: [
                { q: "What is a GTM strategy?", a: "Defines how a product is positioned, priced, launched, and sold to target audience." },
                { q: "Only for startups?", a: "No, useful for startups, scaleups, and businesses entering new markets." },
                { q: "How long to build?", a: "Most GTM strategies developed within 3-6 weeks depending on complexity." }
            ]
        },
        {
            id: 22,
            title: "Site Optimization",
            icon: <TuneIcon />,
            tagline: "Turn Your Website Into a High-Performance Growth Engine",
            category: "OPTIMIZATION",
            shortDesc: "Speed, SEO, and conversion optimization for better performance and user experience.",
            features: [
                "Website speed optimization",
                "Technical SEO",
                "Conversion rate optimization",
                "UX/UI optimization"
            ],
            benefits: [
                "Faster website load times",
                "Higher conversion rates",
                "Improved SEO rankings",
                "Better user experience"
            ],
            faqs: [
                { q: "What is site optimization?", a: "Improves website speed, SEO, UX, and conversion performance." },
                { q: "Different from SEO?", a: "SEO focuses on visibility, optimization focuses on performance & conversions." },
                { q: "Suitable for small businesses?", a: "Yes, helps get more value without increasing ad spend." }
            ]
        },
        {
            id: 23,
            title: "Product Branding",
            icon: <CategoryIcon />,
            tagline: "Turn Your Product Into a Recognizable, Trust-Built Brand",
            category: "BRANDING",
            shortDesc: "Market-ready product identities with clear positioning and emotional connection.",
            features: [
                "Product positioning & strategy",
                "Visual identity",
                "Product messaging & storytelling",
                "Brand guidelines"
            ],
            benefits: [
                "Clear product positioning",
                "Stronger brand recall & recognition",
                "Higher customer trust & adoption",
                "Better marketing performance"
            ],
            faqs: [
                { q: "What is product branding?", a: "Creates distinct identity for a product through positioning, design, messaging." },
                { q: "Rebrand existing products?", a: "Yes, help refresh and reposition existing products for better performance." },
                { q: "Suitable for digital products?", a: "Yes, specialize in both physical and digital products." }
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
