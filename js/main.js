/**
 * Main Application Module
 * ============================================================================
 * Core application functionality and utilities.
 * 
 * Features:
 * - Contact form handling
 * - Form validation
 * - Error handling
 * - Analytics hooks (for future integration)
 */

const App = (() => {
    // Configuration
    const config = {
        contactFormSelector: '#contact-form',
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        successMessageDuration: 5000 // milliseconds
    };

    /**
     * Initialize application
     */
    const init = () => {
        setupContactForm();
    };

    /**
     * Setup contact form submission
     */
    const setupContactForm = () => {
        const form = document.querySelector(config.contactFormSelector);
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            handleFormSubmit(form);
        });
    };

    /**
     * Handle contact form submission
     * @param {HTMLFormElement} form - The form element
     */
    const handleFormSubmit = async (form) => {
        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success feedback
            showSuccessMessage('Message sent successfully! We\'ll be in touch soon.');
            form.reset();

            // Log for analytics (future enhancement)
            logEvent('form_submission', { form: 'contact' });

        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('An error occurred. Please try again later.');
            logEvent('form_error', { form: 'contact', error: error.message });
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };

    /**
     * Validate contact form
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} True if valid, false otherwise
     */
    const validateForm = (form) => {
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');

        // Clear previous errors
        clearErrors(form);

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            showFieldError(nameInput, 'Name is required');
            isValid = false;
        }

        // Validate email
        if (!emailInput.value.trim()) {
            showFieldError(emailInput, 'Email is required');
            isValid = false;
        } else if (!config.emailRegex.test(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            showFieldError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showFieldError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    };

    /**
     * Show validation error for a field
     * @param {HTMLElement} field - The form field
     * @param {string} message - Error message
     */
    const showFieldError = (field, message) => {
        field.classList.add('error');
        
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        errorEl.style.color = 'var(--color-danger)';
        errorEl.style.fontSize = 'var(--font-size-sm)';
        errorEl.style.marginTop = 'var(--spacing-xs)';
        
        field.parentElement.appendChild(errorEl);
    };

    /**
     * Clear all errors from form
     * @param {HTMLFormElement} form - The form
     */
    const clearErrors = (form) => {
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        form.querySelectorAll('.field-error').forEach(errorEl => {
            errorEl.remove();
        });
    };

    /**
     * Show success message
     * @param {string} message - Success message text
     */
    const showSuccessMessage = (message) => {
        showNotification(message, 'success');
    };

    /**
     * Show error message
     * @param {string} message - Error message text
     */
    const showErrorMessage = (message) => {
        showNotification(message, 'danger');
    };

    /**
     * Show notification message
     * @param {string} message - Message text
     * @param {string} type - Message type (success, info, warning, danger)
     */
    const showNotification = (message, type = 'info') => {
        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type}`;
        alertEl.setAttribute('role', 'alert');
        alertEl.textContent = message;
        alertEl.style.position = 'fixed';
        alertEl.style.top = 'var(--spacing-lg)';
        alertEl.style.right = 'var(--spacing-lg)';
        alertEl.style.zIndex = 'var(--z-modal)';
        alertEl.style.maxWidth = '500px';
        alertEl.style.animation = 'slideIn 0.3s ease-in-out';

        document.body.appendChild(alertEl);

        // Auto-remove after duration
        setTimeout(() => {
            alertEl.style.animation = 'slideOut 0.3s ease-in-out';
            setTimeout(() => {
                alertEl.remove();
            }, 300);
        }, config.successMessageDuration);
    };

    /**
     * Log event for analytics
     * @param {string} eventName - Name of the event
     * @param {Object} eventData - Event data/properties
     */
    const logEvent = (eventName, eventData = {}) => {
        // Future: Integrate with analytics service (Google Analytics, etc.)
        console.log(`Event: ${eventName}`, eventData);
    };

    // Add animations for notifications
    const addAnimations = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Public API
    return {
        init,
        logEvent
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    // Add animations once at startup
    const addAnimations = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
    addAnimations();
});
