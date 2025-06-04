# 🐕 Fetch Dog Adoption Website

A modern, responsive web application built for Fetch's take-home exercise that helps users find and adopt shelter dogs. The application features user authentication, advanced search capabilities, and a matching system to connect users with their perfect canine companions.

## 🌟 Features

### Authentication
- Secure login system with name and email
- Session management with HTTP-only cookies
- Automatic logout functionality

### Dog Search & Discovery
- **Advanced Filtering**: Filter dogs by breed, age range, and zip code
- **Sorting Options**: Sort results alphabetically (A-Z or Z-A)
- **Pagination**: Navigate through large result sets efficiently
- **Comprehensive Display**: View all dog information including name, breed, age, location, and photos

### Favorites & Matching
- **Favorites System**: Save dogs to a personal favorites list
- **Smart Matching**: Generate personalized matches based on favorited dogs
- **Match Highlights**: Special display for matched dogs with adoption call-to-action

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dog-Themed UI**: Warm amber color palette with playful design elements
- **Loading States**: Clear feedback during API requests
- **Error Handling**: User-friendly error messages and fallbacks

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Custom toast system

## 📋 Requirements Met

This application fulfills all requirements from the Fetch take-home exercise:

✅ **Login Screen**: Users enter name and email for authentication  
✅ **Breed Filtering**: Multi-select breed filtering with checkbox interface  
✅ **Pagination**: Navigate through search results with next/previous buttons  
✅ **Sorting**: Alphabetical sorting by breed (ascending/descending)  
✅ **Complete Dog Display**: All dog fields (except ID) are presented  
✅ **Favorites Selection**: Users can favorite dogs from search results  
✅ **Match Generation**: Generate matches based on favorited dogs  
✅ **Hosted Application**: Ready for deployment to any hosting platform  

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/IbrahimD0/fetchdog.git
   cd fetchdog
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 API Integration

The application integrates with Fetch's backend API at `https://frontend-take-home-service.fetch.com`:

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/logout` - Session termination

### Dog Search Endpoints
- `GET /dogs/breeds` - Fetch available dog breeds
- `GET /dogs/search` - Search dogs with filters and pagination
- `POST /dogs` - Fetch dog details by IDs
- `POST /dogs/match` - Generate matches from favorited dogs

### Request Configuration
All API requests include `credentials: 'include'` to handle HTTP-only authentication cookies automatically.

## 📱 Usage Guide

### 1. Login
- Enter your name and email on the login screen
- Click "Start Searching" to authenticate and access the search page

### 2. Search for Dogs
- Use the filters panel to narrow your search:
  - **Age Range**: Set minimum and maximum age
  - **Zip Code**: Filter by location
  - **Breeds**: Select one or multiple breeds
  - **Sort Order**: Choose A-Z or Z-A sorting

### 3. Browse Results
- View dog cards with photos and details
- Use pagination to navigate through results
- Click the heart icon to add dogs to your favorites

### 4. Find Your Match
- After adding dogs to favorites, click "Find My Match"
- The system will generate a personalized match
- View your matched dog with special highlighting

### 5. Logout
- Click the logout button in the header to end your session

## 🎨 Design System

### Color Palette
- **Primary**: Warm amber tones (#f59e0b, #d97706)
- **Background**: Light amber (#fffbeb, #fef3c7)
- **Text**: Dark amber (#92400e, #78350f)
- **Accents**: Red for favorites, green for matches

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent hover states and disabled styles
- **Forms**: Clear labels and validation feedback
- **Navigation**: Sticky positioning and responsive layout

## 📁 Project Structure

\`\`\`
fetch-dog-adoption/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Login page component
│   └── search/
│       ├── page.tsx         # Main search and results page
│       └── loading.tsx      # Loading state component
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── dog-paw-icon.tsx     # Custom dog paw SVG icon
├── hooks/
│   └── use-toast.ts         # Toast notification hook
├── lib/
│   └── utils.ts             # Utility functions
├── tailwind.config.ts       # Tailwind configuration
└── README.md               # Project documentation
\`\`\`

## 🔒 Security Considerations

- **Authentication**: Uses HTTP-only cookies for secure session management
- **CORS**: Properly configured for cross-origin requests
- **Input Validation**: Client-side validation with server-side verification
- **Error Handling**: Graceful error handling without exposing sensitive information

## 🚀 Deployment

This application is ready for deployment on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (Next.js preset)
3. Deploy with automatic CI/CD

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **Railway**: Use the provided Dockerfile or buildpacks
- **AWS Amplify**: Connect repository and configure build settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for the Fetch take-home exercise and is intended for evaluation purposes.

## 📞 Support

For questions or issues related to this implementation, please refer to the code comments or create an issue in the repository.
 
---

**Built with ❤️ for dog lovers everywhere** 🐾
