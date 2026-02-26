'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

type FormFields = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormFields = {
  name: '',
  email: '',
  message: '',
};

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'text' in error) {
    return String((error as { text?: string }).text || 'Something went wrong. Please try again.');
  }
  return 'Something went wrong. Please try again.';
};

const Contact = () => {
  const [formData, setFormData] = useState<FormFields>(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      if (status.type !== 'idle') {
        setStatus({ type: 'idle', message: '' });
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (payload.name.length < 2) {
      setStatus({ type: 'error', message: 'Please let me know who you are.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (payload.message.length < 10) {
      setStatus({ type: 'error', message: 'A bit more detail would be helpful.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const canSendEmail =
        !!emailjsConfig.serviceId && !!emailjsConfig.templateId && !!emailjsConfig.publicKey;

      let emailOk = false;
      let storeOk = false;
      let emailError: string | null = null;
      let storeError: string | null = null;

      const storePromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data?.error || 'Unable to store your message right now.');
          }
          storeOk = true;
        })
        .catch((error) => {
          storeError = getErrorMessage(error);
        });

      const emailPromise = canSendEmail
        ? emailjs
            .send(
              emailjsConfig.serviceId,
              emailjsConfig.templateId,
              {
                from_name: payload.name,
                reply_to: payload.email,
                message: payload.message,
                submitted_at: new Date().toISOString(),
              },
              emailjsConfig.publicKey
            )
            .then(() => {
              emailOk = true;
            })
            .catch((error) => {
              emailError = getErrorMessage(error);
            })
        : Promise.resolve();

      await Promise.all([storePromise, emailPromise]);

      if (storeOk || emailOk) {
        setFormData(initialState);
        setStatus({ type: 'success', message: 'Thanks for reaching out! I will get back to you soon.' });
      } else {
        setStatus({
          type: 'error',
          message: storeError || emailError || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setStatus({ type: 'error', message: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-max-fit p-6 grid gap-5 md:p-8 md:grid-cols-2'>
    <div>
        <h2 className='text-[var(--primary)] mb-5'> Contact Information</h2>
        <p className='text-md'>Let&apos;s connect! I&apos;m always open to discussing new project ideas and potential collaborations. Feel free to reach out through any of the channels below.</p>
        <ul className="mt-3 space-y-2 md:space-x-3">
          <li className='flex flex-row items-center'>
            <span className="font-semibold text-sm">Gmail:{" "}
            <Link href="mailto:adityabajgain@gmail.com" className="text-[var(--primary)] hover:underline">
              adityabajgain@gmail.com
            </Link></span>
          </li>
          <li className='flex flex-row items-center'>
            <span className="font-semibold text-sm">LinkedIn:{" "}
            <Link href="https://linkedin.com/in/AadityaBajgain" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] text-sm hover:underline">
              linkedin.com/in/AadityaBajgain
            </Link></span>
          </li>
          <li className='flex flex-row items-center'>
            <span className="font-semibold text-sm">GitHub:{" "}
            <Link href="https://github.com/AadityaBajgain" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] text-sm hover:underline">
              github.com/AadityaBajgain
            </Link></span>
          </li>
        </ul>
    </div>
    <form className='form' onSubmit={handleSubmit} noValidate>
      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        name="name"
        type="text"
        placeholder='Enter your name'
        value={formData.name}
        onChange={handleChange('name')}
        minLength={2}
        maxLength={100}
        required
      />
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        placeholder='Enter your email'
        value={formData.email}
        onChange={handleChange('email')}
        required
      />
      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        placeholder='Enter your message'
        value={formData.message}
        onChange={handleChange('message')}
        rows={5}
        minLength={10}
        maxLength={1000}
        required
      ></textarea>
      <button className='button mt-4 cursor-pointer' type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
      <p
        className={`text-sm mt-3 text-center ${
          status.type === 'error' ? 'text-red-500' : 'text-[var(--primary)]'
        }`}
        aria-live="polite"
      >
        {status.type !== 'idle' ? status.message : ''}
      </p>
    </form>
    </div>
    
  )
}

export default Contact
