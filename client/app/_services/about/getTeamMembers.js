"use server"

import getClient from "@services/pocketbase/getClient";
import getImagePublicUrl from "@libraries/shared/getImagePublicUrl";

export default async function getTeamMembers() {
  const COLLECTION_NAME = 'team_members'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ sort: 'created' })
      .then((teamMembers) => {
        teamMembers.map((teamMember) => {
          teamMember.image_path = getImagePublicUrl({
            collectionName: COLLECTION_NAME,
            recordId: teamMember.id,
            fileName: teamMember.image_file
          })
        })
        
        return teamMembers
      })
    } catch (error) {
      response.error = error
    }
    
  return response
}
