"use client"

import { useState } from "react"

// App imports
import PackageTab from "@components/packages/PackageTab"
import ActivePackage from "@components/packages/ActivePackage"
import PackageUpdateModal from "@components/shared/PackageUpdateModal"
import RecordDeleteModal from "@components/shared/RecordDeleteModal"
import PackageAddModal from "@components/shared/PackageAddModal"

export default function PackagesFeed(props) {
  const { packages, isAdmin } = props
  const filteredPackages = packages?.filter((_package) => isAdmin ? _package : _package.is_displayed === true)
  const [activeIndex, setActiveIndex] = useState(0)
  const activePackage = packages[activeIndex]

  return (
    <>
      <div className={`mt-10 ${isAdmin ? "sm:mt-10" : "sm:mt-20"}`}>
        <div className="tabs tabs-lifted tabs-md justify-center flex flex-wrap">
          {filteredPackages?.[0] && filteredPackages.map((pkg, index) => (
            <PackageTab
              key={`PackageTab-${pkg.id}`}
              title={pkg.title}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>

      <div className={`mt-10 ${isAdmin ? "lg:mt-10" : "lg:mt-20"}`}>
        {(filteredPackages?.[0] && activePackage) && <>
          <ActivePackage
            activePackage={activePackage}
            isAdmin={isAdmin}
            editModalIdToTrigger={`PackageEditModal-${activePackage.id}`}
            deleteModalIdToTrigger={`PackageDeleteModal-${activePackage.id}`}
          />
        </>}
      </div>

      {isAdmin && <>
        <PackageAddModal />

        {filteredPackages?.[0] && filteredPackages.map((pkg, index) => (
          <div key={`PackageModifyModals-${index}`}>
            <PackageUpdateModal
              modalId={`PackageEditModal-${pkg.id}`}
              packageCard={pkg}
            />
            <RecordDeleteModal 
              modalId={`PackageDeleteModal-${pkg.id}`}
              collectionName={'packages'}
              recordId={pkg.id}
            />
          </div>
        ))}
      </>}
    </>
  )
}
