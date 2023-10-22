export default function processTeamMembers({ collectionName, teamMembers }) {
  teamMembers.map((teamMember) => {
    const recordId = teamMember.id
    const filename = teamMember.image_file
    const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
    const imagePath = `${baseUrl}/${collectionName}/${recordId}/${filename}`
    teamMember.image_path = imagePath
    teamMember.is_local = false
    return teamMember
  })

  return teamMembers
}
