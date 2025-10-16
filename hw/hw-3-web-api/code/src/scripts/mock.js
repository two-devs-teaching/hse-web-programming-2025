const MOCK_TODOS = [
    {
        id: 0,
        title: 'Drink 8 glasses of water',
        completed: false
    },
    {
        id: 1,
        title: 'Meditate for 10 minutes',
        completed: false
    },
    {
        id: 2,
        title: 'Read a chapter of a book',
        completed: false
    },
    {
        id: 3,
        title: 'Go for a 30-minute walk',
        completed: false
    },
    {
        id: 4,
        title: 'Write in a gratitude journal',
        completed: false
    },
    {
        id: 5,
        title: 'Review daily goals before sleeping',
        completed: false
    },
    {
        id: 6,
        title: 'Practice deep breathing exercises',
        completed: true
    },
    {
        id: 7,
        title: 'Plan meals for the day',
        completed: true
    },
    {
        id: 8,
        title: 'Stretch for 15 minutes',
        completed: true
    },
    {
        id: 9,
        title: 'Call a friend or family member',
        completed: false
    },
    {
        id: 10,
        title: 'Clean workspace',
        completed: true
    },
    {
        id: 11,
        title: 'Practice a new skill for 20 minutes',
        completed: false
    },
    {
        id: 12,
        title: 'Take vitamins',
        completed: true
    },
    {
        id: 13,
        title: 'Do 10 push-ups',
        completed: false
    },
    {
        id: 14,
        title: 'Organize email inbox',
        completed: false
    },
    {
        id: 15,
        title: 'Water the plants',
        completed: true
    },
    {
        id: 16,
        title: 'Review budget and expenses',
        completed: false
    },
    {
        id: 17,
        title: 'Listen to a podcast',
        completed: true
    },
    {
        id: 18,
        title: 'Prepare tomorrow\'s outfit',
        completed: false
    },
    {
        id: 19,
        title: 'Floss teeth',
        completed: true
    },
    {
        id: 20,
        title: 'Do laundry',
        completed: false
    },
    {
        id: 21,
        title: 'Update calendar with upcoming events',
        completed: false
    },
    {
        id: 22,
        title: 'Practice mindful eating at lunch',
        completed: true
    },
    {
        id: 23,
        title: 'Complete a crossword puzzle',
        completed: false
    },
    {
        id: 24,
        title: 'Take a power nap',
        completed: false
    },
    {
        id: 25,
        title: 'Review and update to-do list',
        completed: true
    },
    {
        id: 26,
        title: 'Do 5 minutes of yoga',
        completed: false
    },
    {
        id: 27,
        title: 'Write 500 words',
        completed: false
    },
    {
        id: 28,
        title: 'Check bank account balance',
        completed: true
    },
    {
        id: 29,
        title: 'Declutter one drawer',
        completed: false
    },
    {
        id: 30,
        title: 'Watch educational video',
        completed: true
    },
    {
        id: 31,
        title: 'Prepare healthy snacks',
        completed: false
    },
    {
        id: 32,
        title: 'Practice guitar for 15 minutes',
        completed: false
    },
    {
        id: 33,
        title: 'Send thank you note',
        completed: true
    },
    {
        id: 34,
        title: 'Back up important files',
        completed: false
    },
    {
        id: 35,
        title: 'Schedule doctor appointment',
        completed: false
    },
    {
        id: 36,
        title: 'Replace air filters',
        completed: true
    },
    {
        id: 37,
        title: 'Study foreign language for 15 minutes',
        completed: false
    },
    {
        id: 38,
        title: 'Take out the trash',
        completed: true
    },
    {
        id: 39,
        title: 'Update resume',
        completed: false
    },
    {
        id: 40,
        title: 'Clean refrigerator',
        completed: false
    },
    {
        id: 41,
        title: 'Pay bills',
        completed: true
    },
    {
        id: 42,
        title: 'Vacuum living room',
        completed: false
    },
    {
        id: 43,
        title: 'Research weekend activities',
        completed: false
    },
    {
        id: 44,
        title: 'Charge all devices',
        completed: true
    },
    {
        id: 45,
        title: 'Sort through mail',
        completed: false
    },
    {
        id: 46,
        title: 'Practice public speaking',
        completed: false
    },
    {
        id: 47,
        title: 'Update software on computer',
        completed: true
    },
    {
        id: 48,
        title: 'Check tire pressure',
        completed: false
    },
    {
        id: 49,
        title: 'Review weekly progress',
        completed: false
    }
];

const setMockData = () => localStorage.setItem('todos', JSON.stringify(MOCK_TODOS));
