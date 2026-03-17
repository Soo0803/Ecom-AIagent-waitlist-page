import { Check, X } from 'lucide-react';

interface PasswordRequirementsProps {
  password: string;
}

interface Requirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    id: 'length',
    label: '8+ characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Contains uppercase',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: 'Contains lowercase',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'Contains number',
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    id: 'symbol',
    label: 'Contains symbol',
    test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="space-y-2 mt-3">
      <p className="text-xs text-stone mb-2">Password requirements:</p>
      {requirements.map((req) => {
        const isMet = req.test(password);
        return (
          <div 
            key={req.id}
            className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
              isMet ? 'text-moss' : 'text-stone'
            }`}
          >
            {isMet ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4 opacity-50" />
            )}
            <span>{req.label}</span>
          </div>
        );
      })}
    </div>
  );
}
