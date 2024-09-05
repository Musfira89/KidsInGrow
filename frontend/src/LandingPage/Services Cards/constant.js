import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ChatIcon from '@mui/icons-material/Chat';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';

const servicesData = [
  {
    id: 1,
    title: "Self Assessment",
    description: "Self access your child’s social skills, communication, and development at home.",
    icon: AssessmentIcon,  // Notice no JSX here
  },
  {
    id: 2,
    title: "Track Progress",
    description: "Monitors your child’s development over time.",
    icon: TimelineIcon,
  },
  {
    id: 3,
    title: "Real Time Feedback",
    description: "Get real-time feedback.",
    icon: FeedbackIcon,
  },
  {
    id: 4,
    title: "Virtual Chatbot",
    description: "Ask queries and seek guidance.",
    icon: ChatIcon,
  },
  {
    id: 5,
    title: "Personalized Insights",
    description: "Get feedback & recommendations based on your input.",
    icon: InsightsIcon,
  },
  {
    id: 6,
    title: "Visual Representation",
    description: "See your child's progress over time through graphs.",
    icon: BarChartIcon,
  },
];

export default servicesData;
