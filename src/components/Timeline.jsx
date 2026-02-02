import React, { useState } from 'react';

const timelineEvents = [
    // Day 1
    { time: "09:00 AM", title: "Event Starts", description: "Registration and inauguration ceremony begins", day: "Day 1" },
    { time: "09:00 - 09:30 AM", title: "Welcome Session", description: "Introduction and team orientation", day: "Day 1" },
    { time: "10:00 AM - 01:00 PM", title: "Team Work Begins", description: "Problem Statement Finalization & Initial Development", day: "Day 1" },
    { time: "01:00 - 01:45 PM", title: "Lunch Break", description: "Refuel and recharge for the afternoon session", day: "Day 1" },
    { time: "03:00 - 04:00 PM", title: "Technical Review 1", description: "First round of project evaluation by mentors", day: "Day 1" },
    { time: "05:00 PM", title: "Snacks", description: "Evening refreshments and networking", day: "Day 1" },
    { time: "06:30 - 07:30 PM", title: "Technical Review 2", description: "Second round of mentor feedback", day: "Day 1" },
    { time: "07:45 - 08:30 PM", title: "DJ & Dance", description: "Entertainment break with music and dance", day: "Day 1" },
    { time: "08:30 - 09:30 PM", title: "Dinner", description: "Evening meal and team discussions", day: "Day 1" },
    
    // Night Session
    { time: "01:00 AM", title: "Night Snacks", description: "Midnight refreshments for night owls", day: "Night" },
    { time: "02:00 AM", title: "Mentor Check 1", description: "Late night progress checkpoint", day: "Night" },
    { time: "04:00 AM", title: "Refreshments", description: "Early morning snacks and energy boost", day: "Night" },
    { time: "06:00 AM", title: "Mentor Check 2", description: "Dawn checkpoint and guidance session", day: "Night" },
    
    // Day 2
    { time: "07:30 AM", title: "Breakfast", description: "Start Day 2 with a hearty breakfast", day: "Day 2" },
    { time: "10:00 AM", title: "Technical Review 3", description: "Third round of project evaluation", day: "Day 2" },
    { time: "11:00 AM", title: "Snacks", description: "Mid-morning refreshments", day: "Day 2" },
    { time: "01:00 - 01:45 PM", title: "Lunch Break", description: "Final lunch before presentations", day: "Day 2" },
    { time: "03:00 PM", title: "Final Review", description: "Final evaluation and project demos", day: "Day 2" },
    { time: "04:00 PM", title: "Snacks", description: "Refreshments during evaluation", day: "Day 2" },
    { time: "06:00 PM", title: "Felicitation", description: "Award ceremony and prize distribution 🏆", day: "Day 2" },
    { time: "08:00 PM", title: "Dinner", description: "Celebratory dinner with all participants", day: "Day 2" },
    { time: "09:00 PM", title: "See You!", description: "Event concludes - You can go home! 🎉", day: "Day 2" }
];

const getDayColor = (day) => {
    const colors = {
        'Day 1': '#D32F2F',
        'Night': '#7B1FA2',
        'Day 2': '#FFD700'
    };
    return colors[day] || '#95A5A6';
};

export default function Timeline() {
    const [selectedEvent, setSelectedEvent] = useState(0);

    const totalEvents = timelineEvents.length;

    return (
        <section id="timeline" className="wheel-timeline">
            {/* Background stars effect */}
            <div className="stars"></div>
            
            {/* The Half Arch Wheel */}
            <div className="arch-wheel">
                {timelineEvents.map((event, index) => {
                    // Calculate position on the arch (from left to right in a semicircle)
                    const angle = (index / (totalEvents - 1)) * 180; // 0 to 180 degrees
                    const isSelected = index === selectedEvent;
                    const dayClass = event.day.toLowerCase().replace(' ', '');
                    
                    return (
                        <div
                            key={index}
                            className={`arch-item ${isSelected ? 'active' : ''} ${dayClass}`}
                            style={{
                                '--rotation': `${angle - 90}deg`,
                                '--index': index
                            }}
                            onClick={() => setSelectedEvent(index)}
                        >
                            <div className="item-label">{event.title}</div>
                            <div className="item-dot"></div>
                        </div>
                    );
                })}
            </div>

            {/* Center Content Display */}
            <div className="center-content">
                <div 
                    className="connector"
                    style={{ background: `linear-gradient(to bottom, ${getDayColor(timelineEvents[selectedEvent].day)}, transparent)` }}
                ></div>
                <div className="event-display">
                    <span className="event-day" style={{ color: getDayColor(timelineEvents[selectedEvent].day) }}>
                        {timelineEvents[selectedEvent].day}
                    </span>
                    <h2 className="event-title">{timelineEvents[selectedEvent].title}</h2>
                    <p className="event-time">{timelineEvents[selectedEvent].time}</p>
                    <p className="event-desc">{timelineEvents[selectedEvent].description}</p>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="nav-controls">
                <button onClick={() => setSelectedEvent(prev => prev === 0 ? totalEvents - 1 : prev - 1)}>
                    ‹ Prev
                </button>
                <span>{selectedEvent + 1} / {totalEvents}</span>
                <button onClick={() => setSelectedEvent(prev => (prev + 1) % totalEvents)}>
                    Next ›
                </button>
            </div>

            {/* Legend */}
            <div className="legend">
                <div className="legend-item"><span className="dot day1"></span> Day 1</div>
                <div className="legend-item"><span className="dot night"></span> Night</div>
                <div className="legend-item"><span className="dot day2"></span> Day 2</div>
            </div>

            <style>{`
                .wheel-timeline {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    background: #1a1a2e;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                }

                .stars {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: 
                        radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.4), transparent),
                        radial-gradient(2px 2px at 200px 50px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 250px 160px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 300px 90px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 350px 200px, rgba(255,255,255,0.4), transparent),
                        radial-gradient(2px 2px at 400px 70px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 450px 140px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 500px 180px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 550px 60px, rgba(255,255,255,0.4), transparent),
                        radial-gradient(2px 2px at 600px 220px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 650px 100px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 700px 150px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 750px 250px, rgba(255,255,255,0.4), transparent),
                        radial-gradient(2px 2px at 800px 80px, rgba(255,255,255,0.2), transparent),
                        radial-gradient(1px 1px at 850px 300px, rgba(255,255,255,0.3), transparent),
                        radial-gradient(2px 2px at 900px 120px, rgba(255,255,255,0.2), transparent);
                    background-size: 100% 100%;
                    pointer-events: none;
                }

                .arch-wheel {
                    position: absolute;
                    bottom: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 50%;
                }

                .arch-item {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform-origin: bottom center;
                    transform: translateX(-50%) rotate(var(--rotation));
                    height: min(45vh, 350px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    opacity: 0;
                    animation: itemFadeIn 0.6s ease forwards;
                    animation-delay: calc(var(--index) * 0.03s);
                }

                @keyframes itemFadeIn {
                    to { opacity: 1; }
                }

                .item-label {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 500;
                    white-space: nowrap;
                    transform: rotate(calc(var(--rotation) * -1));
                    transition: all 0.3s ease;
                    margin-bottom: 10px;
                }

                .item-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                }

                .arch-item:hover .item-dot {
                    transform: scale(1.4);
                    background: rgba(255, 255, 255, 0.6);
                }

                .arch-item:hover .item-label {
                    color: rgba(255, 255, 255, 0.8);
                }

                /* Day colors for dots */
                .arch-item.day1 .item-dot { border-color: #D32F2F; }
                .arch-item.night .item-dot { border-color: #7B1FA2; }
                .arch-item.day2 .item-dot { border-color: #FFD700; }

                /* Active state */
                .arch-item.active .item-dot {
                    transform: scale(1.8);
                }

                .arch-item.active.day1 .item-dot {
                    background: #D32F2F;
                    box-shadow: 0 0 20px #D32F2F, 0 0 40px rgba(211, 47, 47, 0.5);
                }

                .arch-item.active.night .item-dot {
                    background: #7B1FA2;
                    box-shadow: 0 0 20px #7B1FA2, 0 0 40px rgba(123, 31, 162, 0.5);
                }

                .arch-item.active.day2 .item-dot {
                    background: #FFD700;
                    box-shadow: 0 0 20px #FFD700, 0 0 40px rgba(255, 215, 0, 0.5);
                }

                .arch-item.active .item-label {
                    color: #fff;
                    font-weight: 700;
                    font-size: 0.85rem;
                }

                /* Center content */
                .center-content {
                    position: absolute;
                    bottom: 15%;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    z-index: 10;
                }

                .connector {
                    width: 3px;
                    height: 100px;
                    margin: 0 auto 20px;
                    border-radius: 3px;
                    transition: background 0.3s ease;
                }

                .event-display {
                    max-width: 500px;
                }

                .event-day {
                    font-size: 0.9rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    display: block;
                    margin-bottom: 10px;
                    transition: color 0.3s ease;
                }

                .event-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 15px 0;
                    line-height: 1.2;
                }

                .event-time {
                    font-size: 1.2rem;
                    color: #4a90d9;
                    font-weight: 600;
                    margin: 0 0 10px 0;
                }

                .event-desc {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 1.6;
                    margin: 0;
                    padding: 0 20px;
                }

                /* Navigation */
                .nav-controls {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    z-index: 20;
                }

                .nav-controls button {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    padding: 10px 25px;
                    border-radius: 25px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .nav-controls button:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .nav-controls span {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                }

                /* Legend */
                .legend {
                    position: absolute;
                    top: 30px;
                    right: 30px;
                    display: flex;
                    gap: 20px;
                    z-index: 20;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .legend .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .legend .dot.day1 { background: #D32F2F; }
                .legend .dot.night { background: #7B1FA2; }
                .legend .dot.day2 { background: #FFD700; }

                /* Responsive */
                @media (max-width: 768px) {
                    .arch-item {
                        height: min(35vh, 250px);
                    }

                    .item-label {
                        font-size: 0.65rem;
                    }

                    .item-dot {
                        width: 10px;
                        height: 10px;
                    }

                    .event-title {
                        font-size: 1.8rem;
                    }

                    .event-time {
                        font-size: 1rem;
                    }

                    .event-desc {
                        font-size: 0.9rem;
                    }

                    .connector {
                        height: 60px;
                    }

                    .legend {
                        top: 20px;
                        right: 20px;
                        flex-direction: column;
                        gap: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .item-label {
                        display: none;
                    }

                    .arch-item {
                        height: min(30vh, 200px);
                    }

                    .event-title {
                        font-size: 1.4rem;
                    }

                    .event-display {
                        max-width: 280px;
                    }

                    .nav-controls {
                        bottom: 20px;
                    }

                    .nav-controls button {
                        padding: 8px 18px;
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </section>
    );
}
