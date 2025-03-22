import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-neutral-50">
      <div className="container px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-light mb-6 tracking-tight"
          >
            Tracking Parliamentary Performance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed"
          >
            A comprehensive platform for monitoring and analyzing parliamentary
            activities, making governance data accessible to everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              to="/initiatives"
              className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              View Initiatives
            </Link>
            <Link
              to="/parliament"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              Explore Parliament
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
