/**
 * Gallery Data Configuration for Nav Nirman Yuva Prerna Samiti (NNYPS)
 * 
 * Centralised configuration for all photo albums and events.
 * To change photo counts, hide an event, or update captions, edit this file.
 */

const NNYPS_GALLERY_CONFIG = {
  // Base path relative to HTML pages (compatible with GitHub Pages)
  basePath: 'assets/images',

  // List of documented events & photo folders
  events: [
    {
      id: 'teachers-day-2013',
      folder: 'teachers-day-2013',
      prefix: 'teachers-day-2013',
      count: 56, // Total photos: 56
      title: {
        hi: 'शिक्षक दिवस सम्मान समारोह (2013)',
        en: "Teachers' Day Felicitation (2013)"
      },
      date: {
        hi: '5 सितंबर 2013',
        en: '5 September 2013'
      },
      alt: {
        hi: 'सेवानिवृत्त शिक्षक सम्मान समारोह - नव निर्माण युवा प्रेरणा समिति',
        en: 'Retired Teachers Felicitation Ceremony - Nav Nirman Yuva Prerna Samiti'
      }
    },
    {
      id: 'gandhi-shastri-jayanti-2013',
      folder: 'gandhi-shastri-jayanti-2013',
      prefix: 'gandhi-shastri-jayanti-2013',
      count: 65, // Total photos: 65
      title: {
        hi: 'गांधी व शास्त्री जयंती एवं कवि सम्मेलन (2013)',
        en: 'Gandhi & Shastri Jayanti & Poetry Gathering (2013)'
      },
      date: {
        hi: '2 अक्टूबर 2013',
        en: '2 October 2013'
      },
      alt: {
        hi: 'गांधी एवं शास्त्री जयंती समारोह और कवि सम्मेलन - NNYPS',
        en: 'Gandhi and Shastri Jayanti Programme and Poetry Gathering - NNYPS'
      }
    },
    {
      id: 'monthly-program',
      folder: 'monthly-program',
      prefix: 'monthly-program',
      count: 48, // Total photos: 48
      title: {
        hi: 'समिति का मासिक कार्यक्रम',
        en: 'NNYPS Monthly Community Program'
      },
      date: {
        hi: 'मासिक सामुदायिक आयोजन',
        en: 'Monthly Community Assembly'
      },
      alt: {
        hi: 'मासिक कार्यक्रम - नव निर्माण युवा प्रेरणा समिति (नगला बरी)',
        en: 'Monthly Community Program - Nav Nirman Yuva Prerna Samiti (Nagla Bari)'
      }
    },
    {
      id: 'general',
      folder: 'general',
      prefix: 'general',
      count: 4, // Total photos: 4
      title: {
        hi: 'सामान्य गतिविधियाँ',
        en: 'General Activities'
      },
      date: {
        hi: 'अन्य तस्वीरें',
        en: 'General Photos'
      },
      alt: {
        hi: 'सामान्य फोटो - नव निर्माण युवा प्रेरणा समिति',
        en: 'General photo - Nav Nirman Yuva Prerna Samiti'
      }
    }
  ],

  /**
   * Helper function to generate an array of photo objects.
   * File naming pattern: <folder-name>-01.jpg, <folder-name>-02.jpg ...
   * @param {string} filterEventId - 'all' or a specific event id
   * @returns {Array} List of photo objects
   */
  generatePhotoList: function (filterEventId) {
    const photos = [];
    const targetEvents = (!filterEventId || filterEventId === 'all')
      ? this.events
      : this.events.filter(ev => ev.id === filterEventId);

    targetEvents.forEach(ev => {
      for (let i = 1; i <= ev.count; i++) {
        const paddedIndex = String(i).padStart(2, '0');
        const filename = `${ev.prefix}-${paddedIndex}.jpg`;
        const src = `${this.basePath}/${ev.folder}/${filename}`;

        photos.push({
          id: `${ev.id}-${paddedIndex}`,
          eventId: ev.id,
          eventTitle: ev.title,
          eventDate: ev.date,
          src: src,
          filename: filename,
          index: i,
          alt: {
            hi: `${ev.alt.hi} (फोटो ${i})`,
            en: `${ev.alt.en} (Photo ${i})`
          }
        });
      }
    });

    return photos;
  }
};

// Export to global scope (browser window or Node environment)
if (typeof window !== 'undefined') {
  window.NNYPS_GALLERY_CONFIG = NNYPS_GALLERY_CONFIG;
} else if (typeof global !== 'undefined') {
  global.NNYPS_GALLERY_CONFIG = NNYPS_GALLERY_CONFIG;
}
