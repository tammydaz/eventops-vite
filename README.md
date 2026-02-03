# EventOps BEO Form - Airtable Block

A complete, production-ready Airtable blocks project for managing Banquet Event Orders (BEO) with TypeScript, Vite, and modern development tooling.

## 🚀 Features

- **Full TypeScript Support** - Type-safe development with comprehensive type definitions
- **Airtable SDK Integration** - Complete integration with @airtable/blocks SDK
- **Modern Build Tool** - Fast development with Vite and Hot Module Replacement (HMR)
- **Component Library** - Examples using Airtable's custom UI components (Box, Button, Input, etc.)
- **Code Quality Tools** - ESLint and Prettier pre-configured
- **Production Ready** - Optimized build configuration for deployment

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- An Airtable account with access to Apps/Blocks development
- Basic knowledge of React and TypeScript

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eventops-vite
```

2. Install dependencies:
```bash
npm install
```

## 💻 Development

Start the development server:
```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:9000` with hot module replacement.

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 📦 Project Structure

```
eventops-vite/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html            # HTML entry point
├── block.json            # Airtable block manifest
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
└── package.json          # Project dependencies
```

## 🎨 Using Airtable Components

The project demonstrates usage of Airtable's UI components:

```typescript
import {
  Box,
  Button,
  FormField,
  Input,
  Text,
  Heading,
  Select,
  Icon,
} from '@airtable/blocks/ui';

function MyComponent() {
  return (
    <Box padding={3} backgroundColor="white">
      <Heading>My Component</Heading>
      <FormField label="Name">
        <Input value={name} onChange={e => setName(e.target.value)} />
      </FormField>
      <Button onClick={handleSubmit} variant="primary">
        Submit
      </Button>
    </Box>
  );
}
```

## 🔐 Accessing Airtable Data

The app demonstrates how to:

1. **Access the base and tables:**
```typescript
const base = useBase();
const table = base.getTableByIdIfExists(tableId);
```

2. **Read records:**
```typescript
const records = useRecords(table);
```

3. **Create records:**
```typescript
await table.createRecordAsync({ Name: 'Event Name' });
```

4. **Use global config:**
```typescript
const globalConfig = useGlobalConfig();
globalConfig.setAsync('key', 'value');
```

## 📝 Example Features

The included example app demonstrates:

- ✅ Table selection from available base tables
- ✅ Viewing existing records in a list
- ✅ Creating new records with form inputs
- ✅ Form validation and error handling
- ✅ UI state management with React hooks
- ✅ Responsive layout with Airtable UI components

## 🚢 Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Follow Airtable's block deployment guide to publish your block

## 🔧 Configuration Files

### block.json
Defines the block metadata for Airtable:
- Block ID, name, and description
- Frontend entry point
- Icon and version information

### tsconfig.json
TypeScript compiler options optimized for:
- React JSX transformation
- ES2020 target
- Strict type checking
- Vite integration

### vite.config.ts
Vite build tool configuration:
- React plugin integration
- Development server on port 9000
- Optimized production builds
- Source maps for debugging

## 🎯 Best Practices

1. **Type Safety** - Use TypeScript interfaces for all data structures
2. **Error Handling** - Always wrap Airtable API calls in try-catch blocks
3. **Permissions** - Check table permissions before write operations
4. **User Feedback** - Provide clear feedback for all user actions
5. **Component Structure** - Keep components focused and reusable

## 🐛 Troubleshooting

**Issue: Module not found errors**
- Solution: Run `npm install` to ensure all dependencies are installed

**Issue: TypeScript errors with Airtable SDK**
- Solution: The project includes type declarations in `src/vite-env.d.ts`

**Issue: Build fails**
- Solution: Run `npm run type-check` to identify TypeScript errors

## 📚 Resources

- [Airtable Blocks SDK Documentation](https://airtable.com/developers/blocks)
- [Airtable Blocks UI Reference](https://airtable.com/developers/blocks/api/ui)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 License

MIT License - feel free to use this project as a template for your own Airtable blocks.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
