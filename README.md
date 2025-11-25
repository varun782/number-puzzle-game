# Number Puzzle Game

A React-based number matching puzzle game similar to Number Master by KiwiFun.

## 🎮 Game Rules

- Match two numbers that are **equal** or **sum to 10**
- Numbers must be adjacent (horizontal, vertical, or diagonal)
- Matched cells can create paths to connect distant numbers
- Complete all matches within 2 minutes per level

## 🚀 Features

- 3 difficulty levels (Beginner, Intermediate, Advanced)
- Progressive row reveal system
- Timer-based gameplay
- Score tracking
- Responsive design

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/number-puzzle-game.git

# Navigate to project directory
cd number-puzzle-game

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗️ Build for Production
```bash
# Create optimized production build
npm run build
```

## 📱 Building APK (React Native Conversion Required)

This is currently a React web app. To build an APK:

### Option 1: Using Capacitor (Recommended)
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Initialize Capacitor
npx cap init

# Build the web app
npm run build

# Add Android platform
npx cap add android

# Copy web assets
npx cap copy

# Open in Android Studio
npx cap open android

# Build APK in Android Studio
```

### Option 2: Using React Native
Convert the React web app to React Native following the migration guide.

### Option 3: Using PWA Builder
1. Build the project: `npm run build`
2. Visit https://www.pwabuilder.com/
3. Upload your web app
4. Generate Android APK

## 🎯 Game Architecture

### Components
- **GameBoard**: Main game container
- **GameHeader**: Level selector, score, and timer
- **GameCell**: Individual number cell
- **GameOverModal**: Win/lose screen
- **LevelSelector**: Level switching UI

### Hooks
- **useGameLogic**: Manages game state and matching logic
- **useTimer**: Handles countdown timer

### Utils
- **gridGenerator**: Creates random number grids
- **pathValidator**: Validates matching rules and paths
- **constants**: Game configuration constants

## 📝 Level Configuration

| Level | Grid Size | Difficulty |
|-------|-----------|------------|
| 1 | 8x5 | Beginner |
| 2 | 10x6 | Intermediate |
| 3 | 12x7 | Advanced |

## 🛠️ Technologies Used

- React 18
- Tailwind CSS
- Lucide React (icons)
- Custom hooks for state management

## 📄 License

MIT License

## 👤 Author

Your Name

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.