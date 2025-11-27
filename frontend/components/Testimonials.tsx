import React, { useState, useRef } from 'react';
import { Star, Play, ArrowRight, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShimmerButton } from './ui/shimmer-button';
import { motion, AnimatePresence } from 'framer-motion';

export interface TestimonialAuthor {
  name: string;
  role: string;
  avatar: string;
  handle?: string;
}

interface TestimonialsProps {
  hideHeader?: boolean;
  className?: string;
}

export const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={16} fill="white" className="text-white" strokeWidth={0} />
    ))}
  </div>
);

export const VideoCard = ({
  image,
  text,
  author,
  highlightText,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" // Default sample video
}: {
  image: string,
  text: string,
  author: TestimonialAuthor,
  highlightText?: string,
  videoUrl?: string
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Small delay to allow render before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col h-full hover:border-white/10 transition-colors relative overflow-hidden group">

      {/* Video Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
            />
            {/* Vignette / Blur Effect at borders */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_20px_rgba(0,0,0,0.8)] border-[1px] border-white/5 rounded-2xl"></div>

            {/* Close/Pause Button (Optional UX improvement) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-4 right-4 z-30 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
            >
              <Pause size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Thumbnail Area */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-6 cursor-pointer"
        onClick={handlePlay}
      >
        <img src={image} alt={author.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Play Button (Top Left) */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform z-10">
          <Play size={16} className="fill-white text-white ml-0.5" />
        </div>
      </div>

      {/* Content */}
      <div className={`px-2 pb-2 flex-1 flex flex-col transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <StarRating />

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {highlightText ? (
            <>
              {text.split(highlightText)[0]}
              <span className="text-white font-medium block mt-4 mb-4">{highlightText}</span>
              {text.split(highlightText)[1]}
            </>
          ) : (
            text
          )}
        </p>

        {/* Author Info */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-md object-cover grayscale opacity-70" />
          <div className="flex flex-col">
            <span className="font-cursive text-xl text-gray-300 leading-none mb-1">{author.name}</span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{author.role}</span>
            {author.handle && <span className="text-[10px] text-gray-600">{author.handle}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TextCard = ({
  text,
  author,
  hasAudio
}: {
  text: string,
  author: TestimonialAuthor,
  hasAudio?: boolean
}) => (
  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
    <StarRating />

    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {text}
    </p>

    {hasAudio && (
      <div className="mb-6 bg-white/5 rounded-lg p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
          <Play size={12} className="fill-white text-white ml-0.5" />
        </div>
        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gray-500 rounded-full"></div>
        </div>
        <span className="text-xs text-gray-500 font-mono">0:56</span>
      </div>
    )}

    {/* Author Info */}
    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
      <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-md object-cover grayscale opacity-70" />
      <div className="flex flex-col">
        <span className="font-cursive text-xl text-gray-300 leading-none mb-1">{author.name}</span>
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{author.role}</span>
        {author.handle && <span className="text-[10px] text-gray-600">{author.handle}</span>}
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC<TestimonialsProps> = ({ hideHeader = false, className = '' }) => {
  return (
    <section className={`relative overflow-hidden ${hideHeader ? 'py-4' : 'py-24'} ${className}`}>

      {/* Header */}
      {!hideHeader && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-16 text-center">

          {/* Decorative Top Text */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Left Laurel */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[-30deg]">
              <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Testimonials</span>

            {/* Right Laurel */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-[30deg] scale-x-[-1]">
              <path d="M7 19C7 19 9 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 22C10 22 12 17 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 16C4 16 6 11 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Some Honest Feedbacks
          </h2>
          <p className="text-gray-500 text-lg">
            Trusted & loved by many students & professionals.
          </p>

          {/* Handwritten Arrow Decoration */}
          <div className="absolute top-0 right-10 lg:right-1/4 translate-x-12 hidden md:block">
            <span className="font-cursive text-gray-500 text-xl rotate-[-6deg] block mb-2 opacity-80">
              See why they love <br /> Coder's Gyan
            </span>
            <svg width="40" height="40" viewBox="0 0 50 60" fill="none" className="text-gray-600 ml-4 opacity-70">
              <path d="M10 10 C 15 30, 20 40, 20 50" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              <path d="M20 50 L 15 42 M 20 50 L 26 44" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <div className={hideHeader ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Column 1 (Left) */}
          <div className="h-full">
            <VideoCard
              image="https://picsum.photos/id/338/600/800"
              text="This is Amit Kumar, and I had an incredible learning experience in the Backend Development course by CodersGyan. The course covered everything from networking, databases, DevOps, Linux(AWS), web security & more. The hands-on capstone projects were extremely helpful in building my skills. A special thanks to Rakesh Sir for making each concept easy to understand and applying practical knowledge throughout."
              author={{
                name: "Amit Kumar",
                role: "Final Year - CSE Student, Graduating In 2026",
                avatar: "https://picsum.photos/id/338/100/100",
                handle: "@amitkumar"
              }}
            />
          </div>

          {/* Column 2 (Middle - Stacked) */}
          <div className="flex flex-col gap-6">
            <TextCard
              text="I have been searching for the content that levels up me and spent amount of time and money, but Rakesh sir where you have been that time. Absolutely game winner course."
              author={{
                name: "Krishna Tiwari",
                role: "Student",
                avatar: "https://picsum.photos/id/201/100/100"
              }}
            />
            <TextCard
              text="Before joining this course, I knew bits and pieces of the puzzle, but the real challenge was putting them together and seeing the bigger picture. Rakesh Sir's guidance and the live sessions helped me understand everything from the ground up. What really stood out was the hands-on approach learning both Full Stack and Backend by actually building, not just watching videos passively."
              hasAudio={true}
              author={{
                name: "Aditya Dhopade",
                role: "DevOps Engineer",
                avatar: "https://picsum.photos/id/1025/100/100",
                handle: "@adityadhopade"
              }}
            />
          </div>

          {/* Column 3 (Right) */}
          <div className="h-full">
            <VideoCard
              image="https://picsum.photos/id/119/600/800"
              text="I found both the Advanced MERN and Backend Foundation courses to be exceptionally well-structured and beginner-friendly. Highly recommended for anyone serious about leveling up their skills in fullstack development Whether you are just a begineer or familiar with some concepts, you'll find them incredibly valuable and easy to follow because of easy and clear explanations. Thank you for creating such valuable content!"
              highlightText="Highly recommended for anyone serious about leveling up their skills in fullstack development Whether you are just a begineer or familiar with some concepts, you'll find them incredibly valuable and easy to follow because of easy and clear explanations."
              author={{
                name: "Sujoy Kumar Haldar",
                role: "Frontend Engineer",
                avatar: "https://picsum.photos/id/119/100/100",
                handle: "@sujoykumarhaldar"
              }}
            />
          </div>

        </div>

        {/* Bottom Button */}
        {!hideHeader && (
          <div className="flex justify-center mt-12">
            <Link to="/testimonials">
              <ShimmerButton
                background="#333333"
                shimmerColor="#ffffff"
                className="text-white border border-white/20 pl-2 pr-6"
              >
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#262626] overflow-hidden">
                      <img src={`https://picsum.photos/id/${50 + i}/50/50`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="font-medium text-sm">More Success Stories</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ShimmerButton>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};