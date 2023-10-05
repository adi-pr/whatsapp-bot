const db = require("../../../firebase.config");
const { collection, getDocs, query, where } = require('firebase/firestore');

const showScheduleCommand = async (client, message, args) => {
    let day = args.slice(1).join(" ").trim(); // Combine the arguments to form the day

    if (!day) {
        // If no day is specified, default to today's day
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayIndex = new Date().getDay();
        day = daysOfWeek[todayIndex];
    }

    try {
        const schedulesRef = collection(db, 'schedules');
        const q = query(schedulesRef, where('day', '==', day));
        const schedulesSnapshot = await getDocs(q);

        if (schedulesSnapshot.empty) {
            return client.sendMessage(message.from, `No schedules found for ${day}.`);
        }

        const schedules = [];
        schedulesSnapshot.forEach((doc) => {
            schedules.push(doc.data());
        });

        const response = schedules.map((schedule) => {
            return `${schedule.course}\nType: ${schedule.type}\nDay: ${schedule.day}\nTime: ${schedule.time}\nLecturer: ${schedule.lecturerName}\nMeeting Link: ${schedule.meetingLink}`;
        }).join('\n\n'); 

        await client.sendMessage(message.from, response);

    } catch (error) {
        console.error('Error sending document: ', error);
    }
}

module.exports = showScheduleCommand;
