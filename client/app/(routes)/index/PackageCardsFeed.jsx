"use client"

import PackageCard from '@components/index/PackageCard';
import PackageUpdateModal from '@components/shared/ActionModals/PackageUpdateModal';
import PackageAddModal from '@components/shared/ActionModals/PackageAddModal';
import RecordDeleteModal from '@components/shared/ActionModals/RecordDeleteModal';

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
          <PackageUpdateModal
            packageCard={_package}
            modalId={`PackageCardEditModal-${_package.id}`}
          />

          <RecordDeleteModal
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
