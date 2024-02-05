/**
 * This component will get the current stored users and chores from the context
 * -> each user will be assign a chore randomly in every week of a month
 * -> chores should be distributed based on the frequency and type of either weekly or monthly
 * -> for example:
 * if a chore has a frequency of 7 and has the type of weekly, then it should occur once a day every day of a week, vice versa for the other frequency of a week
 * as for frequency in a month, if it is only a frequency of 1 for monthly type, then it will only occur one day at the end of the month, if the frequency is 2 then it will only occur once in the middle and once in the end of the month. as for frequency of 3, then it should happen once in the beginning, middle and end of a month. As for frequency of 4 in a month type, then that means it should happen one day in every week of a month.
 */

import { useState, useEffect } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useResponsibility } from '../../context';

import './Calendar.scss';

const ChoreCalendar = () => {
  const { users, chores } = useResponsibility();
  const [choreSchedule, setChoreSchedule] = useState({});

  useEffect(() => {
    const newSchedule = generateChoreSchedule(users, chores);
    setChoreSchedule(convertToDateFormat(newSchedule));
  }, [users, chores]);

  const downloadPDF = async () => {
    const calendarElement = document.getElementById('calendar'); // Ensure the Calendar component has this ID
    const canvas = await html2canvas(calendarElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('chore-calendar.pdf');
  };

  const convertToDateFormat = (schedule) => {
    // Converts the schedule to a date-based format for the Calendar
    const dateSchedule = {};
    const startOfMonth = moment().startOf('month');
    for (let day in schedule) {
      const date = startOfMonth.clone().add(day - 1, 'days');
      dateSchedule[date.format('YYYY-MM-DD')] = schedule[day];
    }
    return dateSchedule;
  };

  const generateChoreSchedule = (users, chores) => {
    let schedule = {};
    const daysInWeek = 7;
    const weeksInMonth = 4; // Assuming 4 weeks in a month
    const daysInMonth = daysInWeek * weeksInMonth;
    let userAssignmentsCount = users.reduce(
      (acc, user) => ({ ...acc, [user]: 0 }),
      {}
    );

    // Initialize schedule
    for (let day = 1; day <= daysInMonth; day++) {
      schedule[day] = [];
    }

    // Assign chores to days based on their frequency and type
    chores.forEach((chore) => {
      if (chore.type === 'weekly') {
        if (chore.frequency === 7) {
          // Chore occurs every day
          for (let day = 1; day <= daysInMonth; day++) {
            schedule[day].push(chore.chore);
          }
        } else if (chore.frequency === 1) {
          // Spread out chores with frequency 1 across the month
          for (let week = 1; week <= weeksInMonth; week++) {
            const day =
              (week - 1) * daysInWeek +
              Math.floor(Math.random() * daysInWeek) +
              1;
            schedule[day].push(chore.chore);
          }
        } else {
          // Other weekly chores
          for (let week = 1; week <= weeksInMonth; week++) {
            let daysToAssign = chore.frequency;
            let assignedDays = new Set();
            while (daysToAssign > 0) {
              const day =
                (week - 1) * daysInWeek +
                Math.floor(Math.random() * daysInWeek) +
                1;
              if (!assignedDays.has(day)) {
                schedule[day].push(chore.chore);
                assignedDays.add(day);
                daysToAssign--;
              }
            }
          }
        }
      } else if (chore.type === 'monthly') {
        let intervals = Math.floor(daysInMonth / chore.frequency);
        for (let i = 1; i <= chore.frequency; i++) {
          const day = i * intervals - Math.floor(intervals / 2);
          schedule[day].push(chore.chore);
        }
      }
    });

    // Shuffle and assign users to chores each week
    for (let week = 1; week <= weeksInMonth; week++) {
      let shuffledUsers = shuffleArray(users);
      let userIndex = 0;

      for (
        let day = (week - 1) * daysInWeek + 1;
        day <= week * daysInWeek;
        day++
      ) {
        schedule[day].forEach((chore, index) => {
          let assignedUser = getBalancedUser(
            shuffledUsers,
            userIndex,
            userAssignmentsCount
          );
          schedule[day][index] = { chore, user: assignedUser };
          userAssignmentsCount[assignedUser]++;
          userIndex++;
        });
      }
    }

    return schedule;
  };

  // Utility function to shuffle an array
  function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // Utility function to get a user for balancing chore assignments
  function getBalancedUser(shuffledUsers, currentIndex, userAssignmentsCount) {
    let user = shuffledUsers[currentIndex % shuffledUsers.length];
    let minAssignments = userAssignmentsCount[user];

    for (let i = 0; i < shuffledUsers.length; i++) {
      const currentUser = shuffledUsers[i];
      if (userAssignmentsCount[currentUser] < minAssignments) {
        user = currentUser;
        minAssignments = userAssignmentsCount[currentUser];
      }
    }

    return user;
  }

  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const dayChores = choreSchedule[dateString] || [];

    return (
      <div className="daily-chores">
        {dayChores.map(({ chore, user }, index) => (
          <span key={index}>
            {chore} - {user}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {users.length > 0 && chores.length > 0 && (
        <div>
          <button onClick={downloadPDF} style={{ marginBottom: '10px' }}>
            Download Calendar as PDF
          </button>
          <div id="calendar">
            <Calendar cellRender={dateCellRender} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreCalendar;
