export interface Student {
  _id?: string;
  name: string;
  email: string;
  grade: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Admin {
  _id: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}