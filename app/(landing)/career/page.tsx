import { MaxWrapper } from '@/components/shared/max-wrapper';
import { Metadata } from 'next';
import CarrerPageDetails from './_components/career-page-details';


export const metadata: Metadata = {
    title: "Career | Jayma Bio Innovations",
  };

  
const CareerPage = () => {
  return (
  <MaxWrapper>
   <CarrerPageDetails />
  </MaxWrapper>
  )
}

export default CareerPage