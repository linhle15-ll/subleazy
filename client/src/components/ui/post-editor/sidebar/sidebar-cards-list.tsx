'use client';

import { usePostEditorStore } from '@/lib/stores/post.editor.store';
import {
  CardProps,
  SidebarCardDouble,
  SidebarCardSingle,
} from '@/components/ui/post-editor/sidebar/sidebar-cards';

type TabProps = {
  tab: 'where' | 'when';
};

export default function PostEditorSidebarCardsList({ tab }: TabProps) {
  const { post } = usePostEditorStore();
  const step = usePostEditorStore((state) => state.step);
  const setStep = usePostEditorStore((state) => state.setStep);

  const stepsWhere: CardProps[] = [
    {
      key: 'description',
      layout: 'single',
      title: 'Title & Description',
      summary:
        (post.title ? `${post.title.slice(0, 30)}` : '') +
        '\n' +
        (post.description ? `${post.description.slice(0, 30)}` : ''),
    },
    {
      key: 'photos',
      layout: 'single',
      title: 'Photos',
      summary: `${post.media?.length || 0}` + ' photos uploaded',
    },
    {
      key: 'place-type',
      layout: 'single',
      title: 'Type of Place',
      summary:
        `${post.houseInfo?.houseType} | ` +
        (`${post.houseInfo?.placeType}` || ''),
    },
    {
      key: 'bedroom',
      layout: 'single',
      title: 'Bedroom',
      summary:
        `${post.bedroomInfo?.maxGuests || 1}` +
        ' guests | ' +
        `${post.bedroomInfo?.bedrooms || 0}` +
        ' bedrooms | ' +
        `${post.bedroomInfo?.beds || 0}` +
        ' beds | ' +
        (post.bedroomInfo?.lock ? 'private lock' : ''),
    },
    {
      key: 'bathroom',
      layout: 'single',
      title: 'Bathroom',
      summary:
        `${post.bathroomInfo?.privateAttached || 0}` +
        ' attached | ' +
        `${post.bathroomInfo?.privateAccessible || 0}` +
        ' private but accessible | ' +
        `${post.bathroomInfo?.shared || 0}` +
        ' shared',
    },
    {
      key: 'who-else',
      layout: 'single',
      title: 'Who Else Lives There',
      summary: `${post.whoElse ? post.whoElse.join(' | ') : ''}`,
    },
    {
      key: 'amenities',
      layout: 'single',
      title: 'Amenities',
      summary: `${post.amenities?.wifi ? 'wifi | ' : ''}${post.amenities?.kitchen ? 'kitchen | ' : ''}${post.amenities?.laundry ? 'laundry | ' : ''}${post.amenities?.parking ? 'parking | ' : ''}${post.amenities?.airConditioning ? 'AC' : ''}`,
    },
    {
      key: 'address',
      layout: 'single',
      title: 'Address',
      summary: `${post.city || ''}, ${post.state || ''}, ${post.zip || ''}`,
    },
  ];

  const stepsWhenHow: CardProps[] = [
    {
      key: 'time',
      layout: 'double',
      items: [
        {
          title: 'Start',
          summary: post.availability?.startDate
            ? new Date(
                post.availability.startDate as string
              ).toLocaleDateString()
            : 'Not set',
        },
        {
          title: 'End',
          summary: post.availability?.endDate
            ? new Date(post.availability.endDate as string).toLocaleDateString()
            : 'Not set',
        },
      ],
    },
    {
      key: 'availability',
      layout: 'double',
      items: [
        {
          title: 'Check-in',
          summary: post.availability?.checkinTime || 'Not set',
        },
        {
          title: 'Check-out',
          summary: post.availability?.checkoutTime || 'Not set',
        },
      ],
    },
    {
      key: 'price',
      layout: 'single',
      title: 'Price',
      summary: post.price ? `${post.price} / month` : 'Not set',
    },
    {
      key: 'rules',
      layout: 'single',
      title: 'House rules',
      summary: `${post.rules?.noGuest ? 'No guests | ' : ''}${post.rules?.noParty ? 'No parties | ' : ''}${post.rules?.quietHours?.from && post.rules?.quietHours?.to ? `Quiet hours: ${post.rules.quietHours.from} - ${post.rules.quietHours.to} | ` : ''}${post.rules?.noSmoking ? 'No smoking | ' : ''}${post.rules?.noDrug ? 'No drugs | ' : ''}${post.rules?.noPet ? 'No pets' : ''}`,
    },
  ];

  const currentSteps = tab === 'where' ? stepsWhere : stepsWhenHow;

  return (
    <div className="flex flex-col gap-3 p-4 h-[calc(100vh-20rem)] overflow-y-auto">
      {currentSteps.map((stepItem) =>
        stepItem.layout === 'double' ? (
          <SidebarCardDouble
            key={stepItem.key}
            items={stepItem.items}
            layout={stepItem.layout}
            active={step === stepItem.key}
            onClick={() => setStep(stepItem.key)}
          />
        ) : (
          <SidebarCardSingle
            key={stepItem.key}
            title={stepItem.title}
            summary={stepItem.summary}
            layout={stepItem.layout}
            active={step === stepItem.key}
            onClick={() => setStep(stepItem.key)}
          />
        )
      )}
    </div>
  );
}
