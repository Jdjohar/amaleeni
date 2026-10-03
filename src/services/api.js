/**
 * API Service for Amaleeni Pink Pages
 * Connects to Hostinger PHP backend with intelligent local fallback
 */

const RAW_URL = import.meta.env.API_URL || 'https://linen-oryx-691439.hostingersite.com';
const API_BASE_URL = RAW_URL.replace(/\/+$/, '');
export const RAZORPAY_KEY_ID = import.meta.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyIdHere';

// Helper for HTTP requests
async function postRequest(endpoint, payload) {
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
        };
      }
      return { ok: true, data };
    } catch (err) {
      if (url === tryUrls[tryUrls.length - 1]) {
        console.warn(`Backend endpoint ${endpoint} unavailable or offline:`, err.message);
        return { ok: false, error: err.message };
      }
    }
  }

  return { ok: false, error: 'All backend URL attempts failed.' };
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
 * Register User API
 */
export async function registerUserApi(formData) {
  const result = await postRequest('register.php', formData);
  
  if (result.ok) {
    return result.data;
  }

  // If server responded with a specific HTTP error (e.g. 409 duplicate, 422 validation, 500 server error)
  if (result.status && result.status !== 404) {
    throw new Error(result.error || 'Registration failed. Please try again.');
  }
  console.info('Using local client-side storage simulation for registration.');
  const existingUsers = JSON.parse(localStorage.getItem('ama_mock_users') || '[]');
  
  const cleanPhone = (formData.phone || '').replace(/[^0-9]/g, '');
  const userEmail = (formData.email || (cleanPhone ? cleanPhone + '@amaleeni.member' : 'member@amaleeni.member')).toLowerCase();
  
  const existing = existingUsers.find((u) => 
    (u.email && u.email.toLowerCase() === userEmail) ||
    (cleanPhone && (u.phone || '').replace(/[^0-9]/g, '') === cleanPhone)
  );
  if (existing) {
    throw new Error('An account with this WhatsApp Number or Email already exists. Please log into your account.');
  }

  const newId = Date.now();
  const refId = 'PP-' + Math.floor(100000 + Math.random() * 900000);
  
  const newUser = {
    id: newId,
    full_name: formData.fullName,
    email: userEmail,
    phone: formData.phone,
    password: formData.password, // only in local mock
    org_name: formData.orgName,
    designation: formData.designation || 'Founder / Leader',
    category: formData.profileCategory || 'Entrepreneurs & Founders',
    sector: formData.sector || 'Technology & Digital',
    city: formData.cityPin || formData.city || 'Lucknow',
    state_country: formData.stateCountry || 'India',
    website_url: formData.websiteUrl || '',
    seeking: Array.isArray(formData.seeking) ? formData.seeking.join(', ') : (formData.seeking || 'Capital & Investment, Market Access'),
    business_description: formData.businessDescription || '',
    payment_status: 'PENDING',
    payment_amount: 5000.00,
    created_at: new Date().toISOString(),
    ref_id: refId,
  };

  existingUsers.push(newUser);
  localStorage.setItem('ama_mock_users', JSON.stringify(existingUsers));

  return {
    status: 'success',
    token: 'mock_token_' + newId,
    user: newUser,
    message: 'Registration successful! Directing to Member Dashboard.',
    isLocalFallback: true,
  };
}

/**
 * Login User API (Supports WhatsApp Phone or Email)
 */
export async function loginUserApi(identifier, password, botTrap = '') {
  // Bot check
  if (botTrap) {
    throw new Error('Spam bot detected. Access rejected.');
  }

  const trimmedId = (identifier || '').trim();
  const cleanPhone = trimmedId.replace(/[^0-9]/g, '');

  // 1. Try exact identifier with Hostinger backend
  let result = await postRequest('login.php', { email: trimmedId, password, website_bot_trap: botTrap });

  // 2. If phone number entered, also try cleaned digits and member-email variants
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

  // --- LOCAL FALLBACK SIMULATION ---
  console.info('Checking local client-side storage for account...');
  const existingUsers = JSON.parse(localStorage.getItem('ama_mock_users') || '[]');

  const found = existingUsers.find((u) => 
    (u.email && u.email.toLowerCase() === trimmedId.toLowerCase()) ||
    (cleanPhone && (u.phone || '').replace(/[^0-9]/g, '') === cleanPhone) ||
    (cleanPhone && u.email && u.email.toLowerCase() === `${cleanPhone}@amaleeni.member`)
  );

  if (found && found.password === password) {
    return {
      status: 'success',
      token: 'mock_token_' + found.id,
      user: found,
      isLocalFallback: true,
    };
  }

  // Provide demo test account fallback
  if ((trimmedId.toLowerCase() === 'member@amaleeni.com' || trimmedId.toLowerCase() === 'member@amaleeni.org' || trimmedId.includes('9876543210')) && password === 'Amaleeni@2027') {
    const demoUser = {
      id: 9999,
      full_name: 'Dr. Priya Sharma',
      email: 'member@amaleeni.com',
      phone: '+91 98765 43210',
      org_name: 'Priya Biotech Innovations',
      designation: 'Founder & Managing Director',
      sector: 'Healthcare & Life Sciences',
      category: 'Entrepreneurs & Founders',
      city: 'Lucknow, UP',
      state_country: 'India',
      payment_status: 'PAID',
      payment_amount: 5000.00,
      ref_id: 'PP-DEMO27',
    };
    return {
      status: 'success',
      token: 'mock_demo_token',
      user: demoUser,
    };
  }

  throw new Error(result.error || 'Invalid credentials or account not found. Please verify your Email/WhatsApp No. and password.');
}

/**
 * Create Razorpay Order API
 */
export async function createRazorpayOrderApi(userId) {
  const result = await postRequest('razorpay-order.php', { userId });
  if (result.ok && result.data.orderId) {
    return result.data;
  }

  // Fallback mock order
  return {
    status: 'success',
    orderId: 'order_mock_' + Math.floor(100000 + Math.random() * 900000),
    amount: 500000,
    currency: 'INR',
    keyId: RAZORPAY_KEY_ID,
    isMock: true,
  };
}

/**
 * Verify Razorpay Payment API
 */
export async function verifyPaymentApi(payload) {
  const result = await postRequest('verify-payment.php', payload);
  if (result.ok && result.data.user) {
    return result.data;
  }

  // Fallback mock verification
  console.info('Simulating payment verification in local environment.');
  const existingUsers = JSON.parse(localStorage.getItem('ama_mock_users') || '[]');
  const idx = existingUsers.findIndex((u) => u.id === payload.userId);
  
  if (idx !== -1) {
    existingUsers[idx].payment_status = 'PAID';
    existingUsers[idx].razorpay_payment_id = payload.razorpayPaymentId;
    existingUsers[idx].paid_at = new Date().toISOString();
    localStorage.setItem('ama_mock_users', JSON.stringify(existingUsers));
    return {
      status: 'success',
      user: existingUsers[idx],
    };
  }

  return {
    status: 'success',
    user: {
      ...payload,
      payment_status: 'PAID',
      paid_at: new Date().toISOString(),
    },
  };
}

// ==========================================
// ADMIN PANEL API FUNCTIONS
// ==========================================

export async function adminLoginApi(email, password) {
  const result = await postRequest('admin-auth.php', { email, password, action: 'login' });
  if (result.ok && result.data.token) {
    return result.data;
  }
  // Local fallback for admin login
  if (email === 'president@amaleeni.com' && password === 'AmaleeniAdmin@2027') {
    const adminUser = {
      id: 1,
      full_name: 'Dr. Akshaya Jain',
      email: 'president@amaleeni.com',
      phone: '+91 98100 55241',
      role: 'admin',
      permissions: ['all']
    };
    return {
      status: 'success',
      token: 'mock_admin_token_123',
      user: adminUser
    };
  }
  throw new Error(result.error || 'Invalid admin credentials.');
}

export async function fetchAdminMembersApi(search = '', status = '', sector = '') {
  const query = new URLSearchParams({ search, status, sector }).toString();
  const tryUrls = [
    `${API_BASE_URL}/admin-members.php?${query}`,
    `${API_BASE_URL}/api/admin-members.php?${query}`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {}
  }
  // Local fallback
  const mockUsers = JSON.parse(localStorage.getItem('ama_mock_users') || '[]');
  return { status: 'success', count: mockUsers.length, members: mockUsers };
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
  const tryUrls = [
    `${API_BASE_URL}/admin-members.php?userId=${userId}`,
    `${API_BASE_URL}/api/admin-members.php?userId=${userId}`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return { status: 'success' };
}

export async function fetchAdminTeamApi() {
  const tryUrls = [
    `${API_BASE_URL}/admin-team.php`,
    `${API_BASE_URL}/api/admin-team.php`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {}
  }
  return { status: 'success', team: [] };
}

export async function saveTeamMemberApi(payload) {
  const result = await postRequest('admin-team.php', payload);
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to save team member.');
}

export async function deleteTeamMemberApi(id) {
  const tryUrls = [
    `${API_BASE_URL}/admin-team.php?id=${id}`,
    `${API_BASE_URL}/api/admin-team.php?id=${id}`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return { status: 'success' };
}

export async function fetchAdminInquiriesApi(search = '', form_type = '', status = '') {
  const query = new URLSearchParams({ search, form_type, status }).toString();
  const tryUrls = [
    `${API_BASE_URL}/admin-inquiries.php?${query}`,
    `${API_BASE_URL}/api/admin-inquiries.php?${query}`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return { status: 'success', inquiries: [] };
}

export async function updateInquiryStatusApi(id, status, adminNotes = '') {
  const result = await postRequest('admin-inquiries.php', { id, status, adminNotes });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to update inquiry status.');
}

export async function fetchSiteSettingsApi() {
  const tryUrls = [
    `${API_BASE_URL}/admin-settings.php`,
    `${API_BASE_URL}/api/admin-settings.php`
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return { status: 'success', settings: {} };
}

export async function saveSiteSettingsApi(settings) {
  const result = await postRequest('admin-settings.php', { settings });
  if (result.ok) return result.data;
  throw new Error(result.error || 'Failed to save site settings.');
}
