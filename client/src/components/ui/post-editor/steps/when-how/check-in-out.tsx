'use client';

import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ['00', '15', '30', '45'];
const ampm = ['AM', 'PM'];

function formatTimeString(
  hour: number,
  minute: string,
  ampmVal: string
): string {
  return `${hour.toString().padStart(2, '0')}:${minute} ${ampmVal}`;
}

function parseTimeString(timeStr: string | undefined): {
  hour: number;
  minute: string;
  ampm: string;
} {
  if (!timeStr) return { hour: 12, minute: '00', ampm: 'AM' };

  // Split only on the first space to get time and AM/PM
  const [time, ampm] = timeStr.split(' ');
  const [hour, minute] = time.split(':');

  return {
    hour: parseInt(hour),
    minute: minute || '00',
    ampm: ampm || 'AM',
  };
}

export default function SubleaseFormTime() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setCheckTime } = usePostSetters(setPost);
  const availability = post.availability || {};

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Check-In & Check-Out Time</div>
      <div className="-mt-5 mb-8">
        Guests should check-in before and check-out after the time you selected.
      </div>

      {/* Check-in Time */}
      <div className="flex flex-row items-center justify-center gap-4 w-full h-28 mb-6 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
        <span className="font-medium text-lg mb-2">Check-in time</span>
        <select
          aria-label="Check-in hour"
          value={parseTimeString(availability?.checkinTime).hour}
          onChange={(e) => {
            const hour = Number(e.target.value);
            const { minute, ampm } = parseTimeString(availability?.checkinTime);
            setCheckTime('checkinTime', formatTimeString(hour, minute, ampm));
          }}
          className="form-dropdown-box"
          required
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        :
        <select
          aria-label="Check-in minute"
          value={parseTimeString(availability?.checkinTime).minute}
          onChange={(e) => {
            const { hour, ampm } = parseTimeString(availability?.checkinTime);
            const minute = e.target.value;
            setCheckTime('checkinTime', formatTimeString(hour, minute, ampm));
          }}
          className="form-dropdown-box"
          required
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          aria-label="Check-in AM/PM"
          value={parseTimeString(availability?.checkinTime).ampm}
          onChange={(e) => {
            const { hour, minute } = parseTimeString(availability?.checkinTime);
            setCheckTime(
              'checkinTime',
              formatTimeString(hour, minute, e.target.value)
            );
          }}
          className="form-dropdown-box"
          required
        >
          {ampm.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Check-out Time */}
      <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
        <span>Check-out time</span>
        <select
          aria-label="Check-out hour"
          value={parseTimeString(availability?.checkoutTime).hour}
          onChange={(e) => {
            const hour = Number(e.target.value);
            const { minute, ampm } = parseTimeString(
              availability?.checkoutTime
            );
            setCheckTime('checkoutTime', formatTimeString(hour, minute, ampm));
          }}
          className="form-dropdown-box"
          required
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        :
        <select
          aria-label="Check-out minute"
          value={parseTimeString(availability?.checkoutTime).minute}
          onChange={(e) => {
            const { hour, ampm } = parseTimeString(availability?.checkoutTime);
            const minute = e.target.value;
            setCheckTime('checkoutTime', formatTimeString(hour, minute, ampm));
          }}
          className="form-dropdown-box"
          required
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          aria-label="Check-out AM/PM"
          value={parseTimeString(availability?.checkoutTime).ampm}
          onChange={(e) => {
            const { hour, minute } = parseTimeString(
              availability?.checkoutTime
            );
            setCheckTime(
              'checkoutTime',
              formatTimeString(hour, minute, e.target.value)
            );
          }}
          className="form-dropdown-box"
          required
        >
          {ampm.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
