import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  glow = false,
  padding = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      onClick={onClick}
      className={`
        glass rounded-2xl
        ${padding ? 'p-6' : ''}
        ${hover ? 'cursor-pointer transition-all duration-300' : ''}
        ${glow ? 'glow-green-sm' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
