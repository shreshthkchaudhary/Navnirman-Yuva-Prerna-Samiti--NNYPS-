# Nav Nirman Yuva Prerna Samiti (NNYPS) - Website
**नव निर्माण युवा प्रेरणा समिति (NNYPS)**

The site is deployed on Vercel at https://navnirmanyuvaprernasamiti-nnyps.vercel.app/ (GitHub Pages also works).

Lightweight, mobile-first, bilingual (Hindi + English) static website developed as part of a college community-service project (**Course Code: CS002**).

---

## 1. Project Overview & Tech Stack

- **Stack:** Pure HTML5, CSS3, vanilla JavaScript.
  - No build step, no framework, no server required.
  - Fully compatible with GitHub Pages or any static file hosting.
- **Styling:** Tailwind CSS (via CDN) + `assets/css/style.css` custom overrides.
- **Typography:** Google Fonts (`Noto Sans Devanagari` + `Inter` / clean Latin fallbacks).
- **Forms:** Formspree contact form with mandatory consent checkbox.
- **Photos:** Original archival photos located in `/assets/images/`.

---

## 2. Directory Structure

```text
Navnirman-Yuva-Prerna-Samiti--NNYPS-/
├── index.html                   # Home: Hero, NGO intro, event highlights & CTAs
├── about.html                   # About: Who we are, location, trustees/volunteers poster
├── programs.html                # Programs: 3 documented events with gallery links
├── gallery.html                 # Gallery: Filterable grid, 12-item batching, lightbox
├── contact.html                 # Contact: Address, Formspree form & consent checkbox
├── README.md                    # Project documentation & deployment guide
└── assets/
    ├── css/
    │   └── style.css            # Custom typography, photo frames & transitions
    ├── js/
    │   ├── main.js              # Language switcher (Hindi default) & mobile navbar
    │   ├── gallery-data.js      # Central photo albums configuration
    │   └── gallery.js           # Filtering, pagination, & keyboard-friendly lightbox
    └── images/
        ├── logo/                        (4 files: logo-icon.png, logo-full.png, favicon-32.png, apple-touch-icon.png)
        ├── gandhi-shastri-jayanti-2013/ (65 photos: ...-01.jpg to ...-65.jpg)
        ├── teachers-day-2013/           (56 photos: ...-01.jpg to ...-56.jpg)
        ├── monthly-program/             (48 photos: ...-01.jpg to ...-48.jpg)
        ├── general/                     (4 photos: general-01.jpg to general-04.jpg)
        └── trustees-and-volunteers.jpg  (Trustees and volunteers collage poster)
```

---

## 3. Placeholder Status & Adding Future Details

All content on the website has been verified with the NGO or reflects recorded, factual event archives. **No placeholders remain on the site.**

### Adding New or Updated Details Later

If the NGO provides additional formal bylaws, updated registration documentation, or new event records in the future, follow these conventions:
1. **Activities & Objectives:** Update the "हमारी गतिविधियाँ / Our Activities" section in `about.html`.
2. **Programs:** Add new cards in `programs.html` and `index.html` following the existing card pattern.
3. **Gallery:** Add new photo albums by creating a folder under `assets/images/<folder-name>/` and declaring the event in `assets/js/gallery-data.js`.
4. **Bilingual Toggle:** Ensure every user-facing text element has both `data-hi` and `data-en` attributes so the bilingual switcher operates seamlessly.

---

## 4. How to Configure the Formspree Contact Form

The contact form is currently configured with the endpoint:
```html
<form id="contact-form" action="https://formspree.io/f/moedvlkr" method="POST" class="space-y-5">
```

If you ever need to change the Formspree form ID:
1. Sign up or log in at [Formspree](https://formspree.io/).
2. Create a new form and copy your Form ID.
3. Open `contact.html` and update the `action` attribute on `<form id="contact-form">`.
4. Test submitting a message; you will receive form responses directly in your Formspree dashboard and linked email.

---

## 5. How to Change Gallery Photo Counts or Hide Photos

All gallery photos are dynamically configured in **`assets/js/gallery-data.js`**. You do not need to touch any HTML to change photo counts or titles!

Open `assets/js/gallery-data.js`:

```javascript
events: [
  {
    id: 'teachers-day-2013',
    folder: 'teachers-day-2013',
    prefix: 'teachers-day-2013',
    count: 56, // Change this number if you add or remove photos
    title: {
      hi: 'शिक्षक दिवस सम्मान समारोह (2013)',
      en: "Teachers' Day Felicitation (2013)"
    },
    ...
  },
  ...
]
```

- **To adjust photo counts:** Simply change `count: 56` to the new number.
- **To hide an event from the gallery:** Comment out or delete the entire event object from the `events` array.
- **To add new photos:** Name them following the existing convention: `<prefix>-<number>.jpg` (e.g. `teachers-day-2013-57.jpg`) and increment `count`.

---

## 6. How to Replace or Add Photos

All photos reside in `assets/images/`:
- `assets/images/gandhi-shastri-jayanti-2013/`
- `assets/images/teachers-day-2013/`
- `assets/images/monthly-program/`
- `assets/images/general/`
- `assets/images/trustees-and-volunteers.jpg`

**Best Practices for Photos:**
- Photos are compact (approx. 90 KB each). Keep replacements compressed to prevent slow mobile loading.
- Always preserve the naming format (`<folder>-01.jpg`, `<folder>-02.jpg`, etc.) with 2-digit zero-padding.
- Maintain consistent aspect ratios (`4:3` or `3:2`). The CSS `.photo-frame` class will contain and crop images cleanly without distortion.

---

## 7. Step-by-Step Deployment on GitHub Pages

1. **Initialize Git Repository (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial release of NNYPS bilingual website"
   ```

2. **Push to GitHub:**
   - Create a new repository on [GitHub](https://github.com/) (e.g., `Navnirman-Yuva-Prerna-Samiti--NNYPS-`).
   - Run:
     ```bash
     git remote add origin https://github.com/<your-username>/Navnirman-Yuva-Prerna-Samiti--NNYPS-.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main` and folder `/ (root)`.
     - Click **Save**.

4. **Visit the Live Website:**
   - Wait 1-2 minutes for the deployment action to complete.
   - Your site will be live at:
     `https://<your-username>.github.io/Navnirman-Yuva-Prerna-Samiti--NNYPS-/`

---

## 8. College Community-Service Project Credit

- **Project Title:** Digital Awareness Platform for Navnirman Yuva Prerna Samiti (NNYPS)
- **Course:** Community Sdg (CS002) | B.Tech CSE - D (2nd Year, 2026–2027 ODD)
- **Team ID & Name:** `26O2122` - Tech Seva
- **Internal Faculty Mentor:** Dr. Naman Gupta
- **Student Team:** Shreshth Kumar Chaudhary (Team Leader) & Team Tech Seva (Nitin, Ryan Singh Gosain, Shreyansh Kumar, Rishabh Kumar Singh) | B.Tech CSE, K.R. Mangalam University
- **Partner Organisation:** Nav Nirman Yuva Prerna Samiti (NNYPS)
- **Location:** Village Nagla Bari, Post Manauna, District Mainpuri, Uttar Pradesh
- **Photo Permissions:** Photos used with explicit permission from the NGO leadership for public educational and community engagement purposes.

