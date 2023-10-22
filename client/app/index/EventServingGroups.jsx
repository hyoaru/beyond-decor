"use client";

import React, { useEffect, useRef, useState } from 'react'

// App imports
import EventServingGroup from '../components/index/EventServingGroup'
import useGetResources from '../hooks/index/useGetResources';
import defaultEventServingGroups from '@/public/events_serving.json'
import EventServingGroupUpdateModal from '../components/index/EventServingGroupUpdateModal';

export default function EventServingGroups(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchResources: fetchEventServingGroups, resources: eventServingGroups, isLoading, error } = useGetResources(
    { collectionName: 'events_serving', defaultValue: defaultEventServingGroups }
  )

  useEffect(() => {
    async function fetchResources() {
      fetchEventServingGroups()
    }

    fetchResources()
  }, [_])

  console.log(eventServingGroups)

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {eventServingGroups && eventServingGroups.map((group, index) => {
          return (
            <EventServingGroup
              key={`EventGroup-${group.id}`}
              imgSrc={group.image_path}
              title={group.title}
              description={group.description}
              isRightAligned={index % 2 === 0}
              isAdmin={isAdmin}
              modalIdToTrigger={`EventServingGroupUpdateModal-${group.id}`}
            />)
        })}
      </div>

      {(isAdmin && eventServingGroups) && eventServingGroups.map((group, index) => {
        return (
          <EventServingGroupUpdateModal
            key={`EventServingGroupUpdateModal-${group.id}`}
            groupId={group.id}
            groupImgSrc={group.image_path}
            groupPosition={group.position}
            modalId={`EventServingGroupUpdateModal-${group.id}`}
            setState={setState}
          />
        )
      })}
    </>
  )
}
