/**
 * API Service for Amaleeni Pink Pages
 * Connects directly to Hostinger PHP backend database APIs
 */

// Automatically clear legacy mock data if present in browser
try {
  localStorage.removeItem('ama_mock_users');
} catch (e) {}

const RAW_URL = import.meta.env.API_URL || 'https://linen-oryx-691439.hostingersite.com';
const API_BASE_URL = RAW_URL.replace(/\/+$/, '');
export const RAZORPAY_KEY_ID = import.meta.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyIdHere';

/**
 * Returns Authorization header if an active member or admin token exists in localStorage
 */
function getAuthHeader() {
  try {
    const adminToken = localStorage.getItem('ama_admin_token');
    const userToken = localStorage.getItem('ama_token');
    const token = adminToken || userToken;
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  } catch (e) {}
  return {};
}

/**
 * Returns user-friendly message when offline or connection is lost
 */
function handleOfflineError() {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'You appear to be offline. Please check your internet connection.';
  }
  return 'Unable to reach server. Please check your internet connection or try again later.';
}

// Unified helper for authenticated POST requests
async function postRequest(endpoint, payload, customHeaders = {}) {
  const tryUrls = [
    `${API_BASE_URL}/${endpoint}`,
    `${API_BASE_URL}/api/${endpoint}`
  ];

  for (const url of tryUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
          ...customHeaders,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        continue; // Try next URL format only if 404 Not Found
      }

      let data = {};
      try {
        data = await response.json();
      } catch (jsonParseErr) {
        data = { message: `Server returned HTTP ${response.status}` };
      }

      if (!response.ok) {
        return {
          ok: false,
          error: data.message || `Server error (${response.status})`,
          status: response.status,
          data,
        };
      }
      return { ok: true, data };
    } catch (err) {
      if (url === tryUrls[tryUrls.length - 1]) {
        console.warn(`Backend endpoint ${endpoint} unavailable:`, err.message);
        return { ok: false, error: handleOfflineError() };
      }
    }
  }

  return { ok: false, error: handleOfflineError() };
}

// Unified helper for authenticated GET & DELETE requests
async function authFetch(endpoint, options = {}) {
  const tryUrls = [
    `${API_BASE_URL}/${endpoint}`,
    `${API_BASE_URL}/api/${endpoint}`
  ];

  for (const url of tryUrls) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
          ...(options.headers || {})
        }
      });

      if (response.status === 404) continue;

      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        data = { message: `Server returned HTTP ${response.status}` };
      }

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          error: data.message || `Server error (${response.status})`,
          data
        };
      }

      return { ok: true, data };
    } catch (err) {
      if (url === tryUrls[tryUrls.length - 1]) {
        return { ok: false, error: handleOfflineError() };
      }
    }
  }

  return { ok: false, error: handleOfflineError() };
}

/**
 * Fetch Authenticated Member Profile API (Hostinger PHP Backend DB me.php)
 */
export async function fetchUserProfileApi(userId) {
  const result = await authFetch(`me.php?userId=${encodeURIComponent(userId || '')}`);
  if (result.ok && result.data && result.data.user) {
    return result.data.user;
  }
  return null;
}

/**
 * Submit Contact / Inquiry Form API (Hostinger PHP Backend)
 */
export async function submitContactFormApi(payload) {
  const result = await postRequest('contact-handler.php', payload);
  if (result.ok) {
    return result.data;
  }
  return { status: 'error', ok: false, message: result.error || 'Failed to submit form inquiry.' };
}

/**
 * Subscribe Newsletter API (Hostinger PHP Backend)
 */
export async function subscribeNewsletterApi(email) {
  const result = await postRequest('newsletter.php', { email });
  if (result.ok) {
    return result.data;
  }
  return { status: 'error', ok: false, message: result.error || 'Failed to subscribe newsletter.' };
}

/**
 * Send OTP Code via Hostinger / Zoho SMTP API
 */
export async function sendOtpApi(email) {
  const result = await postRequest('send-otp.php', { email });
  if (result.ok) {
    return result.data;
  }
  return { status: 'error', ok: false, message: result.error || 'Unable to send OTP email.' };
}

/**
 * Verify OTP Code via Hostinger Backend API
 */
export async function verifyOtpApi(email, otp) {
  const result = await postRequest('verify-otp.php', { email, otp });
  if (result.ok) {
    return result.data;
  }
  return { status: 'error', ok: false, message: result.error || 'Invalid OTP code.' };
}

/**
 * Register User API (Hostinger PHP Backend DB)
 */
export async function registerUserApi(formData) {
  const result = await postRequest('register.php', formData);
  if (result.ok) {
    return result.data;
  }
  throw new Error(result.error || 'Registration failed. Please try again.');
}

/**
 * Login User API (Hostinger PHP Backend DB)
 */
export async function loginUserApi(identifier, password, botTrap = '') {
  if (botTrap) {
    throw new Error('Spam bot detected. Access rejected.');
  }

  const trimmedId = (identifier || '').trim();
  const cleanPhone = trimmedId.replace(/[^0-9]/g, '');

  let result = await postRequest('login.php', { email: trimmedId, password, website_bot_trap: botTrap });

  if (!result.ok && !trimmedId.includes('@') && cleanPhone) {
    const resDigits = await postRequest('login.php', { email: cleanPhone, password, website_bot_trap: botTrap });
    if (resDigits.ok) {
      result = resDigits;
    } else {
      const resMemberMail = await postRequest('login.php', { email: `${cleanPhone}@amaleeni.member`, password, website_bot_trap: botTrap });
      if (resMemberMail.ok) {
        result = resMemberMail;
      }
    }
  }

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.error || 'Invalid credentials or account not found. Please verify your Email/WhatsApp No. and password.');
}

/**
 * Create Razorpay Order API (Hostinger PHP Backend)
 */
export async function createRazorpayOrderApi(userId) {
  const result = await postRequest('razorpay-order.php', { userId });
  if (result.ok && result.data) {
    return result.data;
  }
  return {
    status: 'error',
    isMock: true,
    error: result.error || 'Failed to create order on server.'
  };
}

/**
 * Verify Razorpay Payment API (Hostinger PHP Backend DB)
 */
export async function verifyPaymentApi(payload) {
  const result = await postRequest('verify-payment.php', payload);
  if (result.ok && result.data.user) {
    return result.data;
  }
  throw new Error(result.error || 'Payment verification failed on server.');
}

// ==========================================
// ADMIN PANEL API FUNCTIONS (Hostinger PHP Backend DB)
// ==========================================

export async function adminLoginApi(email, password) {
  const result = await postRequest('admin-auth.php', { email, password, action: 'login' });
  if (result.ok && result.data.token) {
    return result.data;
  }
  throw new Error(result.error || 'Invalid admin credentials.');
}

export async function fetchAdminMembersApi(search = '', status = '', sector = '') {
  const query = new URLSearchParams({ search, status, sector }).toString();
  const result = await authFetch(`admin-members.php?${query}`);
  if (result.ok) {
    return result.data;
  }
  return { status: 'error', count: 0, members: [], message: result.error || 'Unable to fetch members list.' };
}

export async function updateMemberEntryApi(memberData) {
  const result = await postRequest('admin-members.php', { action: 'update_member', ...memberData });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to update member entry.');
}

export async function togglePaymentStatusApi(userId, paymentStatus) {
  const result = await postRequest('admin-members.php', { action: 'toggle_payment', userId, paymentStatus });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to update payment status.');
}

export async function deleteMemberApi(userId) {
  const result = await authFetch(`admin-members.php?userId=${encodeURIComponent(userId)}`, { method: 'DELETE' });
  if (result.ok) return result.data;
  return { status: 'success' };
}

export async function fetchAdminTeamApi() {
  const result = await authFetch('admin-team.php');
  if (result.ok) return result.data;
  return { status: 'success', team: [] };
}

export async function saveTeamMemberApi(payload) {
  const result = await postRequest('admin-team.php', payload);
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to save team member.');
}

export async function deleteTeamMemberApi(id) {
  const result = await authFetch(`admin-team.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (result.ok) return result.data;
  return { status: 'success' };
}

export async function fetchAdminInquiriesApi(search = '', form_type = '', status = '') {
  const query = new URLSearchParams({ search, form_type, status }).toString();
  const result = await authFetch(`admin-inquiries.php?${query}`);
  if (result.ok) return result.data;
  return { status: 'success', inquiries: [] };
}

export async function updateInquiryStatusApi(id, status, adminNotes = '') {
  const result = await postRequest('admin-inquiries.php', { id, status, adminNotes });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to update inquiry status.');
}

export async function fetchSiteSettingsApi() {
  const result = await authFetch('admin-settings.php');
  if (result.ok) return result.data;
  return { status: 'success', settings: {} };
}

export async function saveSiteSettingsApi(settings) {
  const result = await postRequest('admin-settings.php', { settings });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to save site settings.');
}
