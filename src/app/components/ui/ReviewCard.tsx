import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Review } from '../../../types/database';
import { formatDate, getInitials } from '../../../lib/utils';
import { fadeUp } from '../../../lib/animations';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/[0.04] border border-white/10 rounded-[4px] p-6 space-y-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-sm font-['Raleway'] text-white flex-shrink-0">
          {getInitials(review.customerName || 'Anonymous')}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-['Raleway'] font-light text-white">
                {review.customerName || 'Anonymous'}
              </h4>
              <p className="text-sm text-white/45 font-['DM_Sans']">
                {formatDate(review.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-white text-white'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {review.stylistName && (
            <div className="text-sm text-white/60 font-['DM_Sans']">
              Styled by {review.stylistName} · {review.serviceName}
            </div>
          )}
          
          <p className="text-white/90 leading-relaxed font-['DM_Sans'] font-light">
            {review.body}
          </p>
          
          {review.venueReply && (
            <div className="mt-4 pl-4 border-l-2 border-white/20 space-y-1">
              <div className="text-sm font-['Raleway'] font-light text-white">
                Response from Absolute Hair
              </div>
              <p className="text-sm text-white/70 italic font-['DM_Sans']">
                {review.venueReply}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
