'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Lifestyle } from '@/lib/types/user.types';
import userService from '@/services/user.service';
import { useLifestyle } from '@/hooks/use-lifestyle';
import { useLifestyleStore } from '@/stores/lifestyle.store';
import Loading from '@/components/ui/commons/loading';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import {
  AccessNeeds,
  BedTime,
  CleanAfterCooking,
  Cleanliness,
  CookingFrequency,
  Gender,
  GenderComfort,
  GuestFrequency,
  GuestTolerance,
  RoomTemperature,
  SleepEnvironment,
  SmokeFrequency,
  SmokeTolerance,
  StudyInRoom,
  StudyNoise,
  StudyTime,
  WakeTime,
} from '@/lib/types/enums';

const generateOptions = <T extends Record<string, string>>(enumObj: T) =>
  Object.entries(enumObj).map(([, value]) => ({
    label: value,
    value: value,
  }));

const genderComfortOptions = generateOptions(GenderComfort);
const accessNeedsOptions = generateOptions(AccessNeeds);

export default function LifestylePage() {
  const { userId } = useParams<{ userId: string }>();
  const { result, isFetching } = useLifestyle(userId);
  const lifestyle = useLifestyleStore((state) => state.lifestyle);
  const setLifestyle = useLifestyleStore((state) => state.setLifestyle);
  const reset = useLifestyleStore((state) => state.reset);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (isFetching || !result) return;
    if (result.success && result.data?.lifestyle) {
      console.log('Fetched lifestyle:', result.data.lifestyle);
      setLifestyle(result.data.lifestyle);
    }
  }, [isFetching, result, setLifestyle]);

  const updateField = (field: keyof Lifestyle, value: string) => {
    setLifestyle({
      ...lifestyle,
      [field]: value,
    } as Lifestyle);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await userService.createOrEditLifestyle(
      userId,
      lifestyle as Lifestyle
    );

    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ['lifestyle', userId] });
      reset();
      router.push(`/dashboard/${userId}`);
    }
  };
  if (isFetching || !result) return <Loading />;
  if (!result.success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Unable to edit lifestyle form. Please retry next time.
          </h2>
          <button
            onClick={() => router.push('/')}
            className="text-primaryOrange hover:text-orange-600"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="form-h1 font-semibold">Lifestyle Preferences Form</h1>
          <p className="text-lg mb-6 mr-10 ml-10">
            Help us understand your living habits so we can better match you
            with potential sublessees who share your lifestyle. Your responses
            remain private and are only used to suggest compatible housemates.
            None of the questions are required, but the more information you
            provide, the more accurate your matches will be.
          </p>
        </div>

        {/* Identity and Access */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">Identity & Access</div>
        </div>
        <div className="grid gap-8 mb-8">
          <div>
            <h2 className="form-h2 mb-2 mt-2">Gender (self-disclosed)</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(Gender).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.gender === opt.value}
                  onClick={() => updateField('gender', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              Who are you comfortable sharing common spaces or a bathroom with?
            </h2>
            <div className="flex gap-8 items-center pl-6">
              {genderComfortOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer text-lg"
                >
                  <input
                    type="radio"
                    name="genderComfort"
                    value={opt.value}
                    checked={lifestyle?.genderComfort === opt.value}
                    onChange={() => updateField('genderComfort', opt.value)}
                    className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              Would you feel more comfortable living with housemates who are
              familiar with accessibility needs?
            </h2>
            <div className="flex flex-col gap-2 justify-start pl-6">
              {accessNeedsOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer text-lg"
                >
                  <input
                    type="radio"
                    name="accessNeeds"
                    value={opt.value}
                    checked={lifestyle?.accessNeeds === opt.value}
                    onChange={() => updateField('accessNeeds', opt.value)}
                    className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Lifestyle Preferences */}
        <div className="flex flex-col justify-start gap-4 mt-2">
          <div className="text-xl font-semibold">Lifestyle Preferences</div>
        </div>

        {/* Social comfort and shared places */}
        <div className="flex items-center mt-3 mb-3">
          <div className="text-lg font-semibold">Social comfort</div>
        </div>

        <div className="grid gap-8">
          <div>
            <h2 className="form-h2 mb-2">
              How often do you invite guests or host social gatherings?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(GuestFrequency).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.guestFrequency === opt.value}
                  onClick={() => updateField('guestFrequency', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              How do you feel about roommates having guests over?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(GuestTolerance).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.guestTolerance === opt.value}
                  onClick={() => updateField('guestTolerance', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">How often do you smoke?</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(SmokeFrequency).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.smokeFrequency === opt.value}
                  onClick={() => updateField('smokeFrequency', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              How do you feel about roommates smoking?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(SmokeTolerance).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.smokeTolerance === opt.value}
                  onClick={() => updateField('smokeTolerance', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>
        </div>

        {/* Sleep and study habits */}
        <div className="flex items-center mt-8 mb-3">
          <div className="text-lg font-semibold">Sleep and study habits</div>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="form-h2 mb-2">
              When do you usually go to bed on school nights (Sunday-Thursday)?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(BedTime).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.bedTime === opt.value}
                  onClick={() => updateField('bedTime', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              When do you usually wake up on weekdays (whether for class,
              athletic commitments, work, etc.)?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(WakeTime).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.wakeTime === opt.value}
                  onClick={() => updateField('wakeTime', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              What kind of room environment helps you sleep best?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(SleepEnvironment).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.sleepEnvironment === opt.value}
                  onClick={() => updateField('sleepEnvironment', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              Do you prefer studying/working in your room?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(StudyInRoom).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.studyInRoom === opt.value}
                  onClick={() => updateField('studyInRoom', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">When do you usually like to study?</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(StudyTime).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.studyTime === opt.value}
                  onClick={() => updateField('studyTime', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">Do you study with music or TV on?</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(StudyNoise).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.studyNoise === opt.value}
                  onClick={() => updateField('studyNoise', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-8 mb-3">
          <div className="text-lg font-semibold">
            Room/Shared environment and cleanliness
          </div>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="form-h2 mb-2">How do you usually keep your room?</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(Cleanliness).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.cleanliness === opt.value}
                  onClick={() => updateField('cleanliness', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              What room temperature do you prefer?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(RoomTemperature).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.roomTemperature === opt.value}
                  onClick={() => updateField('roomTemperature', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">How often do you cook at home?</h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(CookingFrequency).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.cookingFrequency === opt.value}
                  onClick={() => updateField('cookingFrequency', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>

          <div>
            <h2 className="form-h2 mb-2">
              How do you usually clean up after cooking?
            </h2>
            <div className="flex flex-wrap gap-4">
              {generateOptions(CleanAfterCooking).map((opt) => (
                <SelectionBox
                  key={opt.value}
                  active={lifestyle?.cleanAfterCooking === opt.value}
                  onClick={() => updateField('cleanAfterCooking', opt.value)}
                >
                  {opt.label}
                </SelectionBox>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 mt-8">
          <div className="text-lg text-primaryOrange">
            You can return and update your lifestyle profile anytime from your
            dashboard.
          </div>
          <button type="submit" className="btn-primary w-30 text-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
