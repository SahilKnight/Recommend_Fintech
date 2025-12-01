# FinTech Insights - Investment Recommendation Platform

A comprehensive Angular application for financial investment recommendations and portfolio management.

## Features

- **User Authentication**: Login/Register with trial accounts
- **Dashboard**: Overview of portfolio performance and key metrics
- **Investment Recommendations**: AI-powered stock and commodity recommendations
- **Subscription Management**: Trial and paid plan management
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v19 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd my-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4200`

## Demo Credentials

For testing purposes, you can use any email and password combination. The authentication is mocked for demonstration.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Route guards
│   │   └── services/        # Core services
│   ├── modules/
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard component
│   │   ├── recommendations/ # Investment recommendations
│   │   └── subscription/   # Subscription management
│   ├── shared/
│   │   └── models/         # TypeScript interfaces
│   └── app.routes.ts       # Application routing
```

## Key Components

### Authentication
- Login and registration forms
- JWT-like session management
- Route protection with guards

### Dashboard
- Portfolio overview
- Key performance metrics
- Quick access to recommendations

### Recommendations
- List view with filtering
- Detailed analysis for each recommendation
- Signal strength indicators

### Subscription
- Plan comparison
- Trial management
- Upgrade functionality

## Technologies Used

- **Angular 19**: Frontend framework
- **TypeScript**: Type-safe development
- **SCSS**: Styling and theming
- **RxJS**: Reactive programming
- **Standalone Components**: Modern Angular architecture

## Mock Data

The application uses mock data services to simulate:
- User authentication
- Investment recommendations
- Market data
- Subscription plans

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Future Enhancements

- Real-time market data integration
- Advanced charting capabilities
- Push notifications
- Social trading features
- Portfolio backtesting

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

Run `ng test` to execute the unit tests via Karma.

## License

This project is for demonstration purposes only.