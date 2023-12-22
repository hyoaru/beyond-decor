import EventServingGroup from '@components/index/EventServingGroup'

export default function EventServingGroupsFeed(props) {
  const { isAdmin, eventServingGroups } = props

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {eventServingGroups?.[0] && eventServingGroups.map((group, index) => (
          <EventServingGroup
            key={`EventGroup-${group.id}`}
            eventServingGroup={group}
            isRightAligned={index % 2 === 0}
            isAdmin={isAdmin}
            modalIdToTrigger={`EventServingGroupUpdateModal-${group.id}`}
          />
        ))}
      </div>
    </>
  )
}
