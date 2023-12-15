"use client"

import defaultPackageCards from "@/public/package_cards.json"
import PackageCard from '../../_components/index/PackageCard';
import PackageCardUpdateModal from '../../_components/index/PackageCardUpdateModal';
import PackageCardAddModal from '../../_components/shared/PackageCardAddModal';
// import useGetResources from '../../_hooks/index/useGetResources';
import PackageCardDeleteModal from '../../_components/shared/PackageCardDeleteModal';
import Loading from '@/app/loading';

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

          <PackageCardDeleteModal
            packageCard={_package}
            modalId={`PackageCardDeleteModal-${_package.id}`}
          />
        </div>
      ))}

      {isAdmin && <PackageCardAddModal />}

    </>
  )
}
