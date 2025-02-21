import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, LockClosedIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

function DaySelector({ days, selectedDay, setSelectedDay }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentDayData = days.find(({ isCurrent }) => isCurrent);

  return (
    <div className="mt-8">
      <div className="bg-white/90 rounded-2xl shadow-lg py-2 px-3">
        {/* Header with Expand/Collapse Toggle */}
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-medium text-secondary-800">
              Ramadan Journal
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-secondary-800" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-secondary-800" />
          )}
        </div>

        {/* Display Current Day when collapsed */}
        {!isExpanded && currentDayData && (
          <div className="mt-4 text-center text-lg font-medium text-secondary-700">
            Ramadan Day <span className="text-primary-600">Day {currentDayData.day}</span>
          </div>
        )}

        {/* Expandable Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              transition={{ duration: 0.3 }} 
              className="mt-4 overflow-hidden"
            >
              <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                {days.map(({ day, isAccessible, isCurrent }) => (
                  <button
                    key={day}
                    onClick={() => isAccessible && setSelectedDay(day)}
                    disabled={!isAccessible}
                    className={`relative p-3 rounded-lg border transition-all
                      ${isAccessible 
                        ? day === selectedDay
                          ? 'bg-primary-100 border-primary-300 ring-2 ring-primary-500'
                          : 'hover:bg-gray-100 border-gray-200'
                        : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="text-sm font-medium">
                      Day {day}
                    </span>

                    {!isAccessible && (
                      <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-1 right-1" />
                    )}
                    
                    {isAccessible && day !== selectedDay && (
                      <CheckCircleIcon className="h-4 w-4 text-primary-600 absolute top-1 right-1" />
                    )}
                    
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-lg ring-2 ring-yellow-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DaySelector;
