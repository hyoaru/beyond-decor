"use client";

import { useEffect, useState } from "react";

// App imports
import useGetPackages from "../hooks/packages/useGetPackages";
import defaultPackages from "@/public/packages.json"
import PackagesTabPanel from './PackagesTabPanel'

export default function Packages(props) {
  const {} = props
  const { fetchPackages, packages, isLoading, error } = useGetPackages({ collectionName: "packages", defaultValue: defaultPackages })
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
        {packages && <PackagesTabPanel packages={packages} />}
    </>
  )
}
