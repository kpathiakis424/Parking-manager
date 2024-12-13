import React, { useState, useEffect } from 'react';

// Constants
const defaultGuests = [
  ["Lea", 18, 22, 2, 1],
  ["Joanne", 18, 20, 2, 0],
  ["Greg", 14, 16, 1, 0],
  ["Joe", 14, 16, 2, 2],
  ["Steph", 14, 17, 2, 1],
  ["Erica", 19, 22, 2, 0],
  ["Jessica", 19, 22, 2, 1],
  ["Jameson", 19, 22, 2, 2],
  ["Sarah", 19, 22, 2, 0],
  ["Kim", 14, 17, 1, 0],
  ["Robyn", 14, 19, 2, 2],
  ["Alexa", 14, 16, 1, 0],
  ["Chris", 19, 21, 2, 0],
  ["Ryan", 19, 21, 2, 1],
  ["Uncle Tony", 14, 17, 1, 0],
  ["Tori", 14, 16, 2, 2],
  ["Newforma 1", 19, 22, 2, 0],
  ["Newforma 2", 19, 22, 2, 0],
  ["Newforma 3", 19, 22, 2, 0],
  ["Stacy", 19, 22, 2, 0],
  ["Alison Ireland", 19, 22, 2, 0],
  ["Mel", 19, 22, 2, 0]
];

const spotPositions = [
  [0,0],[1,0],[2,0],  // left front
  [0,1],[1,1],[2,1],  // left back
  [4,0],[5,0],        // right front row
  [4,1],[5,1],        // right next row
  [4,2],[5,2],        // right next row
  [4,3],[5,3]         // right back row
];

const colors = [
  '#87CEEB', '#90EE90', '#FFB6C1', '#F0E68C', '#F08080',
  '#E0FFFF', '#DDA0DD', '#F0E68C', '#FA8072', '#D8BFD8',
  '#98FB98', '#B0E0E6', '#F5DEB3', '#FF6347', '#DA70D6'
];

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  timeDisplay: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    fontSize: '18px',
    textAlign: 'center'
  },
  alert: {
    backgroundColor: '#ffebee',
    border: '1px solid #ef5350',
    color: '#c62828',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '16px'
  },
  alertTitle: {
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  alertList: {
    marginLeft: '20px',
    listStyleType: 'disc'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    fontSize: '16px'
  },
  parkingLayout: {
    position: 'relative',
    width: '100%',
    height: '700px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    marginBottom: '20px'
  },
  house: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '400px',
    height: '170px',
    backgroundColor: '#FFFACD',
    border: '2px solid #8B4513',
    borderRadius: '8px',
    padding: '0px',
    textAlign: 'center',
    zIndex: 1
  },
  houseTitle: {
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  houseContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  housePeople: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    flexWrap: 'wrap',
    fontSize: '20px'
  },
  driveway: {
    position: 'absolute',
    top: '200px',
    left: '20px',
    right: '20px',
    bottom: '60px',
    backgroundColor: '#ddd'
  },
  street: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    backgroundColor: '#888',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  parkingSpot: {
    position: 'absolute',
    width: '100px',
    height: '80px',
    border: '2px solid #666',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    transition: 'background-color 0.3s'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center'
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white'
  },
  timeSlider: {
    width: '100%',
    marginTop: '10px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  },
  th: {
    textAlign: 'left',
    padding: '8px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f5f5f5'
  },
  td: {
    padding: '8px',
    borderBottom: '1px solid #ddd'
  },
  input: {
    padding: '6px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  }
};

const formatTime = (hourFloat) => {
  const hour = Math.floor(hourFloat);
  const minute = Math.round((hourFloat - hour) * 60);
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const calculateTotals = (spotAllocations, currentTime) => {
  let totalCars = 0;
  let totalAdults = 0;
  let totalKids = 0;
  let houseAdults = 0;
  let houseKids = 0;

  spotAllocations.forEach(spot => {
    spot.forEach(([start, end, , adults, kids]) => {
      if (currentTime >= start && currentTime < end) {
        totalCars++;
        totalAdults += adults;
        totalKids += kids;
        if (currentTime >= 14.5) {
          houseAdults += adults;
          houseKids += kids;
        }
      }
    });
  });

  return {
    cars: totalCars,
    adults: totalAdults,
    kids: totalKids,
    houseAdults,
    houseKids
  };
};

const ParkingSpot = ({ x, y, guest, color }) => {
  const leftPosition = x * 120 + 40;
  const topPosition = y * 100 + (y > 0 ? y * 20 : 0);
  
  return (
    <div style={{
      ...styles.parkingSpot,
      left: `${leftPosition}px`,
      top: `${topPosition}px`,
      backgroundColor: guest ? color : '#f0f0f0',
    }}>
      {guest && (
        <>
          <div style={{ fontWeight: 'bold' }}>{guest.name}</div>
          <div>{`${guest.adults}A, ${guest.kids}K`}</div>
        </>
      )}
    </div>
  );
};

const TimeDisplay = ({ currentTime, totals }) => {
  return (
    <div>
      <div style={styles.timeDisplay}>
        Current Time: {formatTime(currentTime)}
      </div>
      <div style={styles.stats}>
        <span>Cars: {totals.cars}</span>
        <span>Total Adults: {totals.adults}</span>
        <span>Total Kids: {totals.kids}</span>
      </div>
    </div>
  );
};

const HouseDisplay = ({ adults, kids }) => {
  return (
    <div style={styles.house}>
      <div style={styles.houseTitle}>House</div>
      <div style={styles.houseContent}>
        <div>
          <div>Adults:</div>
          <div style={styles.housePeople}>
            {'⬤'.repeat(adults)}
          </div>
        </div>
        <div>
          <div>Kids:</div>
          <div style={styles.housePeople}>
            {'○'.repeat(kids)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ParkingAlert = ({ unallocatedGuests }) => {
  if (!unallocatedGuests || unallocatedGuests.length === 0) return null;

  return (
    <div style={styles.alert}>
      <div style={styles.alertTitle}>⚠️ Warning: Not enough parking spots!</div>
      <div>The following guests could not be assigned a parking spot:</div>
      <ul style={styles.alertList}>
        {unallocatedGuests.map((guest, index) => (
          <li key={index}>
            {guest[0]} ({formatTime(guest[1])} - {formatTime(guest[2])})
          </li>
        ))}
      </ul>
    </div>
  );
};

const GuestDialog = ({ show, onClose, guests, onSave }) => {
  const [guestList, setGuestList] = useState(guests);

  if (!show) return null;

  const handleGuestChange = (index, field, value) => {
    const newList = [...guestList];
    if (field === 0) {
      newList[index] = [value, ...newList[index].slice(1)];
    } else {
      newList[index] = [...newList[index].slice(0, field), Number(value), ...newList[index].slice(field + 1)];
    }
    setGuestList(newList);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={{ marginBottom: '20px' }}>Manage Guests</h2>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Arrival</th>
              <th style={styles.th}>Departure</th>
              <th style={styles.th}>Adults</th>
              <th style={styles.th}>Kids</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {guestList.map((guest, index) => (
              <tr key={index}>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="text"
                    value={guest[0]}
                    onChange={(e) => handleGuestChange(index, 0, e.target.value)}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="number"
                    value={guest[1]}
                    onChange={(e) => handleGuestChange(index, 1, e.target.value)}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="number"
                    value={guest[2]}
                    onChange={(e) => handleGuestChange(index, 2, e.target.value)}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="number"
                    value={guest[3]}
                    onChange={(e) => handleGuestChange(index, 3, e.target.value)}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    type="number"
                    value={guest[4]}
                    onChange={(e) => handleGuestChange(index, 4, e.target.value)}
                  />
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, backgroundColor: '#ff4444' }}
                    onClick={() => setGuestList(guestList.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{ ...styles.button, backgroundColor: '#4CAF50' }}
            onClick={() => setGuestList([...guestList, ["New Guest", 14, 16, 2, 0]])}
          >
            Add Guest
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#2196F3' }}
            onClick={() => {
              onSave(guestList);
              onClose();
            }}
          >
            Save Changes
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#888' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ParkingManager = () => {
  const [guests, setGuests] = useState(defaultGuests);
  const [currentTime, setCurrentTime] = useState(13);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [spotAllocations, setSpotAllocations] = useState(
    Array(spotPositions.length).fill([]).map(() => [])
  );
  const [guestColors, setGuestColors] = useState({});
  const [unallocatedGuests, setUnallocatedGuests] = useState([]);

  // Initialize colors for guests
  useEffect(() => {
    const newColors = {};
    guests.forEach((guest, index) => {
      newColors[guest[0]] = colors[index % colors.length];
    });
    setGuestColors(newColors);
  }, [guests]);

  // Advanced spot allocation logic
  useEffect(() => {
    const newAllocations = Array(spotPositions.length).fill(null).map(() => []);
    const unallocatedGuestsList = [];

    const sortedGuests = [...guests].sort((a, b) => {
      const durationA = a[2] - a[1];
      const durationB = b[2] - b[1];
      return durationB - durationA;
    });

    // Helper function to check if a spot is available
    const isSpotAvailable = (spot, start, end) => {
      return !spot.some(([existingStart, existingEnd]) => 
        !(end <= existingStart || start >= existingEnd)
      );
    };

    // Helper function to get blocking relationships
    const getBlockingSpots = (spotIndex) => {
      if (spotIndex >= 0 && spotIndex < 6) {
        if (spotIndex >= 3) {
          return [spotIndex - 3];
        }
      } else {
        const column = spotIndex % 2;
        const row = Math.floor((spotIndex - 6) / 2);
        if (row > 0) {
          return [6 + column + (row - 1) * 2];
        }
      }
      return [];
    };

    // Assign spots
    sortedGuests.forEach((guest) => {
      const [name, arrival, departure, adults, kids] = guest;
      let bestSpot = -1;
      let bestScore = -Infinity;

      for (let spotIndex = 0; spotIndex < spotPositions.length; spotIndex++) {
        if (!isSpotAvailable(newAllocations[spotIndex], arrival, departure)) {
          continue;
        }

        let score = 100;
        const blockingSpots = getBlockingSpots(spotIndex);
        let totalBlockedTime = 0;

        blockingSpots.forEach(blockingSpotIndex => {
          newAllocations[blockingSpotIndex].forEach(([blockStart, blockEnd]) => {
            if (!(departure <= blockStart || arrival >= blockEnd)) {
              const overlapStart = Math.max(arrival, blockStart);
              const overlapEnd = Math.min(departure, blockEnd);
              totalBlockedTime += overlapEnd - overlapStart;
            }
          });
        });

        const duration = departure - arrival;
        if (totalBlockedTime > 0) {
          score -= (totalBlockedTime / duration) * 50;
        }

        const [x, y] = spotPositions[spotIndex];
        if (x <= 2) {
          if (spotIndex < 3) score += 10;
        } else {
          score += (3 - y) * 5;
        }

        if (score > bestScore) {
          bestScore = score;
          bestSpot = spotIndex;
        }
      }

      if (bestSpot !== -1) {
        newAllocations[bestSpot].push([arrival, departure, name, adults, kids]);
      } else {
        unallocatedGuestsList.push(guest);
      }
    });

    setSpotAllocations(newAllocations);
    setUnallocatedGuests(unallocatedGuestsList);
  }, [guests]);

  // Animation loop
  useEffect(() => {
    let timerId;
    
    if (isPlaying) {
      timerId = setInterval(() => {
        setCurrentTime(time => {
          const newTime = time + 0.5;
          return newTime > 22 ? 13 : newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isPlaying]);

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: '20px' }}>Parking Management Simulation</h1>

      <TimeDisplay 
        currentTime={currentTime}
        totals={calculateTotals(spotAllocations, currentTime)}
      />

      <ParkingAlert unallocatedGuests={unallocatedGuests} />
      
      <div style={styles.parkingLayout}>
        <HouseDisplay 
          adults={calculateTotals(spotAllocations, currentTime).houseAdults}
          kids={calculateTotals(spotAllocations, currentTime).houseKids}
        />
        
        <div style={styles.driveway}>
          {spotPositions.map((pos, index) => {
            const guest = spotAllocations[index]?.find(
              ([start, end]) => currentTime >= start && currentTime < end
            );
            
            return (
              <ParkingSpot
                key={index}
                x={pos[0]}
                y={pos[1]}
                guest={guest ? {
                  name: guest[2],
                  adults: guest[3],
                  kids: guest[4]
                } : null}
                color={guest ? guestColors[guest[2]] : undefined}
              />
            );
          })}
        </div>
        
        <div style={styles.street}>Street</div>
      </div>
      
      <div style={styles.controls}>
        <button
          style={styles.button}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        
        <button
          style={styles.button}
          onClick={() => setIsGuestDialogOpen(true)}
        >
          👥 Manage Guests
        </button>
        
        <div>
          <span>Time: </span>
          <input
            style={styles.input}
            type="number"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            min="13"
            max="22"
            step="0.5"
          />
          <span> {formatTime(currentTime)}</span>
        </div>
      </div>
      
      <input
        style={styles.timeSlider}
        type="range"
        min="13"
        max="22"
        step="0.5"
        value={currentTime}
        onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
      />

      <GuestDialog
        show={isGuestDialogOpen}
        onClose={() => setIsGuestDialogOpen(false)}
        guests={guests}
        onSave={setGuests}
      />
    </div>
  );
};

export default ParkingManager;
