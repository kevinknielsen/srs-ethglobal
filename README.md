DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/steel-river-saints.git
cd steel-river-saints
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Update database schema

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── lib/        # Utilities and helpers
│   │   └── pages/      # Page components
├── server/              # Backend Express server
│   ├── routes.ts       # API routes
│   └── storage.ts      # Data storage interface
└── shared/             # Shared types and schemas