import { useMemo, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react";
import brandestinyLogo from "@/assets/brandestiny-footer-logo.png";

type BookingForm = {
  name: string;
  email: string;
  notes: string;
};

const meetingLocation = "Doncaster, UK / Sherman Oaks, USA";
const meetingDuration = 30;
const availableHours = [9, 9.5, 10, 10.5, 11, 11.5, 14, 14.5, 15, 15.5, 16, 16.5];

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDate = (a: Date | null, b: Date) =>
  Boolean(a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());

const formatMonth = (date: Date) => date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });

const formatLongDate = (date: Date | null) =>
  date ? date.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) : "Not selected";

const formatTime = (hour: number, clockMode: "12h" | "24h") => {
  const wholeHour = Math.floor(hour);
  const minutes = hour % 1 === 0 ? "00" : "30";

  if (clockMode === "24h") {
    return `${String(wholeHour).padStart(2, "0")}:${minutes}`;
  }

  const suffix = wholeHour >= 12 ? "pm" : "am";
  const displayHour = wholeHour % 12 || 12;
  return `${displayHour}:${minutes}${suffix}`;
};

const buildCalendarDays = (visibleMonth: Date) => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells: Array<Date | null> = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

export function CalendarWidget() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<number | null>(availableHours[0]);
  const [clockMode, setClockMode] = useState<"12h" | "24h">("24h");
  const [form, setForm] = useState<BookingForm>({ name: "", email: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const selectedTimeLabel = selectedTime === null ? null : formatTime(selectedTime, clockMode);
  const canGoPrevious =
    visibleMonth.getFullYear() > today.getFullYear() || visibleMonth.getMonth() > today.getMonth();
  const canSubmit = Boolean(selectedDate && selectedTimeLabel && form.name.trim() && form.email.trim());

  const isAvailable = (date: Date) => {
    const day = date.getDay();
    return date >= today && day !== 0 && day !== 6;
  };

  const handleMonthChange = (direction: -1 | 1) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
    setSelectedDate(null);
    setSelectedTime(null);
    setSubmitted(false);
  };

  const handleDateSelect = (date: Date) => {
    if (!isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !selectedDate || !selectedTimeLabel) return;

    const subject = encodeURIComponent(`Booking request: ${formatLongDate(selectedDate)} at ${selectedTimeLabel}`);
    const body = encodeURIComponent(
      [
        "New booking request",
        "",
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Date: ${formatLongDate(selectedDate)}`,
        `Time: ${selectedTimeLabel}`,
        `Location: ${meetingLocation}`,
        `Duration: ${meetingDuration} minutes`,
        "",
        "Additional notes:",
        form.notes.trim() || "None",
      ].join("\n"),
    );

    window.location.href = `mailto:info@brandestiny.co?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="flex w-full flex-col bg-[#161616] font-sans text-white transition-all duration-300">
      <div className="flex h-full min-h-[600px] w-full flex-col border-b border-white/10 md:flex-row">
        <div className="flex w-full flex-col border-b border-white/5 p-8 md:w-[320px] md:border-b-0 md:border-r">
          <div className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent">
            <img src={brandestinyLogo} alt="Brandestiny" className="h-12 w-12 object-cover" />
          </div>
          <p className="mb-1 text-[15px] font-semibold text-white/60">Brandestiny Studio</p>
          <h2 className="mb-6 text-[28px] font-bold tracking-tight">30-minute meeting</h2>

          <div className="mb-10 flex-1 text-[15px] leading-relaxed text-white/70">
            <p className="mb-4">Schedule a free intro call with us. We'll:</p>
            <ul className="space-y-1 font-semibold text-white/90">
              <li>- Align on your goals</li>
              <li>- Answer questions</li>
              <li>- Plan next steps</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium text-white/80">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-white/50" />
              <span>{meetingDuration}m</span>
            </div>
            <div className="flex items-center gap-3">
              <Video size={18} className="text-white/50" />
              <span>Google Meet</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="shrink-0 text-white/50" />
              <span>{meetingLocation}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 border-b border-white/5 p-8 md:border-b-0 md:border-r md:p-10">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="text-lg font-bold">{formatMonth(visibleMonth)}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                disabled={!canGoPrevious}
                className="rounded p-1 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} className="text-white/50" />
              </button>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="rounded p-1 transition-colors hover:bg-white/10"
                aria-label="Next month"
              >
                <ChevronRight size={20} className="text-white/50" />
              </button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-7 gap-x-2 gap-y-4 text-center text-[11px] font-bold tracking-wider text-white/50">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          <div className="grid grid-cols-7 gap-x-2 gap-y-2">
            {calendarDays.map((date, index) => {
              const available = date ? isAvailable(date) : false;
              const selected = date ? isSameDate(selectedDate, date) : false;

              return (
                <div key={date?.toISOString() || `empty-${index}`} className="flex aspect-square items-center justify-center">
                  {date ? (
                    <button
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={!available}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border border-transparent text-[15px] font-bold transition-all focus:outline-none ${
                        selected
                          ? "bg-white text-black"
                          : available
                            ? "bg-[#333] text-white hover:bg-[#444]"
                            : "cursor-not-allowed bg-transparent text-white/25"
                      }`}
                      aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                    >
                      {date.getDate()}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex h-[500px] w-full flex-col p-8 md:h-auto md:w-[320px] md:p-10">
          <div className="mb-8 flex h-7 items-center justify-between">
            <h3 className="text-[17px] font-semibold">{selectedDate ? formatDayLabel(selectedDate) : "Select a date"}</h3>
            {selectedDate && (
              <div className="flex gap-3 text-[13px] font-medium text-white/40">
                <button
                  type="button"
                  onClick={() => setClockMode("12h")}
                  className={`transition-colors hover:text-white ${clockMode === "12h" ? "text-white" : ""}`}
                >
                  12h
                </button>
                <button
                  type="button"
                  onClick={() => setClockMode("24h")}
                  className={`transition-colors hover:text-white ${clockMode === "24h" ? "text-white" : ""}`}
                >
                  24h
                </button>
              </div>
            )}
          </div>

          <div className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto pr-2 pb-4">
            {selectedDate ? (
              availableHours.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setSelectedTime(time);
                    setSubmitted(false);
                  }}
                  className={`w-full rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all ${
                    selectedTime === time
                      ? "border-white bg-[#303030] text-white"
                      : "border-white/10 text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {formatTime(time, clockMode)}
                </button>
              ))
            ) : (
              <p className="text-sm text-white/50">Choose an available date to see meeting times.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-[#111] p-8 md:p-14">
        <div className="flex w-full max-w-3xl flex-col gap-12 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-1/3">
            <h4 className="mb-2 text-[18px] font-bold tracking-tight">Booking Details</h4>
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] p-5">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wide text-white/50">Date</span>
                <p className={`mt-1 text-[15px] font-medium ${!selectedDate ? "text-white/40" : ""}`}>
                  {formatLongDate(selectedDate)}
                </p>
              </div>
              <hr className="border-white/5" />
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wide text-white/50">Time</span>
                <p className={`mt-1 text-[15px] font-medium ${!selectedTimeLabel ? "text-white/40" : ""}`}>
                  {selectedTimeLabel ? `${selectedTimeLabel} (${meetingLocation})` : "Not selected"}
                </p>
              </div>
            </div>
          </div>

          <form className="flex flex-1 flex-col gap-6" onSubmit={handleSubmit}>
            <h3 className="text-[24px] font-bold tracking-tight">Enter Details</h3>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">
                Name <span className="text-white/40">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-white/40 focus:bg-[#222]"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">
                Email <span className="text-white/40">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-white/40 focus:bg-[#222]"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-white/90">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className="min-h-[140px] w-full resize-none rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-white/40 focus:bg-[#222]"
                placeholder="Please share anything that will help prepare for our meeting."
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-[#FDE3C6] px-8 py-4 text-[15px] font-bold text-black transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Schedule Call
              </button>
              {!canSubmit && (
                <p className="mt-3 text-sm font-medium text-[#fde3c6]/60">
                  Select a date and time, then enter your name and email to schedule.
                </p>
              )}
              {submitted && (
                <p className="mt-3 text-sm font-medium text-white/70">
                  Your email app has been opened with the booking request.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
