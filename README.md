# TravelBook - Complete Travel Booking Platform

A modern, responsive travel booking website built with React, TypeScript, and Tailwind CSS. Discover destinations, book trips, find hotels, and explore attractions across India.

![Travel Booking Platform](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Latest-06B6D4)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF)

## 🌟 Features

### 🔍 Smart Search & Discovery
- **Universal Search**: Search across trips, hotels, and attractions from a single search bar
- **Advanced Filters**: Filter by city, price range, duration, ratings, and categories
- **Real-time Results**: Instant search results with smart suggestions
- **City-based Exploration**: Browse destinations by popular Indian cities

### 🏨 Comprehensive Hotel Listings
- **Detailed Hotel Information**: Photos, amenities, ratings, and pricing
- **Price Range Filters**: Budget, mid-range, and luxury categories
- **Sort Options**: By rating, price (low-to-high, high-to-low)
- **Hotel Details Page**: Complete information with booking functionality

### 🎯 Trip Packages
- **Curated Trip Packages**: Pre-planned itineraries for different destinations
- **Duration-based Filtering**: Find trips by length (2N/3D, 3N/4D, etc.)
- **Price Comparison**: Compare packages across different price ranges
- **Detailed Itineraries**: Day-wise plans and highlights

### 🏛️ Tourist Attractions
- **Local Attractions**: Discover top tourist spots in each city
- **Category Filtering**: Historical, natural, religious, adventure, cultural sites
- **Detailed Information**: Photos, descriptions, timings, and entry fees
- **Interactive Maps**: Get directions to attractions

### 🤖 Intelligent Chatbot Assistant
- **Natural Language Processing**: Ask questions in plain English
- **Context-Aware Responses**: Understands travel-related queries
- **Quick Actions**: Direct links to search results and bookings
- **24/7 Availability**: Always ready to help with travel planning

### 📱 Modern User Experience
- **Fully Responsive**: Perfect experience on desktop, tablet, and mobile
- **Beautiful UI**: Modern design with smooth animations and transitions
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Fast Loading**: Optimized performance with lazy loading and caching

### 💳 Booking System
- **Multi-step Booking**: Guided booking process for trips and hotels
- **Mock Payment Gateway**: Demonstration payment flow
- **Booking Confirmation**: Detailed booking summaries and confirmations
- **User-friendly Forms**: Intuitive form design with validation

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (30+ UI components)
│   ├── AttractionCard.tsx      # Attraction display component
│   ├── BookingModal.tsx        # Multi-step booking modal
│   ├── Chatbot.tsx            # Intelligent chatbot component
│   ├── Header.tsx             # Navigation header
│   ├── Hero.tsx               # Landing page hero section
│   ├── HotelCard.tsx          # Hotel display component
│   └── TripCard.tsx           # Trip package display component
├── pages/
│   ├── Index.tsx              # Landing page
│   ├── SearchResults.tsx      # Universal search results
│   ├── TripDetail.tsx         # Individual trip details
│   ├── Hotels.tsx             # Hotel listings page
│   ├── HotelDetail.tsx        # Individual hotel details
│   ├── Attractions.tsx        # Attraction listings page
│   ├── AttractionDetail.tsx   # Individual attraction details
│   └── NotFound.tsx           # 404 error page
├── services/
│   └── travelApi.ts           # Mock API service layer
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   └── utils.ts               # Utility functions
├── assets/                    # Images and static assets
├── index.css                  # Global styles and design tokens
└── main.tsx                   # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Lucide React** - Beautiful, customizable icons
- **CSS Variables** - Dynamic theming and design tokens

### State Management & Data
- **TanStack Query** - Server state management and caching
- **React Router DOM** - Client-side routing
- **Local Storage** - Data persistence for mock API

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing and optimization
- **Tailwind Animate** - CSS animations and transitions

## 🎨 Design System

### Color Palette
The application uses a semantic color system with CSS custom properties:

```css
/* Light Theme */
--primary: 220 70% 50%        /* Brand blue */
--secondary: 210 40% 98%      /* Light gray */
--accent: 210 40% 90%         /* Accent color */
--background: 0 0% 100%       /* White */
--foreground: 222 25% 11%     /* Dark text */

/* Dark Theme */
--primary: 220 70% 60%        /* Lighter brand blue */
--secondary: 217 32% 17%      /* Dark gray */
--background: 222 25% 11%     /* Dark background */
--foreground: 210 40% 98%     /* Light text */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **Responsive Sizing**: Fluid typography scales

### Components
All UI components are built with:
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsiveness**: Mobile-first design approach
- **Consistency**: Unified spacing and styling
- **Theming**: Dark/light mode support

## 📊 API Structure & Mock Data

### Mock API Endpoints

The application uses a comprehensive mock API with the following endpoints:

```typescript
// Cities
GET /api/cities
// Returns: ["Goa", "Manali", "Shimla", "Mumbai", "Jaipur", "Kerala"]

// Trips
GET /api/trips?city=Goa&minPrice=5000&maxPrice=20000
GET /api/trips/:id

// Hotels  
GET /api/hotels?city=Goa&rating=4&sort=price_asc
GET /api/hotels/:id

// Attractions
GET /api/attractions?city=Goa&category=historical
GET /api/attractions/:id

// Universal Search
GET /api/search?q=goa beach&type=all

// Chatbot
POST /api/chat
Body: { message: "Best hotels in Goa", sessionId: "xxx" }
```

### Data Models

```typescript
interface Trip {
  id: string;
  title: string;
  city: string;
  duration: string;
  price: number;
  rating: number;
  short_description: string;
  highlights: string[];
  images: string[];
  tags: string[];
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  price_per_night: number;
  rating: number;
  short_description: string;
  amenities: string[];
  images: string[];
}

interface Attraction {
  id: string;
  name: string;
  city: string;
  location_name: string;
  short_description: string;
  coords: { lat: number; lon: number };
  images: string[];
  category: string;
}
```

## 🤖 Chatbot Features

### Natural Language Understanding
- **Intent Recognition**: Understands travel-related queries
- **Entity Extraction**: Identifies cities, price ranges, and preferences
- **Context Awareness**: Maintains conversation context

### Supported Query Types
```
"Show me trips to Manali"
"Best hotels in Goa under 5000"
"What can I visit in Jaipur?"
"Find budget hotels in Mumbai"
"Adventure activities in Manali"
```

### Response Types
- **Text Responses**: Natural language answers
- **Action Cards**: Interactive hotel/trip/attraction cards
- **Quick Suggestions**: Follow-up query suggestions
- **Error Handling**: Helpful fallback responses

## 🚀 Deployment

### Lovable Platform (Recommended)
1. Open [Lovable Project](https://lovable.dev/projects/31c08765-f4f7-4b6b-9f4c-017ca204e50d)
2. Click **Publish** in the top right corner
3. Your app will be live instantly

### Manual Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

## 🔧 Configuration & Customization

### Environment Variables
No environment variables required - all data is mocked locally.

### Customizing Mock Data
Edit `src/services/travelApi.ts` to modify:
- Available cities
- Trip packages
- Hotel listings
- Attraction data
- Chatbot responses

### Theming
Modify `src/index.css` and `tailwind.config.ts` to customize:
- Color palette
- Typography
- Spacing
- Animations
- Dark mode behavior

### Adding New Cities
1. Update `cities` array in `travelApi.ts`
2. Add corresponding trips, hotels, and attractions
3. Update chatbot knowledge base

## 📱 Mobile Responsiveness

- **Breakpoints**: Tailwind's standard breakpoints (sm, md, lg, xl)
- **Touch Optimized**: Large tap targets, swipe gestures
- **Performance**: Optimized images and lazy loading
- **Navigation**: Mobile-friendly hamburger menu
- **Forms**: Touch-friendly input fields

## 🔍 SEO Optimization

- **Meta Tags**: Dynamic title and description per page
- **Semantic HTML**: Proper heading hierarchy and structure
- **Image Alt Text**: Descriptive alt attributes for all images
- **Clean URLs**: SEO-friendly route structure
- **Performance**: Fast loading times and Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Help

### Documentation
- [Lovable Documentation](https://docs.lovable.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [GitHub Issues](https://github.com/your-repo/issues)

### Quick Troubleshooting

**Build Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Development Server Issues:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**TypeScript Errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

---

## 🌟 Features Coming Soon

- [ ] User Authentication & Profiles
- [ ] Real Payment Gateway Integration  
- [ ] Email Notifications
- [ ] Advanced Search Filters
- [ ] Social Media Integration
- [ ] Multi-language Support
- [ ] PWA (Progressive Web App) Features

---

**Built with ❤️ using Lovable.dev**

*Last updated: August 2025*