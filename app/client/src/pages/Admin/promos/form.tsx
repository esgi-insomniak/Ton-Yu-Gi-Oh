import React from "react";
import { Input, Select } from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPromoCodeWithCoinsSchema, createPromoCodeWithCoinsSchemaType, createPromoCodeWithSetSchema, createPromoCodeWithSetSchemaType } from "@/helpers/utils/schema/Admin";
import { useGetFirstGenerationBooster } from "@/helpers/api/hooks/shop";

interface PromoFormProps {
    onSubmit: (data: createPromoCodeWithCoinsSchemaType) => void;
}

export const PromoFormWithcoins: React.FC<PromoFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<createPromoCodeWithCoinsSchemaType>({
        resolver: zodResolver(createPromoCodeWithCoinsSchema),
    });

    const handleFormSubmit = (data: createPromoCodeWithCoinsSchemaType) => {
        onSubmit(data);
    };

    return (
        <form className="space-y-5 w-96" onSubmit={handleSubmit(handleFormSubmit)}>
            <Input
                name="code"
                label="Code promo"
                register={register}
                uppercase
                error={errors.code?.message}
            />
            <Input
                name="rewardCoinsAmount"
                label="Nombre de coins"
                type="number"
                register={register}
                error={errors.rewardCoinsAmount?.message}
            />
            <Input
                name="expirationDate"
                label="Date d'expiration"
                type="date"
                register={register}
                error={errors.expirationDate?.message}
            />
            <div className="w-full flex justify-end">
                <button type="submit" className="btn">
                    Ajouter
                </button>
            </div>
        </form>
    );
};

interface PromoFormWithBoosterProps {
    onSubmit: (data: createPromoCodeWithSetSchemaType) => void;
}

export const PromoFormWithBooster: React.FC<PromoFormWithBoosterProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<createPromoCodeWithSetSchemaType>({
        resolver: zodResolver(createPromoCodeWithSetSchema),
    });

    const { data: boosters } = useGetFirstGenerationBooster()

    const handleFormSubmit = (data: createPromoCodeWithSetSchemaType) => {
        onSubmit(data);
    };

    return (
        <form className="space-y-5 w-96" onSubmit={handleSubmit(handleFormSubmit)}>
            <Input
                name="code"
                label="Code promo"
                register={register}
                uppercase
                error={errors.code?.message}
            />
            <Select
                name="rewardSetId"
                register={register}
                options={
                    boosters?.data?.map((booster) => ({
                        id: booster.id,
                        name: `${booster.name} (${booster.code})`,
                    })) || []
                }
                placeholder="Sélectionner un booster"
                wfull
            />
            <Input
                name="rewardSetAmount"
                label="Nombre de booster"
                type="number"
                register={register}
                error={errors.rewardSetAmount?.message}
            />
            <Input
                name="expirationDate"
                label="Date d'expiration"
                type="date"
                register={register}
                error={errors.expirationDate?.message}
            />
            <div className="w-full flex justify-end">
                <button type="submit" className="btn">
                    Ajouter
                </button>
            </div>
        </form>
    );
}