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
            const response = await fetch(`../../content/${contentType}.json`);
            
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
     * @param {Object} content - Content object with title and body or body-link
     * @param {string} selector - CSS selector for container
     */

    const renderText = async (content, selector) => {
        const container = document.querySelector(selector);
        if (!container || !content) return;
        let html = '';
        
        if (content.title) {
            html += `<h2>${content.title}</h2>`;
        }
        if (content.body) {
            html += `<p>${content.body}</p>`;
        }
        container.innerHTML = html;

        if (content['body-link']) {
            try {
                const response = await fetch(content['body-link']);
                if (response.ok) {
                    const linkedContent = await response.text();
                    container.innerHTML += linkedContent;
                } else {
                    console.error(`Failed to load linked content: ${content['body-link']}`);
                }   
            } catch (error) {
                console.error(`Error loading linked content: ${content['body-link']}`, error);
            }
        }
    };


    // Utility for rendering text sections (about, booking, contact, etc.)
    const renderTextSection = async (sectionName) => {
        const section = await ContentLoader.load(sectionName);
        if (section) {
            renderText(section, `#${sectionName}-content`);
        }
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
     * Flesh out a page with components from components/ folder
     * @param {String} component - component name (minus '.html')
     * @param {String} selector - CSS selector for where to insert the component
     */
    const renderComponent = async (component, selector) => {
        const container = document.getElementById(selector);
        if (!container) return;
        try {
            const response = await fetch(`../../components/${component}.html`);
            if (response.ok) {
                const html = await response.text();
                container.innerHTML = html;
            } else {
                console.error(`Failed to load component: ${component}`);
            }
        } catch (error) {
            console.error(`Error loading component: ${component}`, error);
        }
    };

    /* Map of component names to their container selectors for easy rendering - to be expanded */
    const componentMap = {
        navbar: 'navbar',
        footer: 'footer'    
    };

    /**
     * Initialize all content loading
     * Call this after DOM is loaded
     */
    const init = async () => {

        try {
            // Load components
            for (const [component, selector] of Object.entries(componentMap)) {
                await renderComponent(component, selector);
            }
            // Load about section
            await renderTextSection('about');

            // Load booking section
            await renderTextSection('booking');

            // Load contact info
            await renderTextSection('contact');

            // Load gender-affirming care section
            await renderTextSection('gender');

            // Load supervision section
            await renderTextSection('supervision');

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
