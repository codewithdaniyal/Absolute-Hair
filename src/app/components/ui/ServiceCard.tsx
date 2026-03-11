import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Service } from '../../../types/database';
import { formatPrice, formatDuration } from '../../../lib/utils';
import { fadeUp } from '../../../lib/animations';

interface ServiceCardProps {
  service: Service;
  onSelect: () => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative bg-white/[0.04] border border-white/10 rounded-[4px] p-6 transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-['Raleway'] font-light text-white">
              {service.name}
            </h3>
            {service.description && (
              <p className="text-sm text-white/45 font-['DM_Sans']">
                {service.description}
              </p>
            )}
          </div>
          <div className="text-right space-y-1">
            {service.originalPrice && (
              <div className="text-sm text-white/30 line-through font-['Raleway']">
                {formatPrice(service.originalPrice)}
              </div>
            )}
            <div className="text-xl font-['Raleway'] font-semibold text-white">
              {formatPrice(service.price)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock className="w-4 h-4" />
            <span className="font-['DM_Sans']">{formatDuration(service.durationMinutes)}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="px-5 py-2 border border-white/30 text-white font-['Raleway'] text-sm rounded-[4px] transition-all duration-200 hover:bg-white hover:text-black"
          >
            Select
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
