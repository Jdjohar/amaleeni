# Hostinger te PHP & MySQL Setup Guide (Amaleeni Pink Pages)

Tuhada backend bilkul ready hai! Hostinger te es nu live karn lai eh asaan steps follow karo:

---

### Step 1: Hostinger hPanel ch MySQL Database Bnao
1. Hostinger control panel (**hPanel**) ch login karo.
2. **Databases** -> **MySQL Databases** te click karo.
3. Nawa Database create karo:
   - **Database Name**: e.g., `u123456_amaleeni`
   - **Username**: e.g., `u123456_user`
   - **Password**: Ik strong password set karo te copy kar lo.
4. Database create hon to baad, **phpMyAdmin** button te click karo.
5. phpMyAdmin ch **Import** tab te jao, `backend/schema.sql` file choose karo te **Import** (Go) te click karo.
   - Es naal `users`, `pink_pages_profiles`, `orders`, and `login_attempts` tables auto-create ho jange.

---

### Step 2: `backend/config.php` ch Details Update Karo
`backend/config.php` file kholo te apne credentials pao:
```php
define('DB_HOST', 'localhost'); // usually localhost
define('DB_NAME', 'tuhada_db_name');
define('DB_USER', 'tuhada_db_user');
define('DB_PASS', 'tuhada_db_password');

// Razorpay Keys (dashboard.razorpay.com -> Settings -> API Keys)
define('RAZORPAY_KEY_ID', 'rzp_live_XXXXXXXXXXXXXX'); // or rzp_test_...
define('RAZORPAY_KEY_SECRET', 'tuhadi_key_secret');
```

---

### Step 3: Files Hostinger te Upload Karo
1. Hostinger hPanel ch **File Manager** kholo.
2. `public_html` folder de andar ik nawa folder bnao jida naam rakho: **`api`**.
   - Path hovega: `public_html/api/`
3. `backend` folder diyan sariyan files upload kar do (chahe seedha `public_html/` ch upload kar do ya `public_html/api/` ch — frontend donve URLs nu auto-detect kar lainda hai!):
   - `index.php` (health check)
   - `config.php` (DB & Razorpay keys)
   - `db.php` (PDO connection)
   - `cors.php` (CORS headers)
   - `email-helper.php` (Emails)
   - `register.php` (Registration)
   - `login.php` (Authentication)
   - `razorpay-order.php` (Payment order)
   - `verify-payment.php` (Verify signature)
   - `razorpay-webhook.php` (Automated server-to-server webhook listener)
   - `me.php` (Session check)
   - `.htaccess` (Security)

Tuhada API endpoint URL ready ho javega: `https://linen-oryx-691439.hostingersite.com`

---

### Step 4: Vercel te Environment Variables Add Karo
Vercel dashboard ch apne project di **Settings** -> **Environment Variables** ch add karo:
- `API_URL` = `https://linen-oryx-691439.hostingersite.com`
- `RAZORPAY_KEY_ID` = tuhadi Razorpay Key ID (e.g. `rzp_live_...`)

---

### Step 5: Razorpay Dashboard ch Webhook Setup Karo (Automatic DB Update)
Agar user payment karn to baad browser band v kar deve, taan v database automatically update hovega:
1. **Razorpay Dashboard** (`https://dashboard.razorpay.com`) ch login karo.
2. Left sidebar to **Account & Settings** -> **Webhooks** te jao.
3. **+ Add New Webhook** button te click karo:
   - **Webhook URL**: `https://linen-oryx-691439.hostingersite.com/razorpay-webhook.php`
   - **Secret**: Ik secret code set karo (e.g., `ama_secret_webhook_9921`) te eh hi code `backend/config.php` ch `RAZORPAY_WEBHOOK_SECRET` ch pao.
   - **Active Events**: Eh do events tick/select karo:
     - `payment.captured`
     - `order.paid`
4. **Create Webhook** te click karo.
Bas! Hun koi v payment aavegi taan Razorpay sidha tuhade server nu call karega te database ch `payment_status = 'PAID'` apne aap ho javega!
