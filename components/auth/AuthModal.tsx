'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.askharekrishna.com/api';

const SUBSCRIBER_EMAIL_KEY = 'askharekrishna-subscriber-email';
const SUBSCRIBER_NAME_KEY = 'askharekrishna-subscriber-name';
const SUBSCRIBER_PICTURE_KEY = 'askharekrishna-subscriber-picture';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setError(null);
    }
  }, [open]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse?.credential) return;
    setError(null);
    setSubmitting(true);
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const email = decoded.email || '';
      const name = decoded.name || '';
      const picture = decoded.picture || '';
      const google_id = decoded.sub || '';

      const response = await axios.post(`${API_BASE_URL}/subscribers/google-auth/`, {
        credential: credentialResponse.credential,
        email,
        name,
        picture,
        google_id,
        language: 'en',
      });

      if (typeof window !== 'undefined') {
        if (email) window.localStorage.setItem(SUBSCRIBER_EMAIL_KEY, email);
        if (name) window.localStorage.setItem(SUBSCRIBER_NAME_KEY, name);
        if (picture) window.localStorage.setItem(SUBSCRIBER_PICTURE_KEY, picture);
        window.dispatchEvent(new Event('subscriber-updated'));
      }

      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Kirtan Google login error:', err);
      setError('Google Sign In failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#1a150c] border border-[#f3efe7] dark:border-neutral-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 size-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 border border-amber-500/20 shadow-sm">
            <span className="material-symbols-outlined text-2xl">queue_music</span>
          </div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Krishna Kirtan Sign In
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            Sign in with your Google account to save favorite bhajans, playlists, and audio bookmarks.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="flex justify-center w-full min-h-[44px]">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError('Google Sign In failed. Please try again.');
              }}
              theme="filled_black"
              shape="pill"
              size="large"
              text="signin_with"
            />
          </div>

          {submitting && (
            <p className="text-xs font-semibold text-amber-500 animate-pulse">
              Signing in...
            </p>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
