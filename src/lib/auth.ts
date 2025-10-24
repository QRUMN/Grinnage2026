import React from 'react';

// Simple admin authentication system
// In production, this would integrate with Supabase Auth

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock admin users for demo
const DEMO_ADMIN: AdminUser = {
  id: 'admin-1',
  email: 'admin@grinnage.com',
  name: 'Keith Grinnage',
  role: 'super_admin',
  permissions: ['leads', 'clients', 'appointments', 'content', 'settings']
};

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'admin@grinnage.com',
  password: 'admin123'
};

class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    // Check for existing session on init
    this.checkExistingSession();
  }

  private checkExistingSession() {
    const stored = localStorage.getItem('admin_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.expires > Date.now()) {
          this.authState = {
            user: session.user,
            isAuthenticated: true,
            isLoading: false
          };
          this.notifyListeners();
        } else {
          localStorage.removeItem('admin_session');
        }
      } catch (error) {
        localStorage.removeItem('admin_session');
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AuthState {
    return { ...this.authState };
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notifyListeners();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Success
      const session = {
        user: DEMO_ADMIN,
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };

      localStorage.setItem('admin_session', JSON.stringify(session));

      this.authState = {
        user: DEMO_ADMIN,
        isAuthenticated: true,
        isLoading: false
      };

      this.notifyListeners();
      return { success: true };
    } else {
      // Failed
      this.authState.isLoading = false;
      this.notifyListeners();
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('admin_session');
    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.notifyListeners();
  }

  hasPermission(permission: string): boolean {
    return this.authState.user?.permissions.includes(permission) ?? false;
  }

  isAdmin(): boolean {
    return this.authState.isAuthenticated &&
           (this.authState.user?.role === 'admin' || this.authState.user?.role === 'super_admin');
  }
}

export const authService = AuthService.getInstance();

// React hook for admin authentication
export const useAdminAuth = () => {
  const [authState, setAuthState] = React.useState<AuthState>(authService.getState());

  React.useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    hasPermission: authService.hasPermission.bind(authService),
    isAdmin: authService.isAdmin.bind(authService)
  };
};

