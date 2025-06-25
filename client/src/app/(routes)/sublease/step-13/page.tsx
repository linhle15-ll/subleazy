'use client';

import { useRouter } from 'next/navigation';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { Button } from '@/components/ui/button';
import { usePostCreateStore } from '@/stores/post-create.store';
import { Post } from '@/lib/types/post.types';
import { DatePickerButton } from '@/components/ui/date/date-picker';
import postService from '@/services/post.service';
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

export default function SubleaseStep13() {
  const router = useRouter();
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);
  const { setRules, setQuietHours, setDate, setCheckTime } =
    usePostSetters(setPost);
  const { rules, availability } = post;

  const handleSubmit = async () => {
    const res = await postService.createPost(post as Partial<Post>);
    if (res.success) {
      setPost({});
      router.push('/sublease/success');
    }
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

      {/* Guest Rules */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Guest Rules</div>
        <div className="flex flex-wrap gap-4">
          <SelectionBox
            active={rules?.noGuest || false}
            onClick={() => setRules('noGuest')}
          >
            No overnight guests
          </SelectionBox>
          <SelectionBox
            active={rules?.noParty || false}
            onClick={() => setRules('noParty')}
          >
            No parties or large gatherings
          </SelectionBox>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Quiet Hours</div>
        <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
          <span>From</span>
          <select
            aria-label="Quiet hours from hour"
            value={parseTimeString(rules?.quietHours?.from).hour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              const { minute, ampm } = parseTimeString(rules?.quietHours?.from);
              setQuietHours(
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
              setQuietHours(
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
              setQuietHours(
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
              setQuietHours(
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
              setQuietHours(
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
              setQuietHours(
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
            onClick={() => setRules('noSmoking')}
          >
            No smoking
          </SelectionBox>
          <SelectionBox
            active={rules?.noDrug || false}
            onClick={() => setRules('noDrug')}
          >
            No recreational drugs
          </SelectionBox>
          <SelectionBox
            active={rules?.noPet || false}
            onClick={() => setRules('noPet')}
          >
            No pets allowed
          </SelectionBox>
        </div>
      </div>

      {/* Move-in/Move-out */}
      <div className="mb-6">
        <div className="font-medium text-lg mb-2">Move-in/Move-out</div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full mb-4">
          <DatePickerButton
            text="Move-in date"
            date={availability?.startDate as Date}
            setDate={(date) => setDate('startDate', date)}
            className="flex-grow h-28 border-2 rounded-xl text-lg text-center font-medium border-gray-400"
          />
          <DatePickerButton
            text="Move-out date"
            date={availability?.endDate as Date}
            setDate={(date) => setDate('endDate', date)}
            className="flex-grow h-28 border-2 rounded-xl text-lg text-center font-medium border-gray-400"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
          <span>Check-in time</span>
          <select
            aria-label="Check-in hour"
            value={parseTimeString(availability?.checkinTime).hour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              const { minute, ampm } = parseTimeString(
                availability?.checkinTime
              );
              setCheckTime('checkinTime', formatTimeString(hour, minute, ampm));
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
            aria-label="Check-in minute"
            value={parseTimeString(availability?.checkinTime).minute}
            onChange={(e) => {
              const { hour, ampm } = parseTimeString(availability?.checkinTime);
              const minute = e.target.value;
              setCheckTime('checkinTime', formatTimeString(hour, minute, ampm));
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
            aria-label="Check-in AM/PM"
            value={parseTimeString(availability?.checkinTime).ampm}
            onChange={(e) => {
              const { hour, minute } = parseTimeString(
                availability?.checkinTime
              );
              setCheckTime(
                'checkinTime',
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
          <span>Check-out time</span>
          <select
            aria-label="Check-out hour"
            value={parseTimeString(availability?.checkoutTime).hour}
            onChange={(e) => {
              const hour = Number(e.target.value);
              const { minute, ampm } = parseTimeString(
                availability?.checkoutTime
              );
              setCheckTime(
                'checkoutTime',
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
            aria-label="Check-out minute"
            value={parseTimeString(availability?.checkoutTime).minute}
            onChange={(e) => {
              const { hour, ampm } = parseTimeString(
                availability?.checkoutTime
              );
              const minute = e.target.value;
              setCheckTime(
                'checkoutTime',
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
          >
            {ampm.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-8">
        <div className="flex flex-col w-[80%] gap-2">
          <span className="text-gray-500 text-sm">Step 12 of 12</span>
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primaryOrange transition-all duration-300 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 ml-16">
          <Button
            className="w-40 btn-secondary text-center rounded-xl"
            onClick={() => router.push('/sublease/step-12')}
          >
            Back
          </Button>
          <Button
            className="w-40 btn-primary text-center rounded-xl"
            onClick={handleSubmit}
          >
            Review and post
          </Button>
        </div>
      </div>
    </div>
  );
}
