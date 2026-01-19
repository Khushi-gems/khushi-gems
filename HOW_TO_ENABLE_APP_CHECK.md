# How to Enable Firebase App Check

You're almost there! The code to integrate reCAPTCHA via Firebase App Check has been added to your application. You just need to complete the setup in your Firebase project console.

**Follow these steps:**

1.  **Get Your reCAPTCHA Site Key:**
    *   Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create).
    *   Create a new site.
    *   Choose **reCAPTCHA v3**.
    *   Add your website's domain(s). For local development, add `localhost`.
    *   Accept the terms and submit.
    *   Copy the **Site Key** that is generated for you.

2.  **Add the Site Key to Your Project:**
    *   In your project code, open the `.env.local` file.
    *   Replace `"YOUR_RECAPTCHA_V3_SITE_KEY"` with the actual Site Key you just copied.

    ```.env.local
    NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY="PASTE_YOUR_KEY_HERE"
    ```

3.  **Configure App Check in Firebase:**
    *   Open your Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    *   In the left-hand menu, go to **Build** > **App Check**.
    *   Click the **Apps** tab and select your web app.
    *   In the App Check integration section, click on **reCAPTCHA v3** and then click **"Save"**.
    *   You will be prompted for your reCAPTCHA **Secret Key** (which you get from the same reCAPTCHA admin console page as the Site Key). Paste it in and save.

4.  **Enforce App Check:**
    *   After registering, go to the **APIs** tab within App Check.
    *   Select **Cloud Firestore** and click **Enforce**.
    *   Select **Authentication** and click **Enforce**.

That's it! Your application's backend is now protected. Firebase will automatically reject requests that don't have a valid App Check token.
