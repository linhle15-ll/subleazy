'use client';

import { useState } from 'react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';

const guestOptions = [
  'No overnight guests',
  'Guests allowed with prior notice',
  'No parties or large gatherings',
  'No loud music or noise',
];

const lifestyleOptions = [
  'No smoking',
  'Smoking allowed only outside and designated areas',
  'No alcohol allowed',
  'No recreational drugs',
];

const cleanlinessOptions = [
  'Keep shared areas clean',
  'Take out trash regularly',
  "Respect others' privacy",
];

const petOptions = ['No pets allowed', 'Pets allowed with approval'];

const utilitiesOptions = [
  'Shared fridge place only',
  'Economical use of showers and water',
  'Economical use of electricity (lights, AC, etc)',
  'Limit on laundry use',
];

const safetyOptions = [
  'Report issues immediately',
  'Do not tamper with locks/security',
  'Keep door locked when leaving',
];

const moveOptions = [
  'Return keys at the end of stay',
  'Leave room in original condition',
];

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ['00', '15', '30', '45'];
const ampm = ['AM', 'PM'];

// function getTimeValue(hour: number, minute: string, ampmVal: string) {
//   let h = hour % 12;
//   if (ampmVal === 'PM') h += 12;
//   return h * 60 + parseInt(minute, 10);
// }

export default function SubleaseStep13() {
  // State for toggles
  const [guests, setGuests] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [cleanliness, setCleanliness] = useState<string[]>([]);
  const [pets, setPets] = useState<string>('');
  const [utilities, setUtilities] = useState<string[]>([]);
  const [safety, setSafety] = useState<string[]>([]);
  const [move, setMove] = useState<string[]>([]);

  // Quiet hours state
  const [quietFromHour, setQuietFromHour] = useState(10);
  const [quietFromMinute, setQuietFromMinute] = useState('00');
  const [quietFromAMPM, setQuietFromAMPM] = useState('PM');
  const [quietToHour, setQuietToHour] = useState(7);
  const [quietToMinute, setQuietToMinute] = useState('00');
  const [quietToAMPM, setQuietToAMPM] = useState('AM');

  // Check-in/out state
  const [checkInHour, setCheckInHour] = useState(3);
  const [checkInMinute, setCheckInMinute] = useState('00');
  const [checkInAMPM, setCheckInAMPM] = useState('PM');
  const [checkOutHour, setCheckOutHour] = useState(11);
  const [checkOutMinute, setCheckOutMinute] = useState('00');
  const [checkOutAMPM, setCheckOutAMPM] = useState('AM');

  // Logic for time validation
  // const quietFromValue = getTimeValue(
  //   quietFromHour,
  //   quietFromMinute,
  //   quietFromAMPM
  // );
  // const quietToValue = getTimeValue(quietToHour, quietToMinute, quietToAMPM);
  // // const isQuietInvalid = quietToValue <= quietFromValue;

  // const checkInValue = getTimeValue(checkInHour, checkInMinute, checkInAMPM);
  // const checkOutValue = getTimeValue(
  //   checkOutHour,
  //   checkOutMinute,
  //   checkOutAMPM
  // );
  // const isCheckInvalid = checkOutValue <= checkInValue;

  // Toggle helpers
  const toggle = (
    arr: string[],
    setArr: (v: string[]) => void,
    value: string
  ) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    );
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">3</div>
        <div className="form-h1">Review and publish</div>
      </div>
      <div className="form-h2">Set rules for your place</div>
      <div className="text-gray-400 text-sm mb-8 -mt-5">
        Pick what applies. You can always customize and edit after publishing
        your post.
      </div>

      {/* Guests & Socialize */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Guests & Socialize</div>
        <div className="flex flex-wrap gap-4 mb-4">
          {guestOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={guests.includes(opt)}
              onClick={() => toggle(guests, setGuests, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
          <span>Quiet hours</span>
          <select
            value={quietFromHour}
            onChange={(e) => setQuietFromHour(Number(e.target.value))}
            className="form-dropdown-box"
            title="Quiet hours from hour"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            value={quietFromMinute}
            onChange={(e) => setQuietFromMinute(e.target.value)}
            className="form-dropdown-box"
            title="Quiet hours from minute"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={quietFromAMPM}
            onChange={(e) => setQuietFromAMPM(e.target.value)}
            className="form-dropdown-box"
            title="Quiet hours from AM/PM"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <span>to</span>
          <select
            value={quietToHour}
            onChange={(e) => setQuietToHour(Number(e.target.value))}
            className="form-dropdown-box"
            title="Quiet hours to hour"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            value={quietToMinute}
            onChange={(e) => setQuietToMinute(e.target.value)}
            className="form-dropdown-box"
            title="Quiet hours to minute"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={quietToAMPM}
            onChange={(e) => setQuietToAMPM(e.target.value)}
            className="form-dropdown-box"
            title="Quiet hours to AM/PM"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Lifestyle</div>
        <div className="flex flex-wrap gap-4">
          {lifestyleOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={lifestyle.includes(opt)}
              onClick={() => toggle(lifestyle, setLifestyle, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      {/* Cleanliness & Shared Places */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">
          Cleanliness & Shared Places
        </div>
        <div className="flex flex-wrap gap-4">
          {cleanlinessOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={cleanliness.includes(opt)}
              onClick={() => toggle(cleanliness, setCleanliness, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      {/* Pets */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Pets</div>
        <div className="flex flex-wrap gap-4">
          {petOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={pets === opt}
              onClick={() => setPets(opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      {/* Utilities & Appliances */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Utilities & Appliances</div>
        <div className="flex flex-wrap gap-4">
          {utilitiesOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={utilities.includes(opt)}
              onClick={() => toggle(utilities, setUtilities, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      {/* Safety & Maintenance */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Safety & Maintenance</div>
        <div className="flex flex-wrap gap-4">
          {safetyOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={safety.includes(opt)}
              onClick={() => toggle(safety, setSafety, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      {/* Move-in/Move-out */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="font-medium text-lg mb-2">Move-in/Move-out</div>
        <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
          <span>Check-in time</span>
          <select
            value={checkInHour}
            onChange={(e) => setCheckInHour(Number(e.target.value))}
            className="form-dropdown-box"
            title="Check-in hour"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            value={checkInMinute}
            onChange={(e) => setCheckInMinute(e.target.value)}
            className="form-dropdown-box"
            title="Check-in minute"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={checkInAMPM}
            onChange={(e) => setCheckInAMPM(e.target.value)}
            className="form-dropdown-box"
            title="Check-in AM/PM"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <span>Check-out time</span>
          <select
            value={checkOutHour}
            onChange={(e) => setCheckOutHour(Number(e.target.value))}
            className="form-dropdown-box"
            title="Check-out hour"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            value={checkOutMinute}
            onChange={(e) => setCheckOutMinute(e.target.value)}
            className="form-dropdown-box"
            title="Check-out minute"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={checkOutAMPM}
            onChange={(e) => setCheckOutAMPM(e.target.value)}
            className="form-dropdown-box"
            title="Check-out AM/PM"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {moveOptions.map((opt) => (
            <SelectionBox
              key={opt}
              active={move.includes(opt)}
              onClick={() => toggle(move, setMove, opt)}
            >
              {opt}
            </SelectionBox>
          ))}
        </div>
      </div>

      <ProgressBar
        currentStep={12}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-12',
            variant: 'secondary',
          },
          {
            text: 'Review and post',
            url: '/sublease/review',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
