import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { VideoCard, TextCard, TestimonialAuthor } from '../components/Testimonials';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { ArrowRight, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Base dummy data
const baseTestimonials = [
    {
        type: 'video',
        image: "https://picsum.photos/id/338/600/800",
        text: "This is Amit Kumar, and I had an incredible learning experience in the Backend Development course by CodersGyan. The course covered everything from networking, databases, DevOps, Linux(AWS), web security & more. The hands-on capstone projects were extremely helpful in building my skills.",
        author: {
            name: "Amit Kumar",
            role: "Final Year - CSE Student",
            avatar: "https://picsum.photos/id/338/100/100",
            handle: "@amitkumar"
        }
    },
    {
        type: 'text',
        text: "I have been searching for the content that levels up me and spent amount of time and money, but Rakesh sir where you have been that time. Absolutely game winner course.",
        author: {
            name: "Krishna Tiwari",
            role: "Student",
            avatar: "https://picsum.photos/id/201/100/100"
        }
    },
    {
        type: 'text',
        text: "Before joining this course, I knew bits and pieces of the puzzle, but the real challenge was putting them together and seeing the bigger picture. Rakesh Sir's guidance and the live sessions helped me understand everything from the ground up.",
        hasAudio: true,
        author: {
            name: "Aditya Dhopade",
            role: "DevOps Engineer",
            avatar: "https://picsum.photos/id/1025/100/100",
            handle: "@adityadhopade"
        }
    },
    {
        type: 'video',
        image: "https://picsum.photos/id/119/600/800",
        text: "I found both the Advanced MERN and Backend Foundation courses to be exceptionally well-structured and beginner-friendly. Highly recommended for anyone serious about leveling up their skills in fullstack development.",
        highlightText: "Highly recommended for anyone serious about leveling up their skills in fullstack development",
        author: {
            name: "Sujoy Kumar Haldar",
            role: "Frontend Engineer",
            avatar: "https://picsum.photos/id/119/100/100",
            handle: "@sujoykumarhaldar"
        }
    },
    {
        type: 'text',
        text: "The best part about Coder's Gyan is the community. Everyone is so helpful and the mentors are always there to guide you. I landed my first job after completing the Full Stack course! The mock interviews were a game changer for me.",
        author: {
            name: "Priya Sharma",
            role: "Junior Developer",
            avatar: "https://picsum.photos/id/449/100/100",
            handle: "@priyacodes"
        }
    },
    {
        type: 'text',
        text: "Rakesh Sir explains complex concepts in such a simple way. I never thought I could understand System Design so easily. Truly grateful for this platform. The way he breaks down distributed systems is just mind-blowing.",
        author: {
            name: "Rahul Verma",
            role: "Software Engineer",
            avatar: "https://picsum.photos/id/551/100/100"
        }
    },
    {
        type: 'video',
        image: "https://picsum.photos/id/669/600/800",
        text: "Switching from a non-tech background was scary, but the roadmap provided here was a lifesaver. The projects are real-world and look great on my resume. I can't thank the team enough for their support.",
        author: {
            name: "Anjali Gupta",
            role: "Career Switcher",
            avatar: "https://picsum.photos/id/669/100/100",
            handle: "@anjali_g"
        }
    },
    {
        type: 'text',
        text: "The value for money is insane. I've paid 10x more for bootcamps that taught me half of what I learned here. Don't think twice, just join. It's the best investment I've made for my career.",
        author: {
            name: "Vikram Singh",
            role: "Freelancer",
            avatar: "https://picsum.photos/id/777/100/100"
        }
    },
    {
        type: 'text',
        text: "I love the focus on 'Why' rather than just 'How'. Understanding the internals of Node.js changed how I write code. Kudos to the team! The deep dive into event loop was fantastic.",
        hasAudio: true,
        author: {
            name: "Sneha Patel",
            role: "Backend Developer",
            avatar: "https://picsum.photos/id/888/100/100",
            handle: "@snehadev"
        }
    }
];

// Helper to shuffle array
const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Helper to vary text length
const varyText = (text: string, seed: number) => {
    if (seed % 3 === 0) return text;
    if (seed % 3 === 1) return text + " " + text.split(' ').slice(0, 10).join(' ') + "...";
    return text.split(' ').slice(0, Math.max(10, text.split(' ').length - 5)).join(' ') + ".";
};

export const Testimonials = () => {
    const navigate = useNavigate();

    // Generate randomized data once on mount
    const testimonials = useMemo(() => {
        const generated = [
            ...baseTestimonials,
            ...baseTestimonials.map((t, i) => ({
                ...t,
                text: varyText(t.text, i),
                author: { ...t.author, name: `${t.author.name} ${i + 2}` }
            })),
            ...baseTestimonials.slice(0, 7).map((t, i) => ({
                ...t,
                text: varyText(t.text, i + 10),
                author: { ...t.author, name: `${t.author.name} ${i + 3}` }
            }))
        ];
        return shuffleArray(generated);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 relative">

            {/* Background Ambience (Same as Courses page) */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#FFD439]/5 via-[#171717] to-[#171717] pointer-events-none"></div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">

                {/* Decorative Left Element */}
                <div className="hidden lg:block absolute top-1/2 left-[5%] xl:left-[10%] -translate-y-1/2">
                    <div className="relative">
                        <span className="font-cursive text-gray-500 text-2xl absolute -top-8 -left-4 -rotate-12 whitespace-nowrap">Real Stories</span>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-gray-600/60 rotate-[20deg]">
                            <path d="M10 40 C 20 30, 30 15, 40 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            <path d="M40 5 L 35 12 M 40 5 L 30 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* Decorative Right Element */}
                <div className="hidden lg:block absolute top-0 right-[5%] xl:right-[12%] translate-y-8">
                    <div className="relative">
                        <span className="font-cursive text-gray-500 text-2xl absolute -top-6 left-4 rotate-6 whitespace-nowrap">Career Impact</span>
                        <svg width="40" height="50" viewBox="0 0 50 60" fill="none" className="text-gray-600/60 rotate-[-15deg]">
                            <path d="M10 10 C 10 30, 30 40, 30 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            <path d="M30 55 L 24 48 M 30 55 L 38 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-brand-yellow font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
                        </span>
                        Wall of Love
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">thousands</span> <br /> of developers
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Don't just take our word for it. Here's what our community has to say about their learning journey with Coder's Gyan.
                    </p>
                </motion.div>
            </div>

            {/* Masonry-style Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="break-inside-avoid"
                        >
                            {item.type === 'video' ? (
                                <VideoCard
                                    image={item.image!}
                                    text={item.text}
                                    author={item.author}
                                    highlightText={item.highlightText}
                                />
                            ) : (
                                <TextCard
                                    text={item.text}
                                    author={item.author}
                                    hasAudio={item.hasAudio}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-3xl mx-auto px-4 mt-32 text-center relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6">Ready to write your own success story?</h3>
                <p className="text-gray-400 mb-8">Join thousands of developers mastering backend development today.</p>

                <div className="flex justify-center">
                    <ShimmerButton
                        background="#FFD439"
                        shimmerColor="#ffffff"
                        className="text-black shadow-[0_0_20px_rgba(255,212,57,0.3)] font-semibold"
                        onClick={() => navigate('/courses')}
                    >
                        <Crown size={20} className="mr-2" />
                        Explore Courses
                    </ShimmerButton>
                </div>
            </div>

        </div>
    );
};
