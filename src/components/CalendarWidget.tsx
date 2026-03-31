import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, Globe } from "lucide-react";

export function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = 30;
  const startDayOfWeek = 3; // Assume Wednesday is the 1st
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - startDayOfWeek + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const timeSlots = [
    "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", 
    "7:00pm", "7:30pm", "8:00pm", "8:30pm"
  ];

  return (
    <div className="flex flex-col w-full bg-[#161616] text-white font-sans transition-all duration-300">
      
      {/* Top Section: Calendar Layout */}
      <div className="flex flex-col md:flex-row w-full h-full min-h-[600px] border-b border-white/10">
        
        {/* Left Column: Details */}
        <div className="w-full md:w-[320px] p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
          <div className="w-10 h-10 rounded-full overflow-hidden mb-5 bg-white/10">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-white/60 text-[15px] font-semibold mb-1">Brandestiny Studio</p>
          <h2 className="text-[28px] font-bold mb-6 tracking-tight">30-minute meeting</h2>
          
          <div className="text-white/70 text-[15px] leading-relaxed mb-10 flex-1">
            <p className="mb-4">Schedule a free intro call with us. We'll:</p>
            <ul className="space-y-1 font-semibold text-white/90">
              <li>– Align on your goals</li>
              <li>– Answer questions</li>
              <li>– Plan next steps</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-white/50" />
              <span>30m</span>
            </div>
            <div className="flex items-center gap-3">
              <Video size={18} className="text-white/50" />
              <span>Google Meet</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-white/50" />
              <span>Asia/Karachi</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Calendar */}
        <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold">April 2026</h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-white/10 rounded transition-colors"><ChevronLeft size={20} className="text-white/50" /></button>
              <button className="p-1 hover:bg-white/10 rounded transition-colors"><ChevronRight size={20} className="text-white/50" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[11px] font-bold tracking-wider text-white/50 mb-6">
            <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
          </div>

          <div className="grid grid-cols-7 gap-y-2 gap-x-2">
            {calendarDays.map((day, i) => (
              <div key={i} className="aspect-square flex items-center justify-center">
                {day ? (
                  <button
                    onClick={() => setSelectedDate(day)}
                    className={`w-11 h-11 rounded-lg font-bold text-[15px] transition-all focus:outline-none flex items-center justify-center border border-transparent
                      ${selectedDate === day 
                        ? "bg-white text-black" 
                        : day < 15 && day > 5 ? "bg-[#333] hover:bg-[#444] text-white" : "bg-transparent text-white/40 hover:bg-white/5"}
                    `}
                  >
                    {day}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Time Slots */}
        <div className="w-full md:w-[320px] p-8 md:p-10 flex flex-col h-[500px] md:h-auto">
          <div className="flex justify-between items-center mb-8 h-7">
            <h3 className="text-[17px] font-semibold">{selectedDate ? `Wed 0${selectedDate}` : "Select a date"}</h3>
            {selectedDate && (
              <div className="text-[13px] text-white/40 font-medium flex gap-3">
                <button className="hover:text-white transition-colors">12h</button>
                <button className="text-white">24h</button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-full py-3.5 px-4 rounded-xl font-medium text-[15px] text-left transition-all border
                  ${selectedTime === time 
                    ? "border-black bg-[#303030] text-white" 
                    : "border-white/10 text-white hover:border-white/30 hover:bg-white/5"}
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Booking Form */}
      <div className="p-8 md:p-14 flex flex-col items-center bg-[#111]">
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-12">
          
          {/* Booking Summary Info */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h4 className="text-[18px] font-bold tracking-tight mb-2">Booking Details</h4>
            <div className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex flex-col gap-3">
              <div>
                <span className="text-white/50 text-[12px] uppercase tracking-wide font-bold">Date</span>
                <p className="text-[15px] font-medium mt-1">
                  {selectedDate ? `Wednesday, April 0${selectedDate}, 2026` : "Not selected"}
                </p>
              </div>
              <hr className="border-white/5" />
              <div>
                <span className="text-white/50 text-[12px] uppercase tracking-wide font-bold">Time</span>
                <p className={`text-[15px] font-medium mt-1 ${!selectedTime && 'text-white/40'}`}>
                  {selectedTime ? `${selectedTime} (Asia/Karachi)` : "Not selected"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="flex-1 flex flex-col gap-6" onSubmit={(e) => {
            e.preventDefault();
            alert("This is a functional prototype! In a real app, this would submit the event.");
          }}>
            <h3 className="text-[24px] font-bold tracking-tight">Enter Details</h3>
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">Name <span className="text-white/40">*</span></label>
              <input 
                type="text" 
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-white/40 focus:bg-[#222] transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">Email <span className="text-white/40">*</span></label>
              <input 
                type="email" 
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-white/40 focus:bg-[#222] transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">Additional Notes</label>
              <textarea 
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-white/40 focus:bg-[#222] transition-colors min-h-[140px] resize-none"
                placeholder="Please share anything that will help prepare for our meeting."
              />
            </div>

            <div className="mt-4">
              <button 
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="bg-[#FDE3C6] text-black text-[15px] font-bold py-4 px-8 rounded-xl hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Event
              </button>
              {(!selectedDate || !selectedTime) && (
                <p className="text-[#fde3c6]/60 text-sm mt-3 font-medium">Please select a date and time from the calendar above to schedule.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
