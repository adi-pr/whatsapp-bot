const db = require("../../../firebase.config");
const { collection, getDocs, query, where, orderBy, startAt } = require('firebase/firestore');

const courseCommand = async (client, message, args) => {
    let course = args.slice(1).join(" ").trim().toUpperCase();

    try {
        const schedulesRef = collection(db, 'schedules');
        const q = query(
            schedulesRef,
            where('course', '>=', course),
            where('course', '<=', course + '\uf8ff'),
            orderBy('course')
        );

        const schedulesSnapshot = await getDocs(q);

        if (schedulesSnapshot.empty) {
            return client.sendMessage(message.from, `No schedules found for ${course}.`);
        }

        const schedules = [];
        schedulesSnapshot.forEach((doc) => {
            schedules.push(doc.data());
        });

        schedules.sort((a, b) => {
            const dayA = a.day.toLowerCase();
            const dayB = b.day.toLowerCase();
            if (dayA < dayB) return -1;
            if (dayA > dayB) return 1;
            return 0;
        });

        const response = schedules.map((schedule) => {
            return `${schedule.course}\nType: ${schedule.type}\nDay: ${schedule.day}\nTime: ${schedule.time}\nLecturer: ${schedule.lecturerName}\nMeeting Link: ${schedule.meetingLink}`;
        }).join('\n\n');

        await client.sendMessage(message.from, response);

    } catch (error) {
        console.error('Error sending document: ', error);
    }
}

module.exports = courseCommand;
