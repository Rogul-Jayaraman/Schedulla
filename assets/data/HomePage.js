import { BarChart, Calendar, CalendarPlus, Clock, Link, Users } from "lucide-react";

export const features = [
  {
    icon: CalendarPlus,
    title: "Create Events",
    description:
      "Set start and end times, locations, and attach relevant files.",
  },
  {
    icon: Clock,
    title: "Availability Management",
    description:
      "	Set and share your available time slots, working hours, and manage busy periods with ease.",
  },
  {
    icon: Link,
    title: "Custom Booking ",
    description:
      "Generate personalized booking links to let others schedule meetings directly based on your availability.",
  },
];

import test_1 from "../images/testimonials/test_1.jpg";
import test_2 from "../images/testimonials/test_2.jpg";
import test_3 from "../images/testimonials/test_3.jpg";
import test_4 from "../images/testimonials/test_4.jpg";
import test_5 from "../images/testimonials/test_5.jpg";
import test_6 from "../images/testimonials/test_6.jpg";
import test_7 from "../images/testimonials/test_7.jpg";
import test_8 from "../images/testimonials/test_8.jpg";
import test_9 from "../images/testimonials/test_9.jpg";
import test_10 from "../images/testimonials/test_10.jpg";

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Project Manager, TechWave Solutions",
    testimonial:
      "This scheduling tool has completely streamlined our team meetings. The custom booking links and real-time updates are game changers!",
    image: test_1,
  },
  {
    name: "David Kim",
    role: "CEO, InnovateX",
    testimonial:
      "Managing my calendar used to be a nightmare. Now I just send my custom link and clients book effortlessly. I highly recommend it!",
    image: test_2,
  },
  {
    name: "Priya Sharma",
    role: "Freelance UX Designer",
    testimonial:
      "The time zone adjustment feature is brilliant. My international clients can book slots without any confusion. It’s seamless and easy to use.",
    image: test_3,
  },
  {
    name: "James O’Connor",
    role: "HR Coordinator, Global HR Partners",
    testimonial:
      "Our hiring process is so much smoother now. Candidates can self-schedule interviews, and everything syncs beautifully with our calendars.",
    image: test_4,
  },
  {
    name: "Ava Rodriguez",
    role: "Event Planner, SkyEvents",
    testimonial:
      "I love how intuitive and visually clear the platform is. It’s saved me hours each week when coordinating with vendors and clients.",
    image: test_5,
  },
  {
    name: "Liam Nguyen",
    role: "Software Consultant, CodeCraft",
    testimonial:
      "The ability to manage team availability in one place is exactly what we needed. It keeps our project deadlines on track and our clients happy.",
    image: test_6,
  },
  {
    name: "Emily Carter",
    role: "Marketing Specialist, BrightEdge",
    testimonial:
      "The custom scheduling links have made it so easy for our partners to book demo sessions. It’s professional, simple, and saves tons of back-and-forth emails.",
    image: test_7,
  },
  {
    name: "Carlos Rivera",
    role: "Fitness Coach, FitLine Studio",
    testimonial:
      "My clients love how easy it is to schedule sessions with me now. The platform helps me avoid overbooking and keeps my calendar organized.",
    image: test_8,
  },
  {
    name: "Sophia Lee",
    role: "Academic Counselor, EduPath",
    testimonial:
      "This tool is perfect for managing student appointments across different time zones. It’s user-friendly and has really improved my productivity.",
    image: test_9,
  },
  {
    name: "Michael Brown",
    role: "Photographer, Capture Moments Studio",
    testimonial:
      "Now I can send one link to my clients, and they pick their preferred time without the hassle. My bookings have become faster and more efficient.",
    image: test_10,
  },
];

export const howItWorks = [
  {
    step: "1",
    title: "Sign Up",
    description: "Create your account quickly and easily to get started.",
  },
  {
    step: "2",
    title: "Set Your Availability",
    description:
      "Customize your available time slots and working hours to suit your schedule.",
  },
  {
    step: "3",
    title: "Share Your Link",
    description:
      "Send your personalized booking link to clients, colleagues, or friends.",
  },
  {
    step: "4",
    title: "Get Booked",
    description:
      "Relax as others schedule appointments directly based on your availability.",
  },
];

export const navItems = [
  {
    href : "/dashboard", 
    label : "Dashboard",
    Icon : BarChart
  },
  {
    href : "/events", 
    label : "Events",
    Icon : Calendar
  },
  {
    href : "/meetings", 
    label : "Meetings",
    Icon : Users
  },
  {
    href : "/availability", 
    label : "Availability",
    Icon : Clock
  }
]