import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import crowd from '../image/crowd.png';
import img1 from '../image/img-1.png';
import img2 from '../image/img-2.png';
import img3 from '../image/img-3.png';
import img4 from '../image/img-4.png';
import img5 from '../image/img-5.png';
import img6 from '../image/img-6.png';
import img7 from '../image/img-7.png';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    // Animation variants for entrance and exit (right to left, left to right)
    const sectionVariants = {
        hidden: { opacity: 0, x: '40vw' },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        exit: { opacity: 0, x: '40vw', transition: { duration: 0.6, ease: 'easeIn' } }
    };

    // First row images
    const galleryImagesRow1 = [
        { url: crowd, title: 'Crowd Moments' },
        { url: img1, title: 'Event Highlights' },
        { url: img2, title: 'Team Collaboration' },
        { url: img3, title: 'Success Stories' },
        { url: crowd, title: 'Crowd Moments' },
        { url: img1, title: 'Event Highlights' },
        { url: img2, title: 'Team Collaboration' },
        { url: img3, title: 'Success Stories' },
    ];

    // Second row images - local event images
    const galleryImagesRow2 = [
        { url: img4, title: 'Event Moment 4' },
        { url: img5, title: 'Event Moment 5' },
        { url: img6, title: 'Event Moment 6' },
        { url: img7, title: 'Event Moment 7' },
        { url: img4, title: 'Event Moment 4' },
        { url: img5, title: 'Event Moment 5' },
        { url: img6, title: 'Event Moment 6' },
        { url: img7, title: 'Event Moment 7' },
    ];

    // Duplicate images for seamless infinite scroll
    const duplicatedImagesRow1 = [...galleryImagesRow1, ...galleryImagesRow1];
    const duplicatedImagesRow2 = [...galleryImagesRow2, ...galleryImagesRow2];

    return (
        <motion.section
            key="gallery-section"
            id="gallery"
            className="h-screen flex flex-col overflow-hidden flex-shrink-0"
            style={{ background: '#0a0a0a', width: '100vw' }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ amount: 0.2 }}
        >
            {/* Header */}
            <motion.div
                className="text-center py-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-gray-400 font-semibold text-sm tracking-wider uppercase mb-4">
                    Memories
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Event Gallery
                </h2>
            </motion.div>

            {/* Sliding Gallery - Row 1 (Left to Right) */}
            <div className="relative overflow-hidden py-4">
                <motion.div
                    className="flex gap-4"
                    style={{ willChange: 'transform' }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 30,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedImagesRow1.map((img, index) => (
                        <motion.div
                            key={index}
                            className="relative flex-shrink-0 overflow-hidden cursor-pointer group rounded-xl"
                            style={{ width: '350px', height: '250px', willChange: 'transform' }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <p className="text-white font-bold text-xl">{img.title}</p>
                                    <p className="text-gray-400 text-sm">Click to view</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Sliding Gallery - Row 2 (Right to Left) */}
            <div className="relative overflow-hidden py-4">
                <motion.div
                    className="flex gap-4"
                    style={{ willChange: 'transform' }}
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 25,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedImagesRow2.map((img, index) => (
                        <motion.div
                            key={index}
                            className="relative flex-shrink-0 overflow-hidden cursor-pointer group rounded-xl"
                            style={{ width: '350px', height: '250px', willChange: 'transform' }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <p className="text-white font-bold text-xl">{img.title}</p>
                                    <p className="text-gray-400 text-sm">Click to view</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                        >
                            <button
                                className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-400 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >×</button>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="w-full max-h-[80vh] object-contain rounded-xl"
                            />
                            <p className="text-white text-center mt-4 text-xl font-medium">{selectedImage.title}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
