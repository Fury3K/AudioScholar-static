// Static demo mode - admin service returns mock data
import {
  DEMO_ADMIN_USERS,
  DEMO_ADMIN_OVERVIEW,
  DEMO_ADMIN_ACTIVITY,
  DEMO_ADMIN_USER_DISTRIBUTION,
  DEMO_ADMIN_CONTENT_ENGAGEMENT,
} from '../data/mockData';

export const adminService = {
  getUsers: async () => {
    return DEMO_ADMIN_USERS;
  },

  updateUserStatus: async (uid, disabled) => {
    const user = DEMO_ADMIN_USERS.find(u => u.uid === uid);
    if (user) user.disabled = disabled;
  },

  updateUserRoles: async (uid, roles) => {
    const user = DEMO_ADMIN_USERS.find(u => u.uid === uid);
    if (user) user.roles = roles;
  },

  getOverview: async () => {
    return DEMO_ADMIN_OVERVIEW;
  },

  getActivityStats: async () => {
    return DEMO_ADMIN_ACTIVITY;
  },

  getUserDistribution: async () => {
    return DEMO_ADMIN_USER_DISTRIBUTION;
  },

  getContentEngagement: async () => {
    return DEMO_ADMIN_CONTENT_ENGAGEMENT;
  },
};
