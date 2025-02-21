import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyChecklist from './components/DailyChecklist';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import { getCurrentRamadanDay, isRamadanStarted, getDaysProgress } from './utils/dateUtils';
import { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } from './utils/storage';
import InstallButton from "./components/InstallButton"
function App() {
  const currentDay = getCurrentRamadanDay();
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [data, setData] = useState(loadFromLocalStorage() || {});
  const [showResetModal, setShowResetModal] = useState(false); // State for modal
  const hasRamadanStarted = isRamadanStarted();
  const daysProgress = getDaysProgress();

  useEffect(() => {
    setSelectedDay(currentDay);
  }, [currentDay]);

  const handleResetAll = () => {
    clearLocalStorage();
    setData({});
    setShowResetModal(false); // Close modal
  };

  const handleResetSelectedDay = () => {
    const newData = { ...data };
    delete newData[selectedDay]; // Remove only the selected day’s data
    setData(newData);
    saveToLocalStorage(newData); // Update localStorage
    setShowResetModal(false); // Close modal
  };

  return (
    <div className="min-h-screen bg-[url('/ramadan-bg.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-gradient-to-br from-primary-900/80 to-secondary-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Header currentDay={currentDay} hasStarted={hasRamadanStarted} />
          
          {!hasRamadanStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center bg-white/90 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-secondary-800 mb-4">
                Ramadan 2025 Countdown
              </h2>
              <p className="text-lg text-secondary-600">
                The blessed month of Ramadan will begin on March 1st, 2025.
                <br />
                Prepare yourself for this special time of worship and reflection.
              </p>
             
            </motion.div>
          ) : (
            <>
              <DaySelector
                days={daysProgress}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <DailyChecklist 
                    day={selectedDay} 
                    data={data}
                    setData={setData}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowResetModal(true)} // Open modal
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset Data
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-gray-800">Confirm Reset</h2>
              <p className="text-gray-600 mt-2">
                Would you like to reset only the selected day ({selectedDay}) or all data?
              </p>
              
              <div className="mt-4 flex justify-center gap-4">
                <button 
                  onClick={handleResetSelectedDay}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Reset Selected Day
                </button>
                <button 
                  onClick={handleResetAll}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Reset All
                </button>
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <InstallButton/>
    </div>
  );
}

export default App;
