# Validation Component

A reusable validation component for displaying form field validation requirements with real-time feedback.

## Features

- Dynamic validation rules display
- Success/error visual feedback with checkmarks and X marks
- Optional examples section
- Customizable styling
- TypeScript support

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `show` | `boolean` | Yes | - | Whether to display the validation component |
| `title` | `string` | Yes | - | Title text for the validation section |
| `rules` | `ValidationRule[]` | Yes | - | Array of validation rules to display |
| `examples` | `string` | No | - | Optional examples text to show |
| `className` | `string` | No | `"mt-2 p-2 bg-light rounded border"` | CSS classes for the container |

## ValidationRule Interface

```typescript
interface ValidationRule {
  isValid: boolean;  // Whether this rule is currently satisfied
  message: string;   // The rule description to display
}
```

## Usage Example

```tsx
import Validation from './components/Validation';

const MyForm = () => {
  const [password, setPassword] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  
  const passwordRules = [
    { isValid: password.length >= 8, message: 'At least 8 characters' },
    { isValid: /[A-Z]/.test(password), message: 'One uppercase letter' },
    { isValid: /[0-9]/.test(password), message: 'One number' }
  ];

  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setShowValidation(true)}
        onBlur={() => setShowValidation(false)}
      />
      
      <Validation
        show={showValidation || !!password}
        title="Password must contain:"
        rules={passwordRules}
        examples="Example: MyPass123!"
      />
    </div>
  );
};
```

## Styling

The component uses Bootstrap classes by default but can be customized with the `className` prop. The validation rules use:
- `text-success` for valid rules (green with ✓)
- `text-danger` for invalid rules (red with ✗)
