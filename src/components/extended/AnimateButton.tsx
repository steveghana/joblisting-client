import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// third-party
import { motion, useCycle } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //
interface IAnimate {
  children: React.ReactNode;
  offset?: number;
  type?: 'slide' | 'scale' | 'rotate' | 'bellShake';
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number | Record<any, any>;
}
const AnimateButton: React.FC<IAnimate> = forwardRef(({ children, type, direction, offset, scale }, ref: Ref<HTMLDivElement>) => {
  let offset1;
  let offset2;
  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {
    case 'rotate':
      return (
        <motion.div
          // ref={ref}
          ref={ref}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2,
            repeatDelay: 0,
          }}
        >
          {children}
        </motion.div>
      );
    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <motion.div ref={ref} animate={{ y: y !== undefined ? y : '' }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}>
            {children}
          </motion.div>
        );
      }
      return (
        <motion.div ref={ref} animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
          {children}
        </motion.div>
      );
    case 'bellShake':
      return (
        <motion.div
          ref={ref}
          animate={{
            rotate: [0, -15, 15, -10, 10, -5, 5, 0],
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          whileHover={{ scale: 1.2 }}
        >
          {children}
        </motion.div>
      );

    case 'scale':
    default:
      if (typeof scale === 'number') {
        scale = {
          hover: scale,
          tap: scale,
        };
      }
      return (
        <motion.div ref={ref} whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
          {children}
        </motion.div>
      );
  }
});

AnimateButton.defaultProps = {
  type: 'scale',
  offset: 10,
  direction: 'right',
  scale: {
    hover: 1,
    tap: 0.9,
  },
};

export default AnimateButton;
