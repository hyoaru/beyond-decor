"use client";

import React, { useEffect, useRef, useState } from 'react'
import EventGroup from '../components/EventGroup'
import { useSupabaseContext } from '../context';

export default function EventsServingSection() {
  const supabase = useSupabaseContext()
  const [eventsServingGroup, setEventsServingGroup] = useState()

  useEffect(() => {
    async function fetchEventsServingGroups() {
      try {
        const { data, error } = await supabase
          .from('events_serving')
          .select()
          .order('id', { ascending: true })

        if (data) {
          setEventsServingGroup(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchEventsServingGroups()
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {eventsServingGroup && eventsServingGroup.map((group, index) => {
          const isRightAligned = !(index % 2 === 0)
          const id = group.id
          const title = group.title
          const description = group.description
          const imagePath = group.image_path
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(imagePath)
          const imageUrl = data.publicUrl

          return (
            <EventGroup
              key={`EventGroup-${id}`}
              imageSrc={imageUrl}
              title={title}
              description={description}
              isRightAligned={isRightAligned}
            />)
        })}
      </div>
    </>
  )
}
