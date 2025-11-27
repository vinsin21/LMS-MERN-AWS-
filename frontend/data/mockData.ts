
export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'article' | 'quiz';
    isCompleted: boolean;
    videoUrl?: string; // For mock purposes
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    thumbnail: string;
    instructor: string;
    progress: number; // 0 to 100
    totalLessons: number;
    completedLessons: number;
    lastAccessed: string;
    modules: Module[]; // Added modules
}

export interface User {
    name: string;
    email: string;
    avatar: string;
    role: 'student' | 'admin';
    stats: {
        coursesInProgress: number;
        coursesCompleted: number;
        certificatesEarned: number;
        hoursLearned: number;
    };
    enrolledCourses: Course[];
}

export const mockUser: User = {
    name: "Khush",
    email: "khush@example.com",
    avatar: "https://picsum.photos/id/1005/200/200",
    role: "student",
    stats: {
        coursesInProgress: 3,
        coursesCompleted: 1,
        certificatesEarned: 1,
        hoursLearned: 24,
    },
    enrolledCourses: [
        {
            id: "react-mastery",
            title: "React.js Mastery: From Beginner to Advanced",
            thumbnail: "https://picsum.photos/seed/react/300/200",
            instructor: "Saurabh S",
            progress: 65,
            totalLessons: 42,
            completedLessons: 27,
            lastAccessed: "2 hours ago",
            modules: [
                {
                    id: "m1",
                    title: "Module 1: Introduction to React Ecosystem",
                    lessons: [
                        { id: "l1-1", title: "Welcome to the Course", duration: "05:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l1-2", title: "What is React?", duration: "10:05", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l1-3", title: "Setting up the Environment (VS Code, Node)", duration: "15:20", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l1-4", title: "NPM vs Yarn vs PNPM", duration: "08:45", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l1-5", title: "Creating your first React App (Vite)", duration: "12:30", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l1-6", title: "Folder Structure Walkthrough", duration: "10:15", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m2",
                    title: "Module 2: JSX & Rendering",
                    lessons: [
                        { id: "l2-1", title: "Understanding JSX", duration: "14:10", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l2-2", title: "JSX Rules & Best Practices", duration: "11:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l2-3", title: "Rendering Elements", duration: "09:50", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l2-4", title: "React.Fragment & StrictMode", duration: "07:20", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l2-5", title: "JavaScript Expressions in JSX", duration: "13:45", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m3",
                    title: "Module 3: Components & Props",
                    lessons: [
                        { id: "l3-1", title: "Functional Components vs Class Components", duration: "16:40", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l3-2", title: "Understanding Props", duration: "22:15", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l3-3", title: "Destructuring Props", duration: "08:30", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l3-4", title: "Children Prop", duration: "12:10", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l3-5", title: "Prop Types & Default Props", duration: "10:50", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l3-6", title: "Building a Reusable Button Component", duration: "18:20", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m4",
                    title: "Module 4: State Management Basics",
                    lessons: [
                        { id: "l4-1", title: "What is State?", duration: "10:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l4-2", title: "The useState Hook", duration: "20:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l4-3", title: "State vs Props", duration: "12:45", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l4-4", title: "Handling Input State", duration: "15:30", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l4-5", title: "Updating Objects & Arrays in State", duration: "25:10", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l4-6", title: "Simple Counter App Project", duration: "30:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m5",
                    title: "Module 5: Handling Events",
                    lessons: [
                        { id: "l5-1", title: "Adding Event Handlers", duration: "14:20", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l5-2", title: "Passing Arguments to Event Handlers", duration: "11:50", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l5-3", title: "Synthetic Events", duration: "09:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l5-4", title: "Preventing Default Behavior", duration: "08:15", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l5-5", title: "Event Bubbling & Capturing", duration: "16:40", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m6",
                    title: "Module 6: Conditional Rendering & Lists",
                    lessons: [
                        { id: "l6-1", title: "Conditional Rendering with && and Ternary", duration: "13:10", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l6-2", title: "Rendering Lists with .map()", duration: "15:50", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l6-3", title: "Understanding Keys in Lists", duration: "12:20", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l6-4", title: "Filtering Lists", duration: "10:40", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l6-5", title: "Project: Todo List App", duration: "45:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m7",
                    title: "Module 7: Forms in React",
                    lessons: [
                        { id: "l7-1", title: "Controlled Components", duration: "18:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l7-2", title: "Handling Multiple Inputs", duration: "14:15", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l7-3", title: "Textarea and Select", duration: "10:50", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l7-4", title: "Form Validation Basics", duration: "22:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l7-5", title: "Uncontrolled Components & useRef", duration: "16:20", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l7-6", title: "Using React Hook Form (Intro)", duration: "20:10", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m8",
                    title: "Module 8: Side Effects & useEffect",
                    lessons: [
                        { id: "l8-1", title: "Understanding Side Effects", duration: "11:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l8-2", title: "The useEffect Hook Syntax", duration: "15:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l8-3", title: "Dependency Array Explained", duration: "18:45", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l8-4", title: "Cleanup Functions", duration: "14:20", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l8-5", title: "Fetching Data from an API", duration: "25:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l8-6", title: "Handling Loading & Error States", duration: "19:15", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m9",
                    title: "Module 9: Context API & State Management",
                    lessons: [
                        { id: "l9-1", title: "Prop Drilling Problem", duration: "12:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l9-2", title: "Introduction to Context API", duration: "16:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l9-3", title: "createContext & useContext", duration: "14:50", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l9-4", title: "Building a Theme Provider", duration: "22:10", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l9-5", title: "Performance Considerations", duration: "15:40", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                },
                {
                    id: "m10",
                    title: "Module 10: Advanced Hooks & Performance",
                    lessons: [
                        { id: "l10-1", title: "useReducer Hook", duration: "20:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l10-2", title: "useMemo Hook", duration: "18:15", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l10-3", title: "useCallback Hook", duration: "16:50", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l10-4", title: "React.memo", duration: "14:30", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l10-5", title: "Custom Hooks", duration: "24:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                }
            ]
        },
        {
            id: "backend-nodejs",
            title: "Backend Development with Node.js & Express",
            thumbnail: "https://picsum.photos/seed/node/300/200",
            instructor: "John Doe",
            progress: 12,
            totalLessons: 35,
            completedLessons: 4,
            lastAccessed: "1 day ago",
            modules: [
                {
                    id: "m1",
                    title: "Node.js Basics",
                    lessons: [
                        { id: "l1", title: "Intro to Node.js", duration: "10:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { id: "l2", title: "Modules System", duration: "12:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                }
            ]
        },
        {
            id: "ui-ux-design",
            title: "Modern UI/UX Design Principles",
            thumbnail: "https://picsum.photos/seed/uiux/300/200",
            instructor: "Jane Smith",
            progress: 0,
            totalLessons: 20,
            completedLessons: 0,
            lastAccessed: "Never",
            modules: [
                {
                    id: "m1",
                    title: "Design Fundamentals",
                    lessons: [
                        { id: "l1", title: "Color Theory", duration: "10:00", type: "video", isCompleted: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                }
            ]
        },
        {
            id: "python-basics",
            title: "Python for Beginners",
            thumbnail: "https://picsum.photos/seed/python/300/200",
            instructor: "Alex Brown",
            progress: 100,
            totalLessons: 15,
            completedLessons: 15,
            lastAccessed: "1 week ago",
            modules: [
                {
                    id: "m1",
                    title: "Python Setup",
                    lessons: [
                        { id: "l1", title: "Installing Python", duration: "05:00", type: "video", isCompleted: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    ]
                }
            ]
        }
    ]
};
