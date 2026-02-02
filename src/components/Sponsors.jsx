import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import mkceLogo from '../image/mkce.logo.png';
import ibmLogo from '../image/ibm.png';
import adroitLogo from '../image/adroit.jpg';

const partners = [
    { name: "M. Kumarasamy College of Engineering", logo: mkceLogo, type: "Host Institution", scale: 1.2 },
    { name: "IBM", logo: ibmLogo, type: "Technology Partner", scale: 1 },
    { name: "AdroIT Technologies", logo: adroitLogo, type: "Industry Partner", scale: 1.3 }
];

export default function Sponsors() {
    return (
        <motion.section
            id="sponsors"
            className="flex items-center relative overflow-hidden"
            style={{ background: '#0B0B0B' }}
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Subtle Grid */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
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
                    <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm tracking-wider uppercase mb-4">
                        Collaborators
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Our Network
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Proudly supported by industry leaders
                    </p>
                </motion.div>

                {/* Partner Cards */}
                <Row className="g-5 justify-content-center">
                    {partners.map((partner, index) => (
                        <Col key={index} xs={10} sm={6} lg={4}>
                            <motion.div
                                className="p-8 rounded-3xl bg-gray-50 text-center h-full"
                                style={{
                                    border: '1px solid #eee',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                                }}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
                                }}
                            >
                                {/* Type Badge */}
                                <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-6">
                                    {partner.type}
                                </span>

                                {/* Logo Container */}
                                <motion.div
                                    className="h-24 flex items-center justify-center mb-6"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                        style={{ maxWidth: `${150 * (partner.scale || 1)}px`, transform: `scale(${partner.scale || 1})` }}
                                    />
                                </motion.div>

                                {/* Name */}
                                <p className="text-gray-800 font-semibold text-lg mb-0">{partner.name}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </motion.section>
    );
}
