"use client";

import { useEffect, useState } from "react";

// App imports
import useGetPackages from "../hooks/packages/useGetPackages";
import defaultPackages from "@/public/packages.json"
import PackagesTabPanel from './PackagesTabPanel'
import PackageCardAddModal from "../components/shared/PackageCardAddModal";

export default function Packages(props) {
  const { isAdmin } = props
  const { fetchPackages, packages, isLoading, error } = useGetPackages({ collectionName: "packages", defaultValue: [] })
  const [_, setState] = useState()

  useEffect(() => {
    async function fetchResources() {
      await fetchPackages()
    }

    fetchResources()
  }, [_])

  console.log(packages)

  return (
    <>
      {isAdmin && <>
        <div className="text-center mt-20">
          <span
            className="text-primary font-mono opacity-40 text-sm cursor-pointer"
            onClick={() => { document.getElementById('AddPackageCardModal').showModal() }}
          >
            {"[ add package ]"}
          </span>
        </div>
      </>}

      {packages &&
        <PackagesTabPanel
          packages={packages}
          isAdmin={isAdmin}
          setState={setState}
        />
      }

      {isAdmin &&
        <PackageCardAddModal
          setState={setState}
        />
      }
    </>
  )
}
