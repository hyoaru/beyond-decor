import AddOnCard from '@components/packages/AddOnCard'
import AddOnsAddModal from '@components/packages/AddOnsAddModal';
import AddOnsUpdateModal from '@components/packages/AddOnsUpdateModal';
import RecordDeleteModal from '@components/shared/RecordDeleteModal';

export default function AddOnsFeed(props) {
  const { addOns, isAdmin } = props

  return (
    <>
      <div className="grid grid-cols-1 grid-flow-row mt-10 gap-2 lg:grid-cols-2">
        {addOns?.[0] && addOns?.map((addOn, index) => (
          <AddOnCard
            key={`AddOn-${addOn.id}-${index}`}
            addOnCard={addOn}
            editModalIdToTrigger={`AddOnUpdateModal-${addOn.id}`}
            deleteModalIdToTrigger={`AddOnDeleteModal-${addOn.id}`}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {isAdmin && <>
        <AddOnsAddModal />

        {addOns?.[0] && addOns.map((addOn) => (
          <div key={`AddOnsModifyModals-${addOn.id}`}>
            <AddOnsUpdateModal
              modalId={`AddOnUpdateModal-${addOn.id}`}
              addOnCard={addOn}
            />

            <RecordDeleteModal
              modalId={`AddOnDeleteModal-${addOn.id}`}
              collectionName={'addons'}
              recordId={addOn.id}
            />
          </div>
        ))}
      </>}

    </>
  )
}
