import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import { Plus, Minus } from 'lucide-react';
import firstP from '../image/first-p.png';

const faqData = [
    {
        question: "What is HACKFEST 2K26?",
        answer: "HACKFEST 2K26 is a 36-hour national-level hackathon hosted by the Department of AI, CSE, IT, CSBS & MCA at M. Kumarasamy College of Engineering, Karur. It's an epic event calling all tech wizards and innovation enthusiasts to build groundbreaking solutions!"
    },
    {
        question: "When and where is the hackathon?",
        answer: "The hackathon runs from Feb 20th, 9:00 AM to Feb 21st, 9:00 PM, 2026 at M. Kumarasamy College of Engineering, Karur. Registration deadline is Feb 12, 2026 - secure your spot before it's too late!"
    },
    {
        question: "Who can participate?",
        answer: "Open to all undergraduate and postgraduate students across various disciplines! Form a team of up to 4 members (teamwork makes the dream work!) and get ready for an amazing coding marathon."
    },
    {
        question: "What are the prizes?",
        answer: "Amazing prizes worth ₹1,15,000 INR await the winners! Along with cash prizes, you'll get goodies, certificates, and a chance to network with industry experts and mentors."
    },
    {
        question: "What should I bring?",
        answer: "Bring your own equipment (laptops, chargers, etc.) and be prepared for a 36-hour coding marathon! Commitment to the entire duration is crucial. Stay energized and ready to innovate!"
    },
    {
        question: "What are the rules?",
        answer: "Remember, plagiarism is a strict no-go! All code must be original and created during the hackathon. Teams must commit to the full 36 hours. Register now and be part of something groundbreaking!"
    }
];

function FAQItem({ item, isOpen, onClick, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-b border-white/10"
        >
            <button
                onClick={onClick}
                className="w-full text-left py-3 flex items-start justify-between gap-4 group"
            >
                <div className="flex items-start gap-4">
                    <span 
                        className="text-sm font-mono mt-1"
                        style={{ color: '#7A1E2D' }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span 
                        className="text-white font-medium text-lg md:text-xl group-hover:text-gray-300 transition-colors" 
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        {item.question}
                    </span>
                </div>
                <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-all duration-300"
                    style={{ 
                        background: isOpen ? '#7A1E2D' : 'rgba(255,255,255,0.1)',
                    }}
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4 text-white" />
                    ) : (
                        <Plus className="w-4 h-4 text-white" />
                    )}
                </div>
            </button>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-400 text-base leading-relaxed pl-12 pb-5">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function About() {
    const ref = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);
    
    // Parallax scroll tracking
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Parallax effects for different elements
    const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <motion.section
            ref={ref}
            id="about"
            className="min-h-screen flex items-center relative overflow-hidden"
            style={{ background: '#0B0B0B' }}
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

            <Container className="relative z-10 py-20">
                {/* Header Section */}
                <Row className="mb-8">
                    <Col lg={8}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ y: contentY }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-gray-400 font-semibold text-sm tracking-wider uppercase mb-4">
                                About The Event
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                Got Questions?
                            </h2>
                            <h2 className="text-4xl md:text-5xl font-bold mb-0 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#7A1E2D' }}>
                                We've Got Answers.
                            </h2>
                        </motion.div>
                    </Col>
                </Row>

                <Row className="align-items-start g-5">
                    {/* Left - FAQ Content (wider) */}
                    <Col lg={7}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* FAQ Accordion */}
                            <div className="border-t border-white/10">
                                {faqData.map((item, index) => (
                                    <FAQItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        isOpen={openIndex === index}
                                        onClick={() => handleToggle(index)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </Col>

                    {/* Right - Image with Parallax */}
                    <Col lg={5}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative sticky"
                            style={{ y: imageY, top: '-50px' }}
                        >
                            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
                                <img
                                    src={firstP}
                                    alt="Hackathon"
                                    className="w-full"
                                    style={{ height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
                                />
                            </div>

                            {/* Tagline below image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mt-8 text-left"
                            >
                                <h3 
                                    className="leading-tight"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    <div className="text-4xl md:text-5xl font-black text-white">
                                        BUILD. COLLABORATE.
                                    </div>
                                    <div className="text-4xl md:text-5xl font-black text-gray-500 mt-2">
                                        CREATE IMPACT.
                                    </div>
                                </h3>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </motion.section>
    );
}
