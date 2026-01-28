/**
 * Content Loader Module
 * ============================================================================
 * Handles loading and rendering content from JSON files.
 * Provides a clean separation between content and code.
 * 
 * Usage:
 * ContentLoader.load('services').then(data => {
 *     ContentLoader.renderCards(data, '#services-grid');
 * });
 */

const ContentLoader = (() => {
    /**
     * Load content from a JSON file
     * @param {string} contentType - The content type/filename (without .json)
     * @returns {Promise<Object>} The parsed content data
     */
    const load = async (contentType) => {
        try {
            const response = await fetch(`content/${contentType}.json`);
            
            if (!response.ok) {
                console.error(`Failed to load content: ${contentType}`);
                return null;
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading content file: ${contentType}`, error);
            return null;
        }
    };

    /**
     * Render card-based content
     * @param {Array} items - Array of items to render
     * @param {string} selector - CSS selector for container
     * @param {string} cardType - Type of card to render ('service', 'blog', etc)
     */
    const renderCards = (items, selector, cardType = 'card') => {
        const container = document.querySelector(selector);
        if (!container || !items) return;

        container.innerHTML = '';
        
        items.forEach(item => {
            const card = createCard(item, cardType);
            container.appendChild(card);
        });
    };

    /**
     * Create a card element from item data
     * @param {Object} item - Item data
     * @param {string} cardType - Type of card
     * @returns {HTMLElement} The created card element
     */
    const createCard = (item, cardType) => {
        const card = document.createElement('div');
        card.className = `card ${cardType}-card`;

        let cardHTML = `<h3>${item.title || ''}</h3>`;

        if (item.description) {
            cardHTML += `<p>${item.description}</p>`;
        }

        if (cardType === 'blog' && item.date) {
            cardHTML = `<div class="blog-card-meta">
                            <span class="blog-card-date">${formatDate(item.date)}</span>
                        </div>` + cardHTML;
        }

        if (item.tags) {
            cardHTML += `<div class="card-tags">`;
            item.tags.forEach(tag => {
                cardHTML += `<span class="badge badge-primary">${tag}</span> `;
            });
            cardHTML += `</div>`;
        }

        if (item.cta && item.cta.text) {
            cardHTML += `<a href="${item.cta.link || '#'}" class="btn btn-primary">${item.cta.text}</a>`;
        }

        card.innerHTML = cardHTML;
        return card;
    };

    /**
     * Render text content
     * @param {Object} content - Content object with title and body
     * @param {string} selector - CSS selector for container
     */
    const renderText = (content, selector) => {
        const container = document.querySelector(selector);
        if (!container || !content) return;

        let html = '';
        
        if (content.title) {
            html += `<h3>${content.title}</h3>`;
        }

        if (content.body) {
            html += `<p>${content.body}</p>`;
        }

        container.innerHTML = html;
    };

    /**
     * Render downloadable resources
     * @param {Array} items - Array of resource items
     * @param {string} selector - CSS selector for container
     */
    const renderResources = (items, selector) => {
        const container = document.querySelector(selector);
        if (!container || !items) return;

        container.innerHTML = '';
        
        items.forEach(item => {
            const resource = createResourceCard(item);
            container.appendChild(resource);
        });
    };

    /**
     * Create a resource card element
     * @param {Object} item - Resource item data
     * @returns {HTMLElement} The created resource card
     */
    const createResourceCard = (item) => {
        const card = document.createElement('div');
        card.className = 'card resource-card';

        let cardHTML = `<h3>${item.title || ''}</h3>`;

        if (item.description) {
            cardHTML += `<p>${item.description}</p>`;
        }

        if (item.type) {
            cardHTML += `<span class="badge badge-primary">${item.type}</span>`;
        }

        if (item.download) {
            cardHTML += `<a href="${item.download.url}" class="btn btn-primary" download="${item.download.filename || ''}" target="_blank">
                            📥 Download ${item.download.filename || 'File'}
                        </a>`;
        }

        card.innerHTML = cardHTML;
        return card;
    };

    /**
     * Initialize all content loading
     * Call this after DOM is loaded
     */
    const init = async () => {
        /**
         * If a section has render set to false, skip rendering and remove from DOM
         * @param {Object} content - The content object
         * @param {string} selector - CSS selector for the container
         */
        const handleConditionalRendering = (content, selector) => {
            const container = document.querySelector(selector);
            if (!container) return; /* If it's not there anyway, don't need to bother deleting it! */
            /* Has "content &&" to avoid glitching if it's null or undefined */
            if (content && content.render === false) {
                container.remove(); /* Remove the relevant section from the DOM... */
                /* ...and also remove any navigation links pointing to it... */
                const navLink = document.querySelector(`a[data-section="${container.id}"]`);
                if (navLink) navLink.remove();
                /* ...and any empty space it would have taken up in the nav bar */
                const navSpacer = document.querySelector(`.nav-spacer[data-section="${container.id}"]`);
                if (navSpacer) navSpacer.remove();
            }
        };

        const sectionsToCheck = [
            { type: 'about', selector: '#about' },
            { type: 'blog', selector: '#blog-section' },
            { type: 'booking', selector: '#booking' },
            { type: 'contact', selector: '#contact' },
            { type: 'hero', selector: '#home' },
            { type: 'services', selector: '#services' },
            { type: 'resources', selector: '#resources' }
        ];

        sectionsToCheck.forEach(async ({ type, selector }) => {
            const content = await load(type);
            handleConditionalRendering(content, selector);
        });

        try {
            // Load hero subtitle
            const heroData = await load('hero');
            if (heroData && heroData.subtitle) {
                const subtitleEl = document.querySelector('#hero-subtitle');
                if (subtitleEl) subtitleEl.textContent = heroData.subtitle;
            }

            // Load about section
            const aboutData = await load('about');
            if (aboutData) {
                renderText(aboutData, '#about-content');
            }

            // Load services
            const servicesData = await load('services');
            if (servicesData && servicesData.items) {
                renderCards(servicesData.items, '#services-grid', 'service');
            }

            // Load resources
            const resourcesData = await load('resources');
            if (resourcesData) {
                if (resourcesData.intro) {
                    renderText(resourcesData.intro, '#resources-intro');
                }
                if (resourcesData.items) {
                    renderResources(resourcesData.items, '#resources-grid');
                }
            }

            // Load booking section
            const bookingData = await load('booking');
            if (bookingData) {
                renderText(bookingData, '#booking-content');
            }

            // Load contact info
            const contactData = await load('contact');
            if (contactData) {
                renderText(contactData, '#contact-content');
            }
        } catch (error) {
            console.error('Error initializing content loader:', error);
        }
    };

    // Public API
    return {
        load,
        renderCards,
        renderText,
        renderResources,
        init
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ContentLoader.init();
});
