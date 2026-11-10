import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check whether Firebase credentials have been configured
export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

let db = null;

if (typeof window !== 'undefined' || isFirebaseConfigured) {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    if (isFirebaseConfigured) {
      db = getFirestore(app);
    }
  } catch (err) {
    console.warn('Firebase initialization warning:', err.message);
  }
}

/**
 * Capture email lead for the 2027 Wine Bar Speakeasy guestlist
 * @param {{ email: string, name?: string, notes?: string }} payload
 */
export async function joinWineBarGuestlist(payload) {
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Please provide a valid email address.');
  }

  const record = {
    email: payload.email.trim().toLowerCase(),
    name: payload.name ? payload.name.trim() : null,
    source: 'wine_bar_guestlist',
    status: 'new',
    interest: 'Opening Week 2027 VIP Access',
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'wine_bar_guestlist'), {
        ...record,
        timestamp: serverTimestamp(),
      });
      return { success: true, id: docRef.id, simulated: false };
    } catch (err) {
      console.error('Error writing to Firestore:', err);
      throw new Error(err.message || 'Unable to join the guestlist at this moment.');
    }
  } else {
    // Development / demo fallback: persist to localStorage for verification
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('wine_bar_guestlist_leads') || '[]');
      existing.push(record);
      localStorage.setItem('wine_bar_guestlist_leads', JSON.stringify(existing));
    }
    await new Promise((res) => setTimeout(res, 600)); // Smooth UX feeling
    return { success: true, simulated: true };
  }
}

/**
 * Capture consultation inquiry for the Visiting Sommelier service
 * @param {{ name: string, venueName: string, email: string, phone?: string, preferredService?: string, notes?: string }} payload
 */
export async function submitConsultationInquiry(payload) {
  if (!payload.name || payload.name.trim().length < 2) {
    throw new Error('Please enter your name.');
  }
  if (!payload.venueName || payload.venueName.trim().length < 2) {
    throw new Error('Please enter your venue or restaurant name.');
  }
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Please provide a valid email address.');
  }

  const record = {
    name: payload.name.trim(),
    venueName: payload.venueName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone ? payload.phone.trim() : '',
    serviceInterest: payload.preferredService || 'Floor Takeover & Curation',
    message: payload.notes ? payload.notes.trim() : '',
    source: 'visiting_sommelier_consultation',
    status: 'pending_review',
    region: 'Mornington Peninsula / Regional Victoria',
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'sommelier_consultations'), {
        ...record,
        timestamp: serverTimestamp(),
      });
      return { success: true, id: docRef.id, simulated: false };
    } catch (err) {
      console.error('Error writing to Firestore:', err);
      throw new Error(err.message || 'Unable to submit your inquiry. Please try again.');
    }
  } else {
    // Development / demo fallback
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('sommelier_consultations_leads') || '[]');
      existing.push(record);
      localStorage.setItem('sommelier_consultations_leads', JSON.stringify(existing));
    }
    await new Promise((res) => setTimeout(res, 700));
    return { success: true, simulated: true };
  }
}

/**
 * Capture private wine tasting enquiry from the /private-tastings wizard
 * Writes strictly to Firestore collection `private_event_enquiries` (no simulated browser-only fallback).
 */
export async function submitPrivateEventEnquiry(payload) {
  if (!payload.name || payload.name.trim().length < 1) {
    throw new Error('Please enter your name.');
  }
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!isFirebaseConfigured || !db) {
    throw new Error('Database connection unavailable.');
  }

  const record = {
    occasion: payload.occasion || '',
    occasionOther: payload.occasionOther ? payload.occasionOther.trim() : '',
    groupSize: payload.groupSize || '',
    journey: payload.journey || '',
    date: payload.date || '',
    dateFlexible: Boolean(payload.dateFlexible),
    location: payload.location ? payload.location.trim() : '',
    wineBudget: payload.wineBudget || '',
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone ? payload.phone.trim() : '',
    notes: payload.notes ? payload.notes.trim() : '',
    bookingPreference: payload.bookingPreference ? payload.bookingPreference.trim() : '',
    utm: payload.utm || {},
    source: 'private-tastings-wizard',
    status: 'new',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, 'private_event_enquiries'), record);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error saving private event enquiry to Firestore:', err);
    throw new Error('Could not save your enquiry right now.');
  }
}

