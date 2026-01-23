# Fable Psychology Website

A modern, mobile-first website for a psychology practice built with semantic HTML, modular CSS, and vanilla JavaScript.

## 🎯 Features

- **Mobile-First Design**: Responsive layout optimized for all screen sizes
- **Clean Architecture**: Separation of concerns with modular code organization
- **Content Management**: JSON-based content files for easy updates without touching code
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Performance**: Lightweight, minimal dependencies, fast loading
- **Future-Proof**: Well-commented, modular design for easy expansion

## 📁 Project Structure

```
fable-psychology/
├── index.html              # Main HTML entry point
├── styles/
│   ├── variables.css       # Design tokens and CSS custom properties
│   ├── reset.css           # CSS normalization and resets
│   ├── base.css            # Base element styles and utilities
│   ├── layout.css          # Layout components (navbar, sections, footer)
│   └── components.css      # Reusable UI components (buttons, forms, cards)
├── js/
│   ├── contentLoader.js    # Loads and renders content from JSON files
│   ├── navigation.js       # Navigation and menu functionality
│   └── main.js             # Core app logic (forms, events, utilities)
├── content/
│   ├── hero.json           # Hero section content
│   ├── about.json          # About section content
│   ├── services.json       # Services listing
│   ├── blog.json           # Blog posts
│   └── contact.json        # Contact information
└── assets/                 # Images, icons, and other media
```

## 🎨 Design System

All colors, spacing, typography, and animations are defined as CSS custom properties in `styles/variables.css`. This enables:

- **Consistent theming** across the entire site
- **Easy dark mode** implementation
- **Accessible color contrasts**
- **Reduced media queries** through responsive design tokens

### Key Variables

- **Colors**: Primary, secondary, accent, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: 4px-based scale for consistent alignment
- **Shadows**: Multiple depth levels for visual hierarchy
- **Transitions**: Standardized timing for smooth interactions
- **Z-index**: Predictable stacking order

## 🚀 Getting Started

### Local Development

1. Clone/download the project
2. Open `index.html` in a modern web browser
3. Edit content in the `content/` directory as JSON files

### Adding Content

All content is stored in JSON files in the `content/` directory. Edit these files to update your site:

- **hero.json** - Hero section subtitle
- **about.json** - About page content
- **services.json** - Service offerings
- **blog.json** - Blog posts with dates
- **contact.json** - Contact information

### Modifying Styles

Styles are organized by specificity and purpose:

1. **variables.css** - Update colors, spacing, fonts here first
2. **components.css** - Add new component styles
3. **layout.css** - Modify page layout and navigation
4. **base.css** - Core typography and utility classes

## 🔧 JavaScript Modules

### ContentLoader
Handles loading JSON files and rendering content dynamically.

```javascript
// Load and render a content section
const data = await ContentLoader.load('services');
ContentLoader.renderCards(data.items, '#services-grid', 'service');
```

### Navigation
Manages mobile menu toggle, smooth scrolling, and active section highlighting.

### App
Core application logic including:
- Contact form validation
- Error handling
- Event logging (analytics-ready)
- Form submission handling

## 📱 Responsive Breakpoints

The site uses mobile-first CSS with these breakpoints:

- **Mobile**: < 640px (default)
- **Small (sm)**: ≥ 640px
- **Medium (md)**: ≥ 768px
- **Large (lg)**: ≥ 1024px
- **Extra Large (xl)**: ≥ 1280px
- **2X Large (2xl)**: ≥ 1536px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Focus management and keyboard navigation
- Color contrast compliance
- Skip-to-content link
- Reduced motion support

## 🔮 Future Enhancements

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Search functionality
- [ ] Comment system for blog
- [ ] Analytics integration
- [ ] Email notifications for contact form
- [ ] Social media integration
- [ ] Appointment booking system

## 🛠️ Common Tasks

### Add a New Section

1. Add HTML structure in `index.html`
2. Create corresponding JSON file in `content/`
3. Add loading logic in `js/contentLoader.js`
4. Style using existing component classes or add to `components.css`

### Add New Color Theme

Edit CSS variables in `styles/variables.css` and update throughout the site automatically.

### Update Navigation Links

Edit the `<nav>` element in `index.html`. Navigation JS will automatically handle smooth scrolling and active states.

## 📝 Best Practices

- Keep content separate from code (use JSON files)
- Use CSS variables for consistent theming
- Follow existing naming conventions
- Add comments to complex logic
- Test responsive design on multiple devices
- Validate HTML and CSS

## 📄 License

Add your preferred license here.

## 📧 Support

For questions or issues, contact: [contact@fablepsychology.com](mailto:contact@fableeyepsychology.com)

---

**Last Updated**: January 21, 2026
