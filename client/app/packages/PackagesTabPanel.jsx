"use client"

import { useState } from "react"

// App imports
import PackageTab from "../components/packages/PackageTab"
import ActivePackage from "../components/packages/ActivePackage"

export default function PackagesTabPanel(props) {
  const { packages, isAdmin } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const activePackage = packages[activeIndex]

  return (
    <>
      <div className={`flex justify-center mt-10 ${ isAdmin ? "sm:mt-10" : "sm:mt-20"}`}>
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

      <div className="mt-10 lg:mt-20">
        {(packages && activePackage) && <>
          <ActivePackage
            packageId={activePackage.id}
            title={activePackage.title}
            description={activePackage.description}
            inclusions={activePackage.inclusions}
          />
        </>}
      </div>

    </>
  )
}
