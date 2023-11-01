"use client";

import React, { useEffect, useState } from 'react'

// App imports
import TeamMember from '../../_components/about/TeamMember'
import useGetTeamMembers from '../../_hooks/about/useGetTeamMembers'
import TeamMemberAddModal from '../../_components/about/TeamMemberAddModal';
import TeamMemberEditModal from '../../_components/about/TeamMemberEditModal';
import TeamMemberDeleteModal from '../../_components/about/TeamMemberDeleteModal';
import Loading from './loading';

export default function TeamMembers(props) {
  const { isAdmin } = props
  const { fetchTeamMembers, teamMembers, isLoading, error } = useGetTeamMembers({ collectionName: "team_members" })
  const [_, setState] = useState()

  useEffect(() => {
    fetchTeamMembers()
  }, [_])

  if (isLoading) { return <Loading /> }

  return (
    <>
      {isAdmin && <>
        <div className="text-center my-10">
          <span
            className="text-primary font-mono opacity-40 text-sm cursor-pointer"
            onClick={() => { document.getElementById('TeamMemberAddModal').showModal() }}
          >
            {"[ add member ]"}
          </span>
        </div>
      </>}

      <div className="flex flex-wrap gap-4 justify-center mt-10 lg:gap-8">
        {teamMembers && teamMembers.map((teamMember) => {
          return (
            <TeamMember
              key={`TeamMember-${teamMember.id}`}
              imgSrc={teamMember.image_path}
              memberId={teamMember.id}
              name={teamMember.name}
              role={teamMember.role}
              isAdmin={isAdmin}
              editModalIdToTrigger={`TeamMemberEditModal-${teamMember.id}`}
              deleteModalIdToTrigger={`TeamMemberDeleteModal-${teamMember.id}`}
            />
          )
        })}
      </div>

      {isAdmin && <>
        <TeamMemberAddModal setState={setState} />
      </>}

      {teamMembers && teamMembers.map((teamMember) => {
        return (
          <div key={`TeamMemberModifyModal-${teamMember.id}`}>
            <TeamMemberEditModal
              teamMember={teamMember}
              setState={setState}
              modalId={`TeamMemberEditModal-${teamMember.id}`}
            />

            <TeamMemberDeleteModal
              recordId={teamMember.id}
              imgSrc={teamMember.image_path}
              setState={setState}
              modalId={`TeamMemberDeleteModal-${teamMember.id}`}
              memberName={teamMember.name}
            />
          </div>
        )
      })}
    </>
  )
}
