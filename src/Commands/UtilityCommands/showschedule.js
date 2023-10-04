const db = require("../../../firebase.config");

const { collection, getDocs } = require('firebase/firestore');


const showScheduleCommand = async (client, message) => {
    try {
        // Retrieve schedules from Firestore
        const schedulesRef = collection(db, 'schedules');
        const schedulesSnapshot = await getDocs(schedulesRef);

        const schedules = [];
        schedulesSnapshot.forEach((doc) => {
            schedules.push(doc.data());
        });

        const response = schedules.map((schedule) => {
            return `${schedule.course}\nDay: ${schedule.day}\nTime: ${schedule.time}\nLecturer: ${schedule.lectureName}\nMeeting Link: ${schedule.meetingLink}`;
        }).join('\n\n'); // Join schedules with double line breaks

        // Send the response using your WhatsApp bot client
        await client.sendMessage(message.from, response);

    } catch (error) {
        console.error('Error sending document: ', error);
    }
}

module.exports = showScheduleCommand;