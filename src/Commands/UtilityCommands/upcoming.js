const db = require("../../../firebase.config");
const { collection, getDocs, query, where } = require('firebase/firestore');

// Shows all upcoming Assignments and Tests

const upComingCommand = async (client, message, args) => {
    let outputType = args.slice(1).join(" ")

    try {
        const upcomingRef = collection(db, "upcoming")
        let q;

        if (outputType) {
            q = query(upcomingRef, where('type', '==', outputType))
        } else {
            // No outputType provided, so fetch all upcoming events
            q = upcomingRef;
        }

        const upcomingEventsSnapShot = await getDocs(q);

        if (upcomingEventsSnapShot.empty) {
            return client.sendMessage(message.from, `No upcoming ${outputType ? outputType + 's ' : ''}found`)
        }

        const upcomingEvents = [];
        upcomingEventsSnapShot.forEach((doc) => {
            const eventData = doc.data();
            // Format the timestamp to display a date
            eventData.date = new Date(eventData.date.toMillis()).toLocaleDateString();
            upcomingEvents.push(eventData);
        });

        const response = upcomingEvents.map((event) => {
            return `${event.title}\nCourse: ${event.course}\nDate: ${event.date}\nDescription: ${event.description}`
        });

        client.sendMessage(message.from, response.join("\n\n"))
    } catch (err) {
        console.error(err)
    }
}

module.exports = upComingCommand;
