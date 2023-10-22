"use client";

import React, { useEffect, useState } from 'react'

// App imports
import TeamMember from '../components/about/TeamMember'
import useGetTeamMembers from '../hooks/about/useGetTeamMembers'
import TeamMemberAddModal from '../components/about/TeamMemberAddModal';

export default function TeamMembers(props) {
  const { isAdmin } = props
  const { fetchTeamMembers, teamMembers, isLoading, error } = useGetTeamMembers({ collectionName: "team_members" })
  const [_, setState] = useState()

  useEffect(() => {
    async function fetchResources() {
      await fetchTeamMembers()
    }

    fetchResources()
  }, [_])

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mt-10 lg:gap-8">
        {teamMembers && teamMembers.map((teamMember) => {
          return (
            <TeamMember
              key={`TeamMember-${teamMember.id}`}
              imgSrc={teamMember.image_path}
              memberId={teamMember.id}
              name={teamMember.name}
              role={teamMember.role}
            />
          )
        })}

        {isAdmin && <>
          <TeamMemberAddModal setState={setState} />
        </>}
      </div>
    </>
  )
}
