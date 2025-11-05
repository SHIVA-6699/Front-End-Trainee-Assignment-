# Dynamic Dashboard V2

A beautiful, modern dashboard application built with React, TypeScript, and Tailwind CSS. This application allows users to dynamically add, remove, and manage widgets across different dashboard categories.

## Features

✨ **Key Features:**
- 📊 Dynamic dashboard with JSON-based configuration
- ➕ Add widgets to categories dynamically
- ❌ Remove widgets via cross icon or checkbox
- 🔍 Search functionality across all widgets
- 🎨 Beautiful, modern UI with smooth animations
- 📱 Fully responsive design
- 🎯 Category-based widget organization (CSPM, CWPP, Image, Ticket)
- 🛠️ Custom widget creation with name and text

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Context API** - State management

## Project Structure

```
Fronted_Trainee/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Top navigation bar
│   │   ├── Dashboard.tsx       # Main dashboard container
│   │   ├── CategorySection.tsx # Category display component
│   │   ├── WidgetCard.tsx      # Individual widget card
│   │   └── AddWidgetModal.tsx  # Modal for adding widgets
│   ├── context/
│   │   └── DashboardContext.tsx # State management context
│   ├── data/
│   │   └── dashboardData.json   # JSON configuration
│   ├── types/
│   │   └── dashboard.ts          # TypeScript type definitions
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The application will be available at `http://localhost:5173`
   - Vite will automatically open the browser, or you can manually navigate to the URL

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Adding Widgets

1. **From Header Button:**
   - Click the "Add Widget" button in the top right
   - Select a category tab (CSPM, CWPP, Image, or Ticket)
   - Check the widgets you want to add
   - Click "Confirm"

2. **From Category Section:**
   - Click the "+ Add Widget" placeholder card in any category
   - The modal will open with that category pre-selected
   - Select widgets and confirm

3. **Create Custom Widget:**
   - Open the "Add Widget" modal
   - Click "Create Custom Widget"
   - Enter widget name and text
   - Click "Add Widget"

### Removing Widgets

1. **Via Cross Icon:**
   - Hover over any widget card
   - Click the cross (X) icon in the top right corner

2. **Via Modal:**
   - Open the "Add Widget" modal
   - Uncheck the widget you want to remove
   - Click "Confirm"

### Searching Widgets

- Use the search bar in the "Add Widget" modal
- Type to filter widgets by name or content
- Search works across all categories when active

## JSON Structure

The dashboard is configured via `src/data/dashboardData.json`:

```json
{
  "categories": [
    {
      "id": "cspm-executive",
      "name": "CSPM Executive Dashboard",
      "widgets": [...]
    }
  ],
  "availableWidgets": [...]
}
```

## Customization

### Adding New Categories

Edit `src/data/dashboardData.json` and add new category objects to the `categories` array.

### Adding New Widgets

Add widget objects to the `availableWidgets` array in the JSON file, or use the "Create Custom Widget" feature in the UI.

### Styling

The application uses Tailwind CSS. Customize colors in `tailwind.config.js` or modify component classes directly.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configured for React
- Components use functional components with hooks
- Context API for state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for frontend trainee assignment purposes.

## Notes

- Widget state is managed locally using React Context
- Changes are not persisted to a backend (local state only)
- All widgets can contain custom text for assignment purposes
- The UI is designed to match modern dashboard aesthetics

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**

# Front-End-Trainee-Assignment-
