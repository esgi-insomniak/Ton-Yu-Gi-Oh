import React from "react";
import { ReportCard } from "../Layout";
import { Table, TableColumn } from "@/components/Table";
import { useGetAllPromos, usePostPromoCode, useDeletePromoCode, usePatchPromoCode } from "@/helpers/api/hooks/admin/promo";
import { PromoCodeSchemaType } from "@/helpers/utils/schema/shop";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import useModal from "@/helpers/api/hooks/modal";
import { Modal } from "@/components/Modal";
import { Input, Select } from "@/components/Input";
import { set, useForm } from "react-hook-form";
import { createPromoCodeWithCoinsSchemaType, createPromoCodeWithSetSchemaType, sendPatchPromoCodeSchemaType } from "@/helpers/utils/schema/Admin";
import { PromoFormWithcoins, PromoFormWithBooster } from "./form";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { useGetFirstGenerationBooster } from "@/helpers/api/hooks/shop";

interface TablePromoProps extends Omit<PromoCodeSchemaType, 'rewardSet'> {
    rewardSet: string;
    crud: JSX.Element;
}

const columns: TableColumn<TablePromoProps>[] = [
    { key: "code", label: "Code" },
    { key: "rewardCoinsAmount", label: "Coins" },
    { key: "rewardSet", label: "Booster" },
    { key: "rewardSetAmount", label: "Nombre de booster" },
    { key: "expirationDate", label: "Expire le" },
    { key: "crud", label: "Actions" },
]

const PromoAdmin = () => {

    const { data, refetch } = useGetAllPromos(10, 0)
    const { isShowing: addIsShowing, toggle: addToggle } = useModal()
    const { isShowing: patchIsShowing, toggle: patchToggle } = useModal()
    const { isShowing: deleteIsShowing, toggle: deleteToggle } = useModal()
    const postPromoCode = usePostPromoCode()
    const deletePromoCode = useDeletePromoCode()
    const patchPromo = usePatchPromoCode()
    const alert = useAlert()
    const { data: boosters } = useGetFirstGenerationBooster()

    const [editPromo, setEditPromo] = React.useState<PromoCodeSchemaType>()
    const [toggleReward, setToggleReward] = React.useState<boolean>(false)
    const [deleteCodeId, setDeleteCodeId] = React.useState<string>("")

    const { register: patch, handleSubmit: patchSubmit, reset: patchReset, formState: { errors } } = useForm<sendPatchPromoCodeSchemaType>()

    const onSubmit = (data: createPromoCodeWithCoinsSchemaType) => {
        postPromoCode.mutate({
            ...data,
            code: data.code.toUpperCase().trim()
        } as any, {
            onSuccess: () => {
                refetch()
                alert?.success('Code promo ajouté avec succès')
                addToggle()
            },
            onError: (err) => alert?.error('Une erreur est survenue')
        })
    }

    const onSubmitSet = (data: createPromoCodeWithSetSchemaType) => {
        postPromoCode.mutate({
            ...data,
            code: data.code.toUpperCase().trim()
        } as any, {
            onSuccess: () => {
                refetch()
                alert?.success('Code promo ajouté avec succès')
                addToggle()
            },
            onError: (err) => alert?.error('Une erreur est survenue')
        })
    }

    const onSubmitPatch = (data: sendPatchPromoCodeSchemaType) => {
        console.log(data, editPromo)
        patchPromo.mutate({
            body: {
                code: data.code.toUpperCase().trim(),
                rewardSetId: data.rewardSetId || null,
                rewardSetAmount: data.rewardSetAmount || editPromo?.rewardSetAmount as number,
                rewardCoinsAmount: data.rewardCoinsAmount || editPromo?.rewardCoinsAmount as number,
                expirationDate: data.expirationDate || editPromo?.expirationDate as string,
            },
            id: editPromo?.id || ""
        }, {
            onSuccess: () => {
                refetch()
                alert?.success('Code promo modifié avec succès')
                patchToggle()
            },
            onError: (err) => alert?.error('Une erreur est survenue')
        })
    }

    const handlePatchPromoModal = (data: PromoCodeSchemaType) => {
        patchToggle()
        patchReset(data)
        setEditPromo(data)
    }

    const handleDeletePromoModal = (id: string) => {
        deleteToggle()
        setDeleteCodeId(id)
    }

    const handleDelete = (id: string) => {
        deletePromoCode.mutate(id, {
            onSuccess: () => {
                refetch()
                alert?.success('Code promo supprimé avec succès')
            },
            onError: (err) => alert?.error('Une erreur est survenue')
        })
        refetch()
        deleteToggle()
        setDeleteCodeId("")
    }

    const formatedData = data?.data.map((promo) => ({
        ...promo,
        rewardCoinsAmount: promo?.rewardCoinsAmount || 0,
        rewardSet: promo?.rewardSet?.name || 'Aucun',
        rewardSetAmount: promo?.rewardSetAmount || 0,
        expirationDate: new Date(promo.expirationDate as string).toLocaleDateString('fr-FR'),
        crud: (
            <div className="flex space-x-2">
                <AiFillEdit className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => handlePatchPromoModal(promo)} />
                <AiTwotoneDelete className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => handleDeletePromoModal(promo.id)} />
            </div>
        ),
    }))

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard title="Nombre de code promo" value={data?.data.length.toString()} icon={<AiFillEdit className="w-10 h-10 text-gray-500" />} />
            </div>
            <div className="flex justify-end">
                <button className="btn w-72" onClick={addToggle}>Ajouter un code promo</button>
            </div>

            <Table<TablePromoProps>
                data={formatedData || []}
                columns={columns}
            />

            <Modal
                isShowing={addIsShowing}
                toggle={addToggle}
                title="Ajouter un code promo"
                content={
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Coins reward</span>
                            <input type="checkbox" className="toggle" checked={toggleReward} onChange={() => setToggleReward(!toggleReward)} />
                            <span className="label-text">Booster reward</span>
                        </label>
                        {!toggleReward ? (
                            <PromoFormWithcoins onSubmit={onSubmit} />
                        ) : (
                            <PromoFormWithBooster onSubmit={onSubmitSet} />
                        )}
                    </div>
                }
            />
            <Modal
                isShowing={patchIsShowing}
                toggle={patchToggle}
                title="Modifier un code promo"
                content={
                    <form className="space-y-5 w-96" onSubmit={patchSubmit(onSubmitPatch)}>
                        <Input name="code" label="Code promo" register={patch} uppercase error={errors.code?.message} defaultV={editPromo?.code} />
                        <Input name="rewardCoinsAmount" label="Nombre de coins" type="number" register={patch} error={errors.rewardCoinsAmount?.message}
                            defaultV={editPromo?.rewardCoinsAmount as number} />
                        <Select name="rewardSetId" register={patch} options={boosters?.data} defaultV={editPromo?.rewardSet?.id} placeholder="Aucun" wfull />
                        <Input name="rewardSetAmount" label="Nombre de booster" type="number" register={patch} error={errors.rewardSetAmount?.message}
                            defaultV={editPromo?.rewardSetAmount as number} />
                        <Input name="expirationDate" label="Date d'expiration" type="date" register={patch} error={errors.expirationDate?.message}
                            defaultV={editPromo?.expirationDate as string} />

                        <div className="w-full flex justify-end">
                            <button className="btn" type="submit">Modifier</button>
                        </div>
                    </form>
                }
            />
            <Modal
                isShowing={deleteIsShowing}
                toggle={deleteToggle}
                title="Supprimer un code promo"
                text="Est vous sûr de vouloir supprimer ce code promo ?"
                yesNo
                yesNoAction={[
                    { text: "Annuler", action: deleteToggle, type: 'no' },
                    { text: "Supprimer", action: () => handleDelete(deleteCodeId), type: 'yes' }
                ]}
            />
        </div>
    )
}

export default PromoAdmin;