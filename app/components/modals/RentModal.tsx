'use client'

import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../input/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../input/Counter'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const roomCount = watch('roomCount')
  const guestCount = watch('guestCount')
  const bathroomCount = watch('bathroomCount')

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }
  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create'
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) return undefined
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place"
        subtitle="Pick a category"
      />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className=" col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Pick a location to help guiets find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some information about your place"
          subtitle="What ameinities do you offer?"
        />
        <Counter
          title="Guests"
          subTitle="How many guests can your place accomodate?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms does your place have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms does your place have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryActionLabel={secondaryActionLabel}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
