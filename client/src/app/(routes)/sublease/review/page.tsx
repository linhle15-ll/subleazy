'use client';

import { useRouter } from 'next/navigation';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { Button } from '@/components/ui/button';
import { usePostCreateStore } from '@/stores/post-create.store';
import postService from '@/services/post.service';
import { Post } from '@/lib/types/post.types';
import { Play } from 'lucide-react';

export default function SubleaseReview() {
  const router = useRouter();
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const handleSubmit = async () => {
    const res = await postService.createPost(post as Partial<Post>);
    if (res.success) {
      setPost({});
      router.push('/sublease/success');
    }
  };

  // Helper to check if an object has at least one truthy value
  const hasData = (obj?: Record<string, unknown>) =>
    obj &&
    Object.values(obj).some(
      (v) =>
        v !== undefined &&
        v !== null &&
        v !== false &&
        v !== '' &&
        (!Array.isArray(v) || v.length > 0)
    );

  // Helper to check if a value is not empty
  const notEmpty = (val: unknown) =>
    val !== undefined &&
    val !== null &&
    val !== '' &&
    (!Array.isArray(val) || val.length > 0);

  // Helper to render boolean fields as Yes/No
  const renderBool = (val?: boolean) => (val ? 'Yes' : 'No');
  // Helper to render array fields
  const renderArray = (arr?: string[]) =>
    arr && arr.length > 0 ? arr.join(', ') : '-';

  // Helper to render date safely
  const renderDate = (date: unknown) => {
    if (!date) return '-';
    try {
      const d = new Date(date as string);
      return isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
    } catch {
      return '-';
    }
  };

  // Helper to check if a URL is a video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|mov|webm|avi|mkv)$/i);
  };

  // Helper to convert field names to user-friendly display names
  const getDisplayName = (fieldName: string): string => {
    const displayNames: Record<string, string> = {
      // General fields
      title: 'Title',
      description: 'Description',
      address: 'Address',
      city: 'City',
      state: 'State',
      zip: 'Zip Code',
      price: 'Price',
      minPrice: 'Minimum Price',
      maxPrice: 'Maximum Price',

      // House info
      houseType: 'House Type',
      placeType: 'Place Type',

      // Bedroom info
      bedrooms: 'Bedrooms',
      beds: 'Beds',
      maxGuests: 'Maximum Guests',
      lock: 'Bedroom Lock',

      // Bathroom info
      privateAttached: 'Private Attached',
      privateAccessible: 'Private Accessible',
      shared: 'Shared',

      // Availability
      startDate: 'Move-in Date',
      endDate: 'Move-out Date',
      checkinTime: 'Check-in Time',
      checkoutTime: 'Check-out Time',

      // Amenities
      wifi: 'Wi-Fi',
      kitchen: 'Kitchen',
      laundry: 'Laundry',
      parking: 'Parking',
      airConditioning: 'Air Conditioning',

      // Convenience
      publicTransport: 'Public Transport',
      supermarket: 'Supermarket',
      disabilityFriendly: 'Disability Friendly',

      // Rules
      noGuest: 'No Guests',
      noParty: 'No Parties',
      noSmoking: 'No Smoking',
      noDrug: 'No Drugs',
      noPet: 'No Pets',
      quietHours: 'Quiet Hours',
    };

    return displayNames[fieldName] || fieldName;
  };

  // Helper to format enum values for display
  const formatEnumValue = (value: string | undefined): string => {
    if (!value) return '-';

    // Handle common enum formatting
    const formatted = value
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();

    return formatted;
  };

  // Helper to render media
  const renderMedia = (media?: (string | undefined)[]) =>
    Array.isArray(media) && media.length > 0
      ? media.filter(Boolean).map((url, i) =>
          url ? (
            <div key={i} className="inline-block relative mr-2">
              {isVideo(url) ? (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center relative overflow-hidden">
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={url}
                  alt={`media-${i}`}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            </div>
          ) : null
        )
      : '-';

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">Review</div>
        <div className="form-h1">Review your listing</div>
      </div>
      <div className="form-h2">Please check all details before publishing</div>
      <div className="text-gray-400 text-sm mb-8 -mt-5">
        If you need to make changes, go back and edit. Otherwise, submit to
        publish your listing.
      </div>

      {/* General Info Block */}
      {(notEmpty(post.title) ||
        notEmpty(post.description) ||
        notEmpty(post.address) ||
        notEmpty(post.city) ||
        notEmpty(post.state) ||
        notEmpty(post.zip) ||
        notEmpty(post.price) ||
        notEmpty(post.minPrice) ||
        notEmpty(post.maxPrice)) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">General Information</div>
          <table className="min-w-full text-left text-sm">
            <tbody>
              {notEmpty(post.title) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('title')}</th>
                  <td className="p-2">{post.title}</td>
                </tr>
              )}
              {notEmpty(post.description) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('description')}
                  </th>
                  <td className="p-2">{post.description}</td>
                </tr>
              )}
              {notEmpty(post.address) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('address')}
                  </th>
                  <td className="p-2">{post.address}</td>
                </tr>
              )}
              {notEmpty(post.city) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('city')}</th>
                  <td className="p-2">{post.city}</td>
                </tr>
              )}
              {notEmpty(post.state) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('state')}</th>
                  <td className="p-2">{post.state}</td>
                </tr>
              )}
              {notEmpty(post.zip) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('zip')}</th>
                  <td className="p-2">{post.zip}</td>
                </tr>
              )}
              {notEmpty(post.price) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('price')}</th>
                  <td className="p-2">${post.price}</td>
                </tr>
              )}
              {notEmpty(post.minPrice) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('minPrice')}
                  </th>
                  <td className="p-2">${post.minPrice}</td>
                </tr>
              )}
              {notEmpty(post.maxPrice) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('maxPrice')}
                  </th>
                  <td className="p-2">${post.maxPrice}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* House Info Block */}
      {hasData(post.houseInfo as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">House Information</div>
          <table className="min-w-full text-left text-sm">
            <tbody>
              {notEmpty(post.houseInfo?.houseType) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('houseType')}
                  </th>
                  <td className="p-2">
                    {formatEnumValue(post.houseInfo?.houseType)}
                  </td>
                </tr>
              )}
              {notEmpty(post.houseInfo?.placeType) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('placeType')}
                  </th>
                  <td className="p-2">
                    {formatEnumValue(post.houseInfo?.placeType)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bedroom Info Block */}
      {hasData(post.bedroomInfo as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Bedroom Information</div>
          <table className="min-w-full text-left text-sm">
            <tbody>
              {notEmpty(post.bedroomInfo?.bedrooms) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('bedrooms')}
                  </th>
                  <td className="p-2">{post.bedroomInfo?.bedrooms}</td>
                </tr>
              )}
              {notEmpty(post.bedroomInfo?.beds) && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('beds')}</th>
                  <td className="p-2">{post.bedroomInfo?.beds}</td>
                </tr>
              )}
              {notEmpty(post.bedroomInfo?.maxGuests) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('maxGuests')}
                  </th>
                  <td className="p-2">{post.bedroomInfo?.maxGuests}</td>
                </tr>
              )}
              {post.bedroomInfo?.lock !== undefined && (
                <tr>
                  <th className="p-2 font-medium">{getDisplayName('lock')}</th>
                  <td className="p-2">{renderBool(post.bedroomInfo?.lock)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bathroom Info Block */}
      {hasData(post.bathroomInfo as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Bathroom Information</div>
          <table className="min-w-full text-left text-sm">
            <tbody>
              {notEmpty(post.bathroomInfo?.privateAttached) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('privateAttached')}
                  </th>
                  <td className="p-2">{post.bathroomInfo?.privateAttached}</td>
                </tr>
              )}
              {notEmpty(post.bathroomInfo?.privateAccessible) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('privateAccessible')}
                  </th>
                  <td className="p-2">
                    {post.bathroomInfo?.privateAccessible}
                  </td>
                </tr>
              )}
              {notEmpty(post.bathroomInfo?.shared) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('shared')}
                  </th>
                  <td className="p-2">{post.bathroomInfo?.shared}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Who Else Block */}
      {notEmpty(post.whoElse) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Who Else</div>
          <div>{renderArray(post.whoElse as string[])}</div>
        </div>
      )}

      {/* Amenities Block */}
      {hasData(post.amenities as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Amenities</div>
          <div>
            {Object.entries(post.amenities || {})
              .filter(([, v]) => v)
              .map(([k]) => getDisplayName(k))
              .join(', ') || '-'}
          </div>
        </div>
      )}

      {/* Convenience Block */}
      {hasData(post.convenience as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Convenience</div>
          <div>
            {Object.entries(post.convenience || {})
              .filter(([, v]) => v)
              .map(([k]) => getDisplayName(k))
              .join(', ') || '-'}
          </div>
        </div>
      )}

      {/* Rules Block */}
      {hasData(post.rules as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Rules</div>
          <div>
            {Object.entries(post.rules || {})
              .filter(([, v]) => typeof v === 'boolean' && v)
              .map(([k]) => getDisplayName(k))
              .join(', ') || '-'}
          </div>
          {post.rules?.quietHours &&
            (post.rules.quietHours.from || post.rules.quietHours.to) && (
              <div className="mt-2 text-sm text-gray-600">
                {getDisplayName('quietHours')}:{' '}
                {post.rules.quietHours.from || '-'} to{' '}
                {post.rules.quietHours.to || '-'}
              </div>
            )}
        </div>
      )}

      {/* Availability Block */}
      {hasData(post.availability as Record<string, unknown>) && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Availability</div>
          <table className="min-w-full text-left text-sm">
            <tbody>
              {notEmpty(post.availability?.startDate) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('startDate')}
                  </th>
                  <td className="p-2">
                    {renderDate(post.availability?.startDate)}
                  </td>
                </tr>
              )}
              {notEmpty(post.availability?.endDate) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('endDate')}
                  </th>
                  <td className="p-2">
                    {renderDate(post.availability?.endDate)}
                  </td>
                </tr>
              )}
              {notEmpty(post.availability?.checkinTime) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('checkinTime')}
                  </th>
                  <td className="p-2">{post.availability?.checkinTime}</td>
                </tr>
              )}
              {notEmpty(post.availability?.checkoutTime) && (
                <tr>
                  <th className="p-2 font-medium">
                    {getDisplayName('checkoutTime')}
                  </th>
                  <td className="p-2">{post.availability?.checkoutTime}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Block */}
      {Array.isArray(post.media) && post.media.filter(Boolean).length > 0 && (
        <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-gray-50">
          <div className="form-h2 mb-4">Media</div>
          <div>{renderMedia(post.media)}</div>
        </div>
      )}

      <div className="flex flex-row items-center justify-between mt-8">
        <div className="flex flex-col w-[80%] gap-2">
          <span className="text-gray-500 text-sm">Step 13 of 13</span>
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
            onClick={() => router.push('/sublease/step-13')}
          >
            Back
          </Button>
          <Button
            className="w-40 btn-primary text-center rounded-xl"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
