'use client'

import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import {useMemo, useState} from 'react'
import Heading from '../Heading'
import {categories} from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'
import {SubmitHandler, FieldValues, useForm} from 'react-hook-form'
import CountrySelect from '../input/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../input/Counter'
import ImageUpload from '../input/ImageUpload'
import Input from "@/app/components/input/Input";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
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
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,
            {
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        console.log(data);

        axios.post('/api/listings', data).then(() => {
            toast.success("Listing created successfully")
            router.refresh();
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => {
            setIsLoading(false)
        })

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
                <Map center={location?.latlng}/>
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
                <hr/>
                <Counter
                    title="Rooms"
                    subTitle="How many rooms does your place have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title="Bathrooms"
                    subTitle="How many bathrooms does your place have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step == STEPS.IMAGE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step == STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title='How would you describe your place'
                         subtitle=
                             "Write a short description to help guests decide if your place is right for them"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required/>

                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required/>
            </div>
        )
    }

    if (step == STEPS.PRICE) {
        bodyContent = (
            <div className=" flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you want to charge for each night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice={true}
                    type={'number'}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={true}
                />
            </div>
        )
    }

    return (
        <Modal
            title="Airbnb your home"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal
