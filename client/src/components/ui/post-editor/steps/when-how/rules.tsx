'use client';

import { SelectionBox } from '@/components/ui/selection-box/selection-box';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';
import { Rules } from '@/lib/types/post.types';

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

export default function SubleaseFormRules() {
  const { post, setPost} = usePostEditorStore();
  const rules = usePostEditorStore((state) => state.post.rules)

  const handleRuleChange = (field: keyof Rules, value: boolean) => {
    setPost({
        rules: {
            ...post.rules,
            [field]: value,
        }
    })
  };

  const handleQuietHoursChange = (from: string, to: string) => {
    setPost({
        rules:{
            ...post.rules,
            quietHours: {
                from,
                to
            }
        }
    })
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Set rules for your place</div>
      <div className="-mt-5 mb-5">
        Pick what applies. You can always customize and edit after publishing
        your post.
      </div>

      {/* Guest Rules */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Guest Rules</div>
        <div className="flex flex-wrap gap-4">
          <SelectionBox
            active={rules?.noGuest || false}
            onClick={() => handleRuleChange('noGuest', !rules?.noGuest)}
            className={`text-base ml-10 ${rules?.noGuest ? 'font-medium' : 'font-normal'}`}
          >
            No overnight guests
          </SelectionBox>
          <SelectionBox
            active={rules?.noParty || false}
            onClick={() => handleRuleChange('noParty', !rules?.noParty)}
            className={`text-base ml-10 ${rules?.noParty ? 'font-medium' : 'font-normal'}`}
          >
            No parties or large gatherings
          </SelectionBox>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Quiet Hours</div>
        <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400 ">
          <span>From</span>
          <select
            aria-label="Quiet hours from hour"
            value={parseTimeString(rules?.quietHours?.from).hour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              const { minute, ampm } = parseTimeString(rules?.quietHours?.from);
              handleQuietHoursChange(
                formatTimeString(hour, minute, ampm),
                rules?.quietHours?.to || '07:00 AM'
              );
            }}
            className="form-dropdown-box"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            aria-label="Quiet hours from minute"
            value={parseTimeString(rules?.quietHours?.from).minute}
            onChange={(e) => {
              const { hour, ampm } = parseTimeString(rules?.quietHours?.from);
              const minute = e.target.value;
              handleQuietHoursChange(
                formatTimeString(hour, minute, ampm),
                rules?.quietHours?.to || '07:00 AM'
              );
            }}
            className="form-dropdown-box"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            aria-label="Quiet hours from AM/PM"
            value={parseTimeString(rules?.quietHours?.from).ampm}
            onChange={(e) => {
              const { hour, minute } = parseTimeString(rules?.quietHours?.from);
              handleQuietHoursChange(
                formatTimeString(hour, minute, e.target.value),
                rules?.quietHours?.to || '07:00 AM'
              );
            }}
            className="form-dropdown-box"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <span>to</span>
          <select
            aria-label="Quiet hours to hour"
            value={parseTimeString(rules?.quietHours?.to).hour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              const { minute, ampm } = parseTimeString(rules?.quietHours?.to);
              handleQuietHoursChange(
                rules?.quietHours?.from || '10:00 PM',
                formatTimeString(hour, minute, ampm)
              );
            }}
            className="form-dropdown-box"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          :
          <select
            aria-label="Quiet hours to minute"
            value={parseTimeString(rules?.quietHours?.to).minute}
            onChange={(e) => {
              const { hour, ampm } = parseTimeString(rules?.quietHours?.to);
              const minute = e.target.value;
              handleQuietHoursChange(
                rules?.quietHours?.from || '10:00 PM',
                formatTimeString(hour, minute, ampm)
              );
            }}
            className="form-dropdown-box"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            aria-label="Quiet hours to AM/PM"
            value={parseTimeString(rules?.quietHours?.to).ampm}
            onChange={(e) => {
              const { hour, minute } = parseTimeString(rules?.quietHours?.to);
              handleQuietHoursChange(
                rules?.quietHours?.from || '10:00 PM',
                formatTimeString(hour, minute, e.target.value)
              );
            }}
            className="form-dropdown-box"
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lifestyle Rules */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Lifestyle Rules</div>
        <div className="flex flex-wrap gap-4">
          <SelectionBox
            active={rules?.noSmoking || false}
            onClick={() => handleRuleChange('noSmoking', !rules?.noSmoking)}
            className={`text-base ml-10 ${rules?.noSmoking ? 'font-medium' : 'font-normal'}`}
          >
            No smoking
          </SelectionBox>
          <SelectionBox
            active={rules?.noDrug || false}
            onClick={() => handleRuleChange('noDrug', !rules?.noDrug)}
            className={`text-base ml-10 ${rules?.noDrug ? 'font-medium' : 'font-normal'}`}
          >
            No recreational drugs
          </SelectionBox>
          <SelectionBox
            active={rules?.noPet || false}
            onClick={() => handleRuleChange('noPet', !rules?.noPet)}
            className={`text-base ml-10 ${rules?.noPet ? 'font-medium' : 'font-normal'}`}
          >
            No pets allowed
          </SelectionBox>
        </div>
      </div>

    </div>
  );
}
