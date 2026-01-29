import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tab,
  Tabs,
  Skeleton,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  TrendingUp,
  Computer,
  Psychology,
  Business,
  Science,
  Refresh,
  Bookmark,
  BookmarkBorder,
  SmartToy,
  Rocket,
  MoreVert,
} from '@mui/icons-material';

const NewsFeedCompact = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarked, setBookmarked] = useState(new Set());

  // Compact news categories
  const categories = [
    { label: 'For You', icon: <SmartToy />, query: 'artificial intelligence machine learning' },
    { label: 'Technology', icon: <Computer />, query: 'technology innovation' },
    { label: 'Business', icon: <Business />, query: 'business trends' },
    { label: 'Science', icon: <Science />, query: 'science research' },
    { label: 'Innovation', icon: <Rocket />, query: 'innovation breakthrough' },
  ];

  // Fetch news data with real API integration
  const fetchNewsData = async (category) => {
    try {
      setRefreshing(true);
      
      const API_KEY = '215cf023acfdd5b931f7c6ad4a5411ad';
      const currentCategory = categories[category];
      const query = currentCategory.query;
      
      try {
        // Try to fetch real news from GNews API
        const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${API_KEY}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.articles && data.articles.length > 0) {
            // Transform real news data to our format
            const transformedArticles = data.articles.map((article, index) => ({
              title: article.title,
              description: article.description,
              source: article.source.name,
              publishedAt: article.publishedAt,
              url: article.url,
              image: article.image || `https://picsum.photos/seed/news-${index}/80/80.jpg`,
              category: currentCategory.label,
              aiCurated: true,
              trending: Math.random() > 0.7, // Random trending for demo
              readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
            }));
            
            setNewsData(transformedArticles);
            setLoading(false);
            setRefreshing(false);
            return;
          }
        }
      } catch (apiError) {
        console.warn('API call failed, using fallback data:', apiError);
      }
      
      // Fallback to enhanced mock data if API fails
      console.log('Using enhanced mock data for demonstration');
      
      // Enhanced mock data with more realistic current events
      const mockData = {
        0: [ // For You - AI & ML
          {
            title: "OpenAI Announces GPT-5 with Human-Level Reasoning",
            description: "Latest AI model demonstrates unprecedented capabilities in complex problem-solving and creative tasks, marking a significant milestone in artificial intelligence.",
            source: "TechCrunch",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/gpt5-latest/80/80.jpg",
            category: "Healthcare AI",
            aiCurated: true,
            trending: true,
            readTime: "5 min read",
          },
          {
            title: "Google's Quantum Computer Solves Decades-Old Math Problem",
            description: "Breakthrough achievement demonstrates quantum supremacy in practical applications, potentially revolutionizing cryptography and drug discovery.",
            source: "MIT Technology Review",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/quantum-breakthrough/80/80.jpg",
            category: "Quantum Computing",
            aiCurated: true,
            readTime: "3 min read",
          },
          {
            title: "AI-Powered Drug Discovery Cuts Research Time by 90%",
            description: "Machine learning algorithms identify potential treatments for rare diseases in weeks instead of years, saving millions in research costs.",
            source: "Nature Medicine",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/ai-drug-discovery/80/80.jpg",
            category: "Healthcare AI",
            aiCurated: true,
            trending: true,
            readTime: "4 min read",
          },
          {
            title: "Microsoft's GitHub Copilot Writes Entire Applications",
            description: "New AI assistant can generate complete functional applications from simple natural language descriptions with 95% accuracy.",
            source: "The Verge",
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/github-copilot/80/80.jpg",
            category: "Developer Tools",
            aiCurated: true,
            readTime: "2 min read",
          },
        ],
        1: [ // Technology
          {
            title: "Apple Unveils Vision Pro 2 with Neural Interface",
            description: "Next-generation AR glasses feature direct brain-computer interface, enabling thought-controlled interactions and immersive experiences.",
            source: "Engadget",
            publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/apple-vision2/80/80.jpg",
            category: "AR/VR",
            trending: true,
            readTime: "6 min read",
          },
          {
            title: "Tesla's Full Self-Driving Achieves Level 5 Autonomy",
            description: "Regulatory approval granted for fully autonomous vehicles in major cities, marking transportation revolution milestone.",
            source: "Electrek",
            publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/tesla-level5/80/80.jpg",
            category: "Automotive",
            readTime: "4 min read",
          },
          {
            title: "Samsung Launches 6G Network with Terabit Speeds",
            description: "South Korean company demonstrates first commercial 6G deployment, offering 50x faster speeds than current 5G networks.",
            source: "The Verge",
            publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/samsung-6g-launch/80/80.jpg",
            category: "Telecom",
            trending: true,
            readTime: "3 min read",
          },
        ],
        2: [ // Business
          {
            title: "AI Startup Valued at $50B After Record Funding Round",
            description: "Series E funding raises $5B for artificial intelligence company developing next-generation enterprise solutions.",
            source: "Forbes",
            publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/ai-unicorn/80/80.jpg",
            category: "Startups",
            trending: true,
            readTime: "5 min read",
          },
          {
            title: "Tech Stocks Surge on AI Revolution Optimism",
            description: "NASDAQ reaches all-time high as investors bet big on artificial intelligence transformation across industries.",
            source: "Bloomberg",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/tech-surge/80/80.jpg",
            category: "Markets",
            readTime: "2 min read",
          },
        ],
        3: [ // Science
          {
            title: "Scientists Successfully Reverse Aging in Human Trials",
            description: "Breakthrough gene therapy shows promise in reversing cellular aging, potentially extending human lifespan by decades.",
            source: "Science Magazine",
            publishedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/aging-reversal/80/80.jpg",
            category: "Medicine",
            trending: true,
            readTime: "7 min read",
          },
          {
            title: "Mars Colony Welcomes First Newborn Babies",
            description: "Historic milestone as human settlement on Mars celebrates first births in space, marking new era in space exploration.",
            source: "Space.com",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/mars-births/80/80.jpg",
            category: "Space",
            readTime: "4 min read",
          },
        ],
        4: [ // Innovation
          {
            title: "Revolutionary Battery Charges Electric Cars in 5 Minutes",
            description: "New solid-state battery technology promises to eliminate range anxiety and accelerate EV adoption worldwide.",
            source: "IEEE Spectrum",
            publishedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/fast-charging/80/80.jpg",
            category: "Energy",
            trending: true,
            readTime: "3 min read",
          },
          {
            title: "3D-Printed Human Organs Ready for Clinical Trials",
            description: "Bioprinting breakthrough creates functional organs using patient's own cells, revolutionizing transplant medicine.",
            source: "Medical News Today",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            url: "#",
            image: "https://picsum.photos/seed/3d-organs/80/80.jpg",
            category: "Medicine",
            readTime: "6 min read",
          },
        ],
      };

      setNewsData(mockData[activeTab] || mockData[0]);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNewsData(activeTab);
  }, [activeTab]);

  const handleRefresh = () => {
    fetchNewsData(activeTab);
  };

  const handleBookmark = (articleId) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(articleId)) {
      newBookmarked.delete(articleId);
    } else {
      newBookmarked.add(articleId);
    }
    setBookmarked(newBookmarked);
  };

  const handleArticleClick = (article) => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    } else {
      // For demo articles with '#' URL, show a message or handle differently
      console.log('Demo article - would open:', article.title);
      // You could also open a modal or show more details here
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const published = new Date(timestamp);
    const diffInMinutes = Math.floor((now - published) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Psychology sx={{ color: '#0a2d82', fontSize: 24 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1a2038' }}>
              AI News Feed
            </Typography>
            <Chip
              label="Curated"
              size="small"
              sx={{
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          </Box>
          <Tooltip title="Refresh news">
            <IconButton
              size="small"
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ color: '#0a2d82' }}
            >
              <Refresh sx={{ fontSize: 20, ...(refreshing && { animation: 'spin 1s linear infinite' }) }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Compact Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 2, 
            minHeight: 32,
            '& .MuiTab-root': {
              minHeight: 32,
              fontSize: '0.75rem',
              textTransform: 'none',
              px: 1,
              minWidth: 'auto',
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category.label}
              icon={category.icon}
              iconPosition="start"
              sx={{ 
                minHeight: 32, 
                fontSize: '0.75rem',
                '& .MuiTab-iconWrapper': { fontSize: 14, mr: 0.5 },
              }}
            />
          ))}
        </Tabs>

        {/* News Cards Grid */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {loading ? (
            <Box>
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} sx={{ mb: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={80} sx={{ float: 'left', mr: 2 }} />
                    <Box sx={{ ml: 92 }}>
                      <Skeleton variant="text" height={20} width="80%" sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={14} width="100%" sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" height={14} width="60%" />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box>
              {newsData.map((article, index) => (
                <Fade in key={index} timeout={300 + index * 100}>
                  <Card
                    onClick={() => handleArticleClick(article)}
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Article Image */}
                        <Avatar
                          src={article.image}
                          variant="rounded"
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            flexShrink: 0,
                            border: article.trending ? '2px solid #ff9800' : 'none',
                          }}
                        />
                        
                        {/* Article Content */}
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              sx={{
                                lineHeight: 1.2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                color: '#1a2038',
                                fontSize: '0.9rem',
                              }}
                            >
                              {article.trending && (
                                <TrendingUp sx={{ fontSize: 14, color: '#ff9800', mr: 0.5, verticalAlign: 'middle' }} />
                              )}
                              {article.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(index);
                                }}
                                sx={{ p: 0.5 }}
                              >
                                {bookmarked.has(index) ? (
                                  <Bookmark sx={{ fontSize: 16, color: '#0a2d82' }} />
                                ) : (
                                  <BookmarkBorder sx={{ fontSize: 16 }} />
                                )}
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ p: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVert sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              mb: 1,
                              fontSize: '0.8rem',
                              lineHeight: 1.3,
                            }}
                          >
                            {article.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="caption" color="text.secondary" fontWeight="medium" sx={{ fontSize: '0.75rem' }}>
                              {article.source}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              {formatTimeAgo(article.publishedAt)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              {article.readTime}
                            </Typography>
                            {article.aiCurated && (
                              <Chip
                                icon={<SmartToy sx={{ fontSize: 12 }} />}
                                label="AI"
                                size="small"
                                sx={{
                                  fontSize: '0.6rem',
                                  height: 18,
                                  backgroundColor: '#e3f2fd',
                                  color: '#1976d2',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          mt: 2, 
          pt: 1, 
          borderTop: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            AI-curated content • Updated hourly
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsFeedCompact;
