"use client"

import { useState } from "react"

// App imports
import PackageTab from "../components/packages/PackageTab"
import ActivePackage from "../components/packages/ActivePackage"
import PackageUpdateModal from "../components/packages/PackageUpdateModal"
import PackageCardDeleteModal from "../components/shared/PackageCardDeleteModal"

export default function PackagesTabPanel(props) {
  const { packages, isAdmin, setState } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const activePackage = packages[activeIndex]

  return (
    <>
      <div className={`flex justify-center mt-10 ${isAdmin ? "sm:mt-10" : "sm:mt-20"}`}>
        <div className="tabs justify-center">
          {packages && packages.map((pkg, index) => (
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
        {(packages && activePackage) && <>
          <ActivePackage
            activePackage={activePackage}
            isAdmin={isAdmin}
            editModalIdToTrigger={`PackageEditModal-${activePackage.id}`}
            deleteModalIdToTrigger={`PackageDeleteModal-${activePackage.id}`}
          />
        </>}
      </div>

      {(isAdmin && packages) && packages.map((pkg, index) => (
        <div key={`PackageModifyModals-${index}`}>
          <PackageUpdateModal
            modalId={`PackageEditModal-${pkg.id}`}
            packageCard={pkg}
            setState={setState}
          />
          <PackageCardDeleteModal 
            modalId={`PackageDeleteModal-${pkg.id}`}
            packageCard={pkg}
            setState={setState}
          />
        </div>
      ))}

    </>
  )
}
