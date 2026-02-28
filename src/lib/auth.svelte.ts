export class AuthState {
  user = $state<{ name: string; email: string } | null>({
    name: 'Demo User',
    email: 'demo@example.com'
  });

  login() {
    this.user = { name: 'Demo User', email: 'demo@example.com' };
  }

  logout() {
    this.user = null;
  }
}

export const authStore = new AuthState();
