import { motion } from 'motion/react';
import { Stylist } from '../../../types/database';
import { fadeUp } from '../../../lib/animations';

interface StylistCardProps {
  stylist: Stylist;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
}

export function StylistCard({ stylist, isSelected, onSelect, onClick }: StylistCardProps) {
  const handleClick = () => {
    if (onSelect) onSelect();
    if (onClick) onClick();
  };

  return (
    <motion.div
      variants={fadeUp}
      onClick={handleClick}
      className={`group flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
        onSelect ? 'min-w-[140px]' : 'min-w-[120px]'
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative mb-3 ${
          isSelected 
            ? 'ring-2 ring-white ring-offset-4 ring-offset-[#0D0D0D] rounded-full' 
            : ''
        }`}
      >
        <div 
          className={`w-24 h-24 rounded-full border ${
            isSelected ? 'border-white bg-white/10' : 'border-white/30'
          } overflow-hidden transition-all duration-200`}
        >
          <img 
            src={stylist.avatarUrl} 
            alt={stylist.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      
      <h4 className="font-['Raleway'] font-light text-white mb-1">
        {stylist.name}
      </h4>
      <p className="text-sm text-white/60 font-['DM_Sans']">
        {stylist.role}
      </p>
    </motion.div>
  );
}
