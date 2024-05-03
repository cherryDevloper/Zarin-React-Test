import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import '../index.css';
interface Props {
  children: ReactNode;
}
const GlassMorphismBackground = ({ children }: Props) => {
  return (
    <motion.div
      className={'glassMorphismContainer w-screen h-screen'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphismBackground;
