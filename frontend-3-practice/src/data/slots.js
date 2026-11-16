const BASE_SLOTS = [
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

export function getSlotsForDate(date) {
  const daySeed = date.getDate(); 
  return BASE_SLOTS.map((slot, index) => {
    const isAvailable = slot.available && ((daySeed + index) % 3 !== 0);
    return { ...slot, available: isAvailable };
  });
}
