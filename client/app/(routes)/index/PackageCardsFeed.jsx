"use client"

import PackageCard from '@components/index/PackageCard';
import PackageUpdateModal from '@components/shared/PackageUpdateModal';
import PackageAddModal from '@components/shared/PackageAddModal';
import RecordDeleteModal from '@components/shared/RecordDeleteModal';

export default function PackageCardsFeed(props) {
  const { packages, isAdmin } = props
  const filteredPackages = packages?.filter((_package) => isAdmin ? _package : _package.is_displayed === true)


  return (
    <>
      <div className="px-6 flex flex-wrap gap-6 gap-y-10 justify-center">
        {filteredPackages?.[0] && filteredPackages.map((_package, index) => {
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

      {isAdmin && <>
        <PackageAddModal />

        {filteredPackages?.[0] && filteredPackages.map((_package, index) => (
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
      </>}



    </>
  )
}
