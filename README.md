
# MMM-BirthdayCalendarCountdown 🎂⏳

**MMM-BirthdayCalendarCountdown** is a MagicMirror module that displays upcoming birthdays from your calendar with a live countdown timer! It listens for `CALENDAR_EVENTS` notifications from your calendar module, filters events by a configurable keyword (default: `"birthday"`), and only shows birthdays occurring within a certain time window.

---

## Features 🌟

- **Live Countdown ⏰:**  
  Displays a countdown timer for birthdays happening soon (within a configurable number of days).

- **Event Filtering 🔍:**  
  Filters events using a customizable keyword (default: `"birthday"`).

- **Upcoming Window 📆:**  
  Only shows birthdays that occur within a set number of days from now (default: 30 days).

- **Easy Styling 🎨:**  
  Comes with a dedicated CSS file for simple customization of the module's appearance.

---

## Installation 📦

1. **Clone or Download:**  
   Navigate to your MagicMirror `modules` directory and clone the repository:
   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/yourusername/MMM-BirthdayCalendarCountdown.git
   ```
   Or download and extract the ZIP file into the `modules` folder.

2. **Restart MagicMirror:**  
   Once installed, restart your MagicMirror application to load the new module.

---

## Configuration 🔧

Add the following configuration snippet to your `config/config.js` file:

```javascript
{
  module: "MMM-BirthdayCalendarCountdown",
  position: "top_left",  // Choose your preferred position (e.g., top_left, top_right, etc.)
  config: {
    updateInterval: 1000,       // Refresh every second for live countdown updates
    countdownStartDays: 7,      // Show countdown if the birthday is within 7 days
    upcomingWindowDays: 30,     // Only display birthdays within the next 30 days
    maxDisplay: 5,              // Maximum number of birthdays to display
    searchKeyword: "birthday"   // Keyword to filter calendar events (case-insensitive)
  }
},
```

---

## Usage 💡

- **Data Source:**  
  This module listens for the `CALENDAR_EVENTS` notification from a calendar module (such as the default MagicMirror [Calendar module](https://docs.magicmirror.builders/modules/calendar/)).  
- **Filtering:**  
  Only events containing the `searchKeyword` (e.g., `"birthday"`) are processed.  
- **Display:**  
  Only future birthdays occurring within the next `upcomingWindowDays` are shown. If a birthday is within `countdownStartDays`, a live countdown is displayed.

---



## Styling 🎨
- **Customizing Styles:**  
  Override styles easily in MagicMirror by adding your custom CSS to the `custom.css` file in the `css` folder. For example:
  ```css
  .MMM-BirthdayCalendarCountdown .event-title {
    color: #ff4500;       /* Change event title color */
    font-size: 1.4em;
  }
  ```
---

## Support & Feedback 🙏

If you have any issues or suggestions, please open an issue on the [GitHub repository](https://github.com/yourusername/MMM-BirthdayCalendarCountdown). Your feedback is always welcome!

---

## License 📄

This project is licensed under the [MIT License](LICENSE).

---

Enjoy your MagicMirror with a fun birthday countdown! 🎉🎂⏰
```

