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
        continue; // Try next URL format
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Server returned an error');
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
 * Register User API
 */
export async function registerUserApi(formData) {
  const result = await postRequest('register.php', formData);
  
  if (result.ok) {
    return result.data;
  }

  // --- LOCAL FALLBACK SIMULATION (Works even before Hostinger upload) ---
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
  if ((trimmedId.toLowerCase() === 'member@amaleeni.org' || trimmedId.includes('9876543210')) && password === 'Amaleeni@2027') {
    const demoUser = {
      id: 9999,
      full_name: 'Dr. Priya Sharma',
      email: 'member@amaleeni.org',
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
