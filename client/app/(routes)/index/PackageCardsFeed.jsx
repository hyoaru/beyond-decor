"use client"

import PackageCard from '@components/index/PackageCard';
import PackageCardUpdateModal from '@components/index/ActionModals/PackageCardUpdateModal';
import PackageAddModal from '@/app/_components/shared/PackageAddModal';
import DeleteRecordModal from '@/app/_components/shared/DeleteRecordModal';

export default function PackageCardsFeed(props) {
  const { packages, isAdmin } = props

  return (
    <>
      <div className="px-6 flex flex-wrap gap-6 gap-y-10 justify-center">
        {packages && packages.map((_package, index) => {
          return (
            <PackageCard
              key={`PackageCard-${_package.id}`}
              _package={_package}
              isAdmin={isAdmin}
              editModalIdToTrigger={`PackageCardEditModal-${_package.id}`}
              deleteModalIdToTrigger={`PackageCardDeleteModal-${_package.id}`}
            />
          );
        })}
      </div>

      {(isAdmin && packages) && packages.map((_package, index) => (
        <div key={`PackageCardModifyModals-${index}`}>
          <PackageCardUpdateModal
            packageCard={_package}
            modalId={`PackageCardEditModal-${_package.id}`}
          />

          <DeleteRecordModal
            collectionName={'packages'}
            recordId={_package.id}
            modalId={`PackageCardDeleteModal-${_package.id}`}
          />
        </div>
      ))}

      {isAdmin && <PackageAddModal />}

    </>
  )
}
