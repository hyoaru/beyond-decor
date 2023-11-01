"use client";

import React, { useEffect, useRef, useState } from 'react'

// App imports
import EventServingGroup from '../../_components/index/EventServingGroup'
import useGetResources from '../../_hooks/index/useGetResources';
import defaultEventServingGroups from '@/public/events_serving.json'
import EventServingGroupUpdateModal from '../../_components/index/EventServingGroupUpdateModal';
import Loading from '@/app/loading';

export default function EventServingGroups(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchResources: fetchEventServingGroups, resources: eventServingGroups, isLoading, error } = useGetResources(
    { collectionName: 'events_serving', defaultValue: defaultEventServingGroups }
  )

  useEffect(() => {
    fetchEventServingGroups()
  }, [_])

  if (isLoading) { return <Loading /> }

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
            eventServingGroup={group}
            modalId={`EventServingGroupUpdateModal-${group.id}`}
            setState={setState}
          />
        )
      })}
    </>
  )
}