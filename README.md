# Spartan Spirit Speaker Website

A responsive website for Pleasant Valley High School's student-designed collectible speaker project.

## Project Overview

The Spartan Spirit Speaker is a student-led initiative combining STEM education, school spirit, and fundraising. Students design, manufacture, and market limited-edition Spartan helmet speakers pre-programmed with the PV fight song.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** Vercel
- **Form Integration:** Google Forms (to be configured)
- **Version Control:** Git + GitHub

## File Structure

```
/
├── index.html              # Main website file
├── styles.css             # Stylesheet with PV brand colors
├── script.js              # JavaScript for interactions
├── /assets/               # Image assets
│   ├── product-concept.jpg # Hero product image
│   └── iteration-1.jpg    # Collectible series image
├── README.md              # This file
└── vercel.json           # Vercel deployment config
```

## Features

- **Mobile-first responsive design**
- **Smooth scrolling navigation**
- **Email signup form** (ready for Google Form integration)
- **Accessibility features** (WCAG AA compliant)
- **Performance optimized**
- **SEO ready**

## Brand Guidelines

- **Primary Navy:** #143A63
- **Secondary Blue:** #215A8D  
- **Light Gray:** #F2F4F7
- **Accent Gold:** #F4B000
- **Typography:** System UI font stack

## Content Sections

1. **Hero** - Main call-to-action and product showcase
2. **About** - Project overview and key features
3. **How It Works** - 4-step ordering process
4. **Student Impact** - Learning outcomes and skills gained
5. **Collectible Series** - Annual edition concept
6. **Email Signup** - Notification form for ordering windows
7. **FAQ** - Common questions and answers
8. **Footer** - School branding and copyright

## Setup for Google Form Integration

To connect the email signup form to Google Forms:

1. Create a Google Form with an email field
2. Get the form action URL and field name
3. Update the form element in `index.html`:
   ```html
   <form action="YOUR_GOOGLE_FORM_URL" method="post">
       <input type="email" name="YOUR_EMAIL_FIELD_NAME" required>
   ```

## Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Import the project
3. Deploy automatically on commits to main branch

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. For local server: `python -m http.server 8000`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- WCAG AA color contrast
- Semantic HTML structure
- Alt text for all images

## Performance

- Optimized images
- Non-blocking JavaScript
- CSS Grid and Flexbox layouts
- Minimal external dependencies

## License

© 2025 Pleasant Valley High School - Educational Use