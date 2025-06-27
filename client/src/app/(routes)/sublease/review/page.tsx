'use client';

import { useRouter } from 'next/navigation';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { Button } from '@/components/ui/button';
import { usePostCreateStore } from '@/stores/post-create.store';
import postService from '@/services/post.service';
import { Post } from '@/lib/types/post.types';

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

  // Helper to render media
  const renderMedia = (media?: (string | undefined)[]) =>
    Array.isArray(media) && media.length > 0
      ? media
          .filter(Boolean)
          .map((url, i) =>
            url ? (
              <img
                key={i}
                src={url}
                alt={`media-${i}`}
                className="inline-block w-16 h-16 object-cover rounded mr-2"
              />
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
                  <th className="p-2 font-medium">Title</th>
                  <td className="p-2">{post.title}</td>
                </tr>
              )}
              {notEmpty(post.description) && (
                <tr>
                  <th className="p-2 font-medium">Description</th>
                  <td className="p-2">{post.description}</td>
                </tr>
              )}
              {notEmpty(post.address) && (
                <tr>
                  <th className="p-2 font-medium">Address</th>
                  <td className="p-2">{post.address}</td>
                </tr>
              )}
              {notEmpty(post.city) && (
                <tr>
                  <th className="p-2 font-medium">City</th>
                  <td className="p-2">{post.city}</td>
                </tr>
              )}
              {notEmpty(post.state) && (
                <tr>
                  <th className="p-2 font-medium">State</th>
                  <td className="p-2">{post.state}</td>
                </tr>
              )}
              {notEmpty(post.zip) && (
                <tr>
                  <th className="p-2 font-medium">Zip</th>
                  <td className="p-2">{post.zip}</td>
                </tr>
              )}
              {notEmpty(post.price) && (
                <tr>
                  <th className="p-2 font-medium">Price</th>
                  <td className="p-2">${post.price}</td>
                </tr>
              )}
              {notEmpty(post.minPrice) && (
                <tr>
                  <th className="p-2 font-medium">Min Price</th>
                  <td className="p-2">${post.minPrice}</td>
                </tr>
              )}
              {notEmpty(post.maxPrice) && (
                <tr>
                  <th className="p-2 font-medium">Max Price</th>
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
                  <th className="p-2 font-medium">House Type</th>
                  <td className="p-2">{post.houseInfo?.houseType}</td>
                </tr>
              )}
              {notEmpty(post.houseInfo?.placeType) && (
                <tr>
                  <th className="p-2 font-medium">Place Type</th>
                  <td className="p-2">{post.houseInfo?.placeType}</td>
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
                  <th className="p-2 font-medium">Bedrooms</th>
                  <td className="p-2">{post.bedroomInfo?.bedrooms}</td>
                </tr>
              )}
              {notEmpty(post.bedroomInfo?.beds) && (
                <tr>
                  <th className="p-2 font-medium">Beds</th>
                  <td className="p-2">{post.bedroomInfo?.beds}</td>
                </tr>
              )}
              {notEmpty(post.bedroomInfo?.maxGuests) && (
                <tr>
                  <th className="p-2 font-medium">Max Guests</th>
                  <td className="p-2">{post.bedroomInfo?.maxGuests}</td>
                </tr>
              )}
              {post.bedroomInfo?.lock !== undefined && (
                <tr>
                  <th className="p-2 font-medium">Bedroom Lock</th>
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
                  <th className="p-2 font-medium">Private Attached</th>
                  <td className="p-2">{post.bathroomInfo?.privateAttached}</td>
                </tr>
              )}
              {notEmpty(post.bathroomInfo?.privateAccessible) && (
                <tr>
                  <th className="p-2 font-medium">Private Accessible</th>
                  <td className="p-2">
                    {post.bathroomInfo?.privateAccessible}
                  </td>
                </tr>
              )}
              {notEmpty(post.bathroomInfo?.shared) && (
                <tr>
                  <th className="p-2 font-medium">Shared</th>
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
              .map(([k]) => k)
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
              .map(([k]) => k)
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
              .map(([k]) => k)
              .join(', ') || '-'}
          </div>
          {post.rules?.quietHours &&
            (post.rules.quietHours.from || post.rules.quietHours.to) && (
              <div className="mt-2 text-sm text-gray-600">
                Quiet Hours: {post.rules.quietHours.from || '-'} to{' '}
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
                  <th className="p-2 font-medium">Move-in Date</th>
                  <td className="p-2">
                    {renderDate(post.availability?.startDate)}
                  </td>
                </tr>
              )}
              {notEmpty(post.availability?.endDate) && (
                <tr>
                  <th className="p-2 font-medium">Move-out Date</th>
                  <td className="p-2">
                    {renderDate(post.availability?.endDate)}
                  </td>
                </tr>
              )}
              {notEmpty(post.availability?.checkinTime) && (
                <tr>
                  <th className="p-2 font-medium">Check-in Time</th>
                  <td className="p-2">{post.availability?.checkinTime}</td>
                </tr>
              )}
              {notEmpty(post.availability?.checkoutTime) && (
                <tr>
                  <th className="p-2 font-medium">Check-out Time</th>
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
