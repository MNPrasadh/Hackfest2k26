import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

const coordinators = [
    { 
        name: "Coordinator Name", 
        role: "Lead Coordinator",
        image: "https://via.placeholder.com/200x200?text=Photo",
        department: "Department"
    },
    { 
        name: "Coordinator Name", 
        role: "Technical Lead",
        image: "https://via.placeholder.com/200x200?text=Photo",
        department: "Department"
    },
    { 
        name: "Coordinator Name", 
        role: "Event Manager",
        image: "https://via.placeholder.com/200x200?text=Photo",
        department: "Department"
    },
    { 
        name: "Coordinator Name", 
        role: "Operations Head",
        image: "https://via.placeholder.com/200x200?text=Photo",
        department: "Department"
    },
];

export default function EventCoordinators() {
    return (
        <motion.section
            id="coordinators"
            className="flex items-center relative overflow-hidden"
            style={{ background: '#0a0a0a' }}
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Subtle Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)',
                    backgroundSize: '70px 70px'
                }} />

            <Container className="relative z-10 py-12">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-gray-400 font-semibold text-sm tracking-wider uppercase mb-4">
                        The Team
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Event Coordinators
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Meet the minds behind HACKFEST 2K26
                    </p>
                </motion.div>

                {/* Coordinator Cards */}
                <Row className="g-4 justify-content-center">
                    {coordinators.map((coordinator, index) => (
                        <Col key={index} xs={10} sm={6} lg={3}>
                            <motion.div
                                className="text-center h-full"
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <motion.div
                                    className="relative mb-4 mx-auto overflow-hidden rounded-2xl"
                                    style={{ 
                                        width: '180px', 
                                        height: '180px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                    }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                >
                                    <img
                                        src={coordinator.image}
                                        alt={coordinator.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </motion.div>

                                {/* Info */}
                                <h4 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {coordinator.name}
                                </h4>
                                <p className="text-purple-400 font-semibold text-sm mb-1">
                                    {coordinator.role}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {coordinator.department}
                                </p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </motion.section>
    );
}
