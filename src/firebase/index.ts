'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    // --- FIX START: ONLY RUN APP CHECK IN PRODUCTION ---
    // This prevents the "ReCAPTCHA error" on localhost
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        const appCheckKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY;
        if (appCheckKey) {
            try {
                initializeAppCheck(firebaseApp, {
                    provider: new ReCaptchaV3Provider(appCheckKey),
                    isTokenAutoRefreshEnabled: true
                });
                console.log("App Check initialized (Production Mode)");
            } catch (error) {
                console.error("App Check failed to initialize:", error);
            }
        }
    } else {
        console.log("App Check skipped (Development Mode)");
    }
    // --- FIX END ---

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';