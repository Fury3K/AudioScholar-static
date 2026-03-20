// Static demo mode - no backend required
import { DEMO_USER } from '../data/mockData';

export const API_BASE_URL = '/';

// Auto-authenticate for demo mode
if (!localStorage.getItem('AuthToken')) {
    localStorage.setItem('AuthToken', 'demo-static-token');
    localStorage.setItem('userId', DEMO_USER.uid);
}

export const verifyFirebaseTokenWithBackend = async () => {
    return { success: true, token: 'demo-static-token', userId: DEMO_USER.uid };
};

export const verifyGoogleTokenWithBackend = async () => {
    return { success: true, token: 'demo-static-token', userId: DEMO_USER.uid };
};

export const signUp = async () => {
    return { success: true, message: 'Demo mode - sign up simulated' };
};

// Helper to get the demo user (used by components that fetch /api/users/me)
export const getDemoUser = () => DEMO_USER;
