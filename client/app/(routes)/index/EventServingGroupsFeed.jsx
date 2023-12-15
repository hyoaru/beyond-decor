import EventServingGroup from '../../_components/index/EventServingGroup'
// import useGetResources from '../../_hooks/index/useGetResources';
import defaultEventServingGroups from '@/public/events_serving.json'
import EventServingGroupUpdateModal from '../../_components/index/EventServingGroupUpdateModal';
import Loading from '@/app/loading';

export default function EventServingGroupsFeed(props) {
  const { isAdmin, eventServingGroups } = props

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        {eventServingGroups && eventServingGroups.map((group, index) => (
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
