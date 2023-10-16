"use client";

import React, { useEffect, useRef, useState } from 'react'
import EventGroup from '../components/EventGroup'
import { useEventsServingGroups } from '../hooks/landing';

export default function EventsServingSection() {
  const [eventsServingGroups, setEventsServingGroups] = useState()
  const {getEventsServingGroups, isLoading, error} = useEventsServingGroups()

  async function fetchEventsServingGroups() {
    setEventsServingGroups(await getEventsServingGroups())
  }

  useEffect(() => {
    fetchEventsServingGroups()
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {eventsServingGroups && eventsServingGroups.map((group, index) => {
          return (
            <EventGroup
              key={`EventGroup-${group.id}`}
              imageSrc={group.image_path}
              title={group.title}
              description={group.description}
              isRightAligned={index % 2 === 0}
            />)
        })}
      </div>
    </>
  )
}
