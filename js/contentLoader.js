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
            console.log('Components loaded');
            // Load about section
            await renderTextSection('about');

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
        renderText,
        init
    };
})();


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await ContentLoader.init();
    console.log(`${document.querySelector('menu-toggle')}`)
    window.contentLoaded = true;
    document.dispatchEvent(new Event("contentLoaded"));
});
