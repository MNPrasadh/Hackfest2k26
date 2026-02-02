import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.766165!2d78.04844154399788!3d11.05432857905236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f8cafec7c95%3A0xa3459e9bc37d5a!2sM.%20Kumarasamy%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1706500000000!5m2!1sen!2sin&markers=color:red%7Clabel:MKCE%7C11.05432857905236,78.04844154399788";

    const locationLink = "https://maps.google.com/?q=M.+Kumarasamy+College+of+Engineering,+Karur";

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Domains', href: '#themes' },
        { name: 'Prizes', href: '#prizes' }
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const id = href.substring(1);
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.footer
            id="footer"
            className="min-h-screen flex items-center relative overflow-hidden"
            style={{ background: '#0a0a0a' }}
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Container className="relative z-10 py-20">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-gray-400 font-semibold text-sm tracking-wider uppercase mb-4">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Contact Us
                    </h2>
                </motion.div>

                <Row className="g-5">
                    {/* Map */}
                    <Col lg={7}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="rounded-2xl overflow-hidden mb-4 relative"
                                style={{ height: '320px', border: '1px solid #222' }}>
                                <iframe
                                    src={mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="MKCE Location"
                                />
                                {/* Location Card Overlay */}
                                <motion.a
                                    href={locationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute top-4 left-4 flex items-center gap-3 p-4 rounded-xl no-underline text-white hover:text-gray-200 transition-all"
                                    style={{ background: 'rgba(0, 0, 0, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', maxWidth: '280px' }}
                                    whileHover={{ scale: 1.05, borderColor: '#666' }}
                                >
                                    <span className="text-2xl">📍</span>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm mb-0">M. Kumarasamy College of Engineering</p>
                                        <p className="text-gray-400 text-xs mb-0">Thalavapalayam, Karur</p>
                                    </div>
                                </motion.a>
                            </div>
                        </motion.div>
                    </Col>

                    {/* Contact Info */}
                    <Col lg={5}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-100 d-flex flex-column gap-4"
                        >
                            {/* Email Card */}
                            <motion.div
                                className="p-6 rounded-xl flex-grow-1"
                                style={{ background: '#111', border: '1px solid #222' }}
                                whileHover={{ borderColor: '#333' }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl">✉️</span>
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Email Us</p>
                                        <a href="mailto:hackfest2k26@mkce.ac.in" className="text-white font-bold text-xl no-underline hover:text-gray-300">
                                            hackfest2k26@mkce.ac.in
                                        </a>
                                    </div>
                                </div>
                                <div>
                                        <p className="text-gray-500 text-sm mb-1">📞Call Us</p>
                                        <a href="tel:+1234567890" className="text-white font-bold text-xl no-underline hover:text-gray-300">
                                            73053 86217 , 84382 07452
                                        </a>
                                    </div>
                                <p className="text-gray-600 text-sm mb-0">We typically respond within 24 hours</p>
                            </motion.div>

                            {/* How to reach MKCE Card */}
                            <motion.div
                                className="p-6 rounded-xl"
                                style={{ background: '#111', border: '1px solid #222' }}
                                whileHover={{ borderColor: '#333' }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">🎓</span>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-0">Reach MKCE</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-white text-sm leading-relaxed">
                                            From Karur New Bus Stand, get bus to Old Bus Stand → take the M.Kumarasamy College of Engineering (Thalavapalayam)<br></br>(Bus No: 1) → get down at MKCE.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm">
                                            <span className="font-medium">Own vehicle:</span> Search "M.Kumarasamy College of Engineering" on Google Maps.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>

                {/* Footer Bottom removed as requested */}
            </Container>
        </motion.footer>
    );
}
