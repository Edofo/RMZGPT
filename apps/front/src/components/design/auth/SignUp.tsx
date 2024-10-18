import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { isValidEmail } from "@/lib/isValidData";

export const SignUp = () => {
  const { register } = useAuth();
  const { addToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    if (!isValidEmail(email)) return addToast("Invalid email", "error");

    const password = e.currentTarget.password.value;
    if (password.length < 6)
      return addToast("Password must be at least 6 characters", "error");

    const confirmPassword = e.currentTarget.password2.value;
    if (password !== confirmPassword)
      return addToast("Passwords do not match", "error");

    register({ email, pseudo: e.currentTarget.pseudo.value, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="border-transparent bg-white bg-opacity-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <Label htmlFor="pseudo" className="text-white">
          Pseudo
        </Label>
        <Input
          id="pseudo"
          name="pseudo"
          type="text"
          autoComplete="pseudo"
          required
          className="border-transparent bg-white bg-opacity-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <div className="relative mt-1">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="border-transparent bg-white bg-opacity-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="button"
            className="absolute inset-y-0 right-0 bg-transparent pr-3 hover:bg-transparent focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="password" className="text-white">
          Confirm password
        </Label>
        <div className="relative mt-1">
          <Input
            id="password2"
            name="password2"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="border-transparent bg-white bg-opacity-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="button"
            className="absolute inset-y-0 right-0 bg-transparent pr-3 hover:bg-transparent focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <UserPlus className="mr-2 h-5 w-5" /> Sign up
        </Button>
      </div>
    </form>
  );
};