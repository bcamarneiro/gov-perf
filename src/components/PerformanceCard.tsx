import { motion } from 'framer-motion';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  icon: React.ReactNode;
  score: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  delay: number;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  icon,
  score,
  trend,
  description,
  delay,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-neutral-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-neutral-50 rounded-lg">{icon}</div>
        <div className="flex items-center gap-1">
          <span className="font-medium">{score}%</span>
          {getTrendIcon()}
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </motion.div>
  );
};

export default PerformanceCard;
