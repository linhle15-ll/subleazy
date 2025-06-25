import { usePostEditStore } from '@/stores/post-edit.store';
import SubleaseFormDescription from './steps/where/title-description';
import SubleaseFormPhotos from './steps/where/photos';
import SubleaseFormPlaceType from './steps/where/place-type';
import SubleaseFormBedroom from './steps/where/bedroom';
import SubleaseFormBathroom from './steps/where/bathroom';
import SubleaseFormWhoElse from './steps/where/who-else';
import SubleaseFormAmenities from './steps/where/amenities';
import SubleaseFormAddress from './steps/where/address';
import SubleaseFormTime from './steps/when-how/check-in-out';
import SubleaseFormAvailability from './steps/when-how/availability';
import SubleaseFormPrice from './steps/when-how/price';
import SubleaseFormRules from './steps/when-how/rules';

export default function PostEditorEditPanel() {
  const { step } = usePostEditStore();

  switch (step) {
    case 'description':
      return <SubleaseFormDescription />;
    case 'photos':
      return <SubleaseFormPhotos />;
    case 'place-type':
      return <SubleaseFormPlaceType />;
    case 'bedroom':
      return <SubleaseFormBedroom />;
    case 'bathroom':
      return <SubleaseFormBathroom />;
    case 'who-else':
      return <SubleaseFormWhoElse />;
    case 'amenities':
      return <SubleaseFormAmenities />;
    case 'address':
      return <SubleaseFormAddress />;
    case 'availability':
      return <SubleaseFormAvailability />;
    case 'time':
      return <SubleaseFormTime />;
    case 'price':
      return <SubleaseFormPrice />;
    case 'rules':
      return <SubleaseFormRules />;
    default:
      return null;
  }
}
