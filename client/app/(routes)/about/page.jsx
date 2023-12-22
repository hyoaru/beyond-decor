// App imports
import TeamMembersFeed from './TeamMembersFeed';
import getAuthState from '@services/authentication/getAuthState';
import TriggerModalButton from '@components/shared/TriggerModalButton';
import getTeamMembers from '@services/about/getTeamMembers';

export default async function Page() {
  const authState = await getAuthState()
  const { data: teamMembers, error } = await getTeamMembers()

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            {'Meet the team '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Beyond Decor</span>
          </h1>
          <p className='mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12'>
            The Beyond Decor team is a trio of creative individuals who initially embarked on their journey by delving into do-it-yourself projects. Based in San Isidro, San Pablo City, Laguna, their passion for crafting unforgettable events has evolved into a thriving business, where they continue to infuse their artistic talents into every occasion they touch.
          </p>
        </div>

        {authState.isAdmin && <>
          <div className="text-center my-10">
            <TriggerModalButton modalIdToTrigger={'TeamMemberAddModal'}>
              {"[ add member ]"}
            </TriggerModalButton>
          </div>
        </>}

        <TeamMembersFeed teamMembers={teamMembers} isAdmin={authState.isAdmin} />
      </div>
    </>
  )
}
