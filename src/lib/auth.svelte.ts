export class AuthState {
  user = $state<{ name: string; email: string } | null>({
    name: 'Demo User',
    email: 'demo@example.com'
  });
  
  rootFolderId = $state<string | null>(import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID || null);
  accessToken = $state<string | null>(null);

  login(rootFolderId: string = '', accessToken: string = '') {
    this.user = { name: 'Demo User', email: 'demo@example.com' };
    this.rootFolderId = rootFolderId || import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID || 'team-drive-id-123';
    this.accessToken = accessToken;
  }

  logout() {
    this.user = null;
    this.rootFolderId = null;
    this.accessToken = null;
  }
}

export const authStore = new AuthState();
