"use client";

import React, { useEffect, useState } from 'react'

// App imports
import TeamMember from '@components/about/TeamMember'
import TeamMemberAddModal from '@components/about/TeamMemberAddModal';
import TeamMemberUpdateModal from '@components/about/TeamMemberUpdateModal';
import RecordDeleteModal from '@components/shared/RecordDeleteModal';

export default function TeamMembersFeed(props) {
  const { teamMembers, isAdmin } = props

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mt-10 lg:gap-8">
        {teamMembers?.[0] && teamMembers.map((teamMember) => (
          <TeamMember
            key={`TeamMember-${teamMember.id}`}
            teamMember={teamMember}
            isAdmin={isAdmin}
            editModalIdToTrigger={`TeamMemberUpdateModal-${teamMember.id}`}
            deleteModalIdToTrigger={`TeamMemberDeleteModal-${teamMember.id}`}
          />
        ))}
      </div>

      {isAdmin && <>
        <TeamMemberAddModal />

        {teamMembers?.[0] && teamMembers.map((teamMember) => (
          <div key={`TeamMemberModifyModal-${teamMember.id}`}>
            <TeamMemberUpdateModal
              teamMember={teamMember}
              modalId={`TeamMemberUpdateModal-${teamMember.id}`}
            />

            <RecordDeleteModal
              modalId={`TeamMemberDeleteModal-${teamMember.id}`}
              recordId={teamMember.id}
              collectionName={'team_members'}
            />
          </div>
        ))}
      </>}

    </>
  )
}
