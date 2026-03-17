"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordRequirements } from './PasswordRequirements';
import { fadeIn, scaleIn } from '@/lib/animations';

interface AuthCardProps {
  onAuthSuccess: () => void;
}

type AuthMode = 'signin' | 'signup';

export function AuthCard({ onAuthSuccess }: AuthCardProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Please enter your email address');
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (mode === 'signup') {
      const hasLength = value.length >= 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      
      if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) return;
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        return;
      }
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Show success and redirect
    setTimeout(() => {
      onAuthSuccess();
    }, 1200);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    // Reset errors
    setEmailError('');
    setPasswordError('');
  };

  if (showSuccess) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full"
      >
        <motion.div 
          className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Check className="w-8 h-8 text-moss" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-sumi mb-2">
          {mode === 'signin' ? 'Welcome Back!' : 'Account Created!'}
        </h2>
        <p className="text-stone">
          {mode === 'signin' 
            ? 'You have successfully signed in. Redirecting to dashboard...' 
            : 'Your account has been created. Redirecting to dashboard...'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-sumi mb-2">
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="text-stone">
          {mode === 'signin' 
            ? 'Sign in to your account' 
            : 'Create a new account to get started'}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-washi rounded-lg mb-8">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            mode === 'signin'
              ? 'bg-indigo text-white shadow-sm'
              : 'text-charcoal hover:text-sumi'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            mode === 'signup'
              ? 'bg-indigo text-white shadow-sm'
              : 'text-charcoal hover:text-sumi'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label htmlFor="name" className="text-sm font-medium text-charcoal mb-2 block">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 h-12"
                  required={mode === 'signup'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email field */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-charcoal mb-2 block">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              placeholder="your@email.com"
              className={`pl-10 h-12 ${emailError ? 'border-red-400 focus:border-red-400' : ''}`}
              required
            />
          </div>
          {emailError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 mt-1"
            >
              {emailError}
            </motion.p>
          )}
        </div>

        {/* Password field */}
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-charcoal mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 h-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password requirements (only for signup) */}
          <AnimatePresence>
            {mode === 'signup' && password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <PasswordRequirements password={password} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm password (only for signup) */}
        <AnimatePresence>
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-charcoal mb-2 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  required={mode === 'signup'}
                />
              </div>
              {passwordError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  {passwordError}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remember me / Terms */}
        <div className="flex items-center justify-between">
          {mode === 'signin' ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-stone cursor-pointer">
                Remember me
              </Label>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm text-stone cursor-pointer">
                <span>I agree to the Terms of Service</span>
              </Label>
            </div>
          )}
          
          {mode === 'signin' && (
            <a href="#" className="text-sm text-indigo hover:underline">
              Forgot password?
            </a>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading || (mode === 'signup' && !agreeTerms)}
          className="w-full h-12 bg-indigo hover:bg-indigo-dark text-white font-medium"
        >
          {isLoading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-stone">Or continue with</span>
        </div>
      </div>

      {/* Social login */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 border border-stone/20 rounded-lg hover:bg-washi transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-charcoal">Continue with Google</span>
        </button>
        
        <button
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 border border-stone/20 rounded-lg hover:bg-washi transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <span className="text-charcoal">Continue with Apple</span>
        </button>
      </div>

      {/* Switch mode link */}
      <p className="text-center text-sm text-stone mt-6">
        {mode === 'signin' ? (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo hover:underline font-medium"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo hover:underline font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </motion.div>
  );
}
