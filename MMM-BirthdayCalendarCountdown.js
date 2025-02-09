Module.register("MMM-BirthdayCalendarCountdown", {
    // Module default configuration.
    defaults: {
        updateInterval: 1000,       // Update the DOM every second (for live countdowns)
        countdownStartDays: 7,      // Show countdown if event is within 7 days from now
        upcomingWindowDays: 30,     // Only display birthdays occurring within 30 days from now
        maxDisplay: 5,              // Maximum number of matching events to display
        searchKeyword: "birthday"   // Keyword to filter calendar events (case-insensitive)
    },

    start: function () {
        Log.info("Starting module: " + this.name);
        // Array to store events that match the search keyword.
        this.filteredEvents = [];

        // Refresh the DOM periodically so countdown timers remain current.
        var self = this;
        setInterval(function () {
            self.updateDom();
        }, this.config.updateInterval);
    },

    /**
     * Receives notifications from other modules.
     * We expect a "CALENDAR_EVENTS" notification with an array of event objects.
     */
    notificationReceived: function (notification, payload, sender) {
        if (notification === "CALENDAR_EVENTS") {
            // Filter events based on the configurable search keyword.
            this.filteredEvents = payload.filter(event => {
                if (event.title && typeof event.title === "string") {
                    return event.title.toLowerCase().includes(this.config.searchKeyword.toLowerCase());
                }
                return false;
            });
            // Sort the events by their start date (soonest first).
            this.filteredEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            this.updateDom();
        }
    },

    /**
     * Build the module's DOM elements.
     */
    getDom: function () {
        var wrapper = document.createElement("div");
        var now = new Date();
        var oneDayMs = 24 * 60 * 60 * 1000;
        var windowMs = this.config.upcomingWindowDays * oneDayMs;

        // Filter out events that have already occurred or are outside the display window.
        var upcomingEvents = this.filteredEvents.filter(event => {
            var eventDate = new Date(event.startDate);
            return eventDate >= now && (eventDate - now <= windowMs);
        });

        // If no matching events are available, show a message.
        if (upcomingEvents.length === 0) {
            wrapper.innerHTML = `<div class="no-events">
                                    No upcoming events containing "${this.config.searchKeyword}" within ${this.config.upcomingWindowDays} days.
                                 </div>`;
            return wrapper;
        }

        // Limit the number of events displayed.
        var eventsToShow = upcomingEvents.slice(0, this.config.maxDisplay);

        eventsToShow.forEach(event => {
            var eventDiv = document.createElement("div");
            eventDiv.classList.add("event-item");

            // Convert the event's startDate to a Date object.
            var eventDate = new Date(event.startDate);
            var dateStr = eventDate.toLocaleString();

            // Create a div for the event title.
            var titleDiv = document.createElement("div");
            titleDiv.classList.add("event-title");
            titleDiv.textContent = event.title;

            // Create a div for the event date.
            var dateDiv = document.createElement("div");
            dateDiv.classList.add("event-date");
            dateDiv.textContent = dateStr;

            eventDiv.appendChild(titleDiv);
            eventDiv.appendChild(dateDiv);

            // Calculate the time difference between the event and now.
            var diff = eventDate - now;
            // If the event is in the future and within the countdown window, add a countdown.
            if (diff > 0 && diff <= this.config.countdownStartDays * oneDayMs) {
                var countdownDiv = document.createElement("div");
                countdownDiv.classList.add("event-countdown");
                countdownDiv.textContent = this.getCountdownText(eventDate, now);
                eventDiv.appendChild(countdownDiv);
            }
            wrapper.appendChild(eventDiv);
        });
        return wrapper;
    },

    /**
     * Returns a human-readable countdown string from the current time until targetDate.
     *
     * @param {Date} targetDate - The event's date/time.
     * @param {Date} currentDate - The current date/time.
     * @returns {string} Countdown string.
     */
    getCountdownText: function (targetDate, currentDate) {
        var diff = targetDate - currentDate;
        if (diff <= 0) return "It's happening now!";

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const parts = [];
        if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
        if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
        // Display seconds only if less than one day remains.
        if (days === 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

        return "Countdown: " + parts.join(", ");
    }
});
