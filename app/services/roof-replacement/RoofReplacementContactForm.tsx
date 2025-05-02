'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper function to format phone number (can be moved to utils if used elsewhere)
const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, "");
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

// Helper function to validate email (can be moved to utils)
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function RoofReplacementContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "roof-replacement", // Pre-fill service
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added submitting state
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'phone' ? formatPhoneNumber(value) : value,
    }));
    // Clear error for this field if it has a value
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim() || !isValidEmail(formData.email),
      phone: !formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10,
      address: !formData.address.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
        console.log("Form validation failed");
        return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    // --- Actual Form Submission Logic --- Simulate delay
    try {
      // Replace with your actual API call
      // const response = await fetch('/api/send', { ... });
      // if (!response.ok) throw new Error('Network response was not ok.');

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      console.log("Form submitted (simulated):", formData);
      setFormSubmitted(true);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit estimate request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      {formSubmitted ? (
        <div className="text-center py-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </motion.div>
          <h3 className="mt-4 text-2xl font-semibold">Thank You!</h3>
          <p className="mt-2 text-gray-600">Your estimate request has been sent successfully. We will be in touch with you shortly!</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.firstName ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                required
                aria-invalid={formErrors.firstName}
                aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
              />
              {formErrors.firstName && <p id="firstName-error" className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>First name is required.</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.lastName ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                required
                aria-invalid={formErrors.lastName}
                aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
              />
              {formErrors.lastName && <p id="lastName-error" className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>Last name is required.</p>}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.email ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                required
                aria-invalid={formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>Please enter a valid email address.</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.phone ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                required
                aria-invalid={formErrors.phone}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>Valid US phone number is required.</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">Property Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="street-address"
              value={formData.address}
              onChange={handleInputChange}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.address ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              required
              aria-invalid={formErrors.address}
              aria-describedby={formErrors.address ? "address-error" : undefined}
            />
            {formErrors.address && <p id="address-error" className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>Property address is required.</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Additional Information (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>

          {/* Submit Error Message */}
          {submitError && <p className="text-sm text-red-600 text-center">Error: {submitError}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-500 px-6 py-3 text-lg font-bold text-white shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending Request...' : 'Request My Free Estimate'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 