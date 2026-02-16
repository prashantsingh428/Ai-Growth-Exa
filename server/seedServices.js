const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./src/models/Service');

dotenv.config();

const services = [
    {
        id: 1,
        title: "AI Marketing Solutions (LLM Growth)",
        iconName: "AutoAwesomeIcon",
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
        iconName: "TrendingUpIcon",
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
        iconName: "SearchIcon",
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
        iconName: "PodcastsIcon",
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
        iconName: "StoreIcon",
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
        iconName: "BoltIcon",
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
        iconName: "BrushIcon",
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
        iconName: "WebIcon",
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
        iconName: "CreateIcon",
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
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Service.deleteMany({});
        console.log('Cleared existing services.');

        await Service.insertMany(services);
        console.log('Successfully seeded services!');

        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
