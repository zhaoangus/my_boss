export function getRedirectPath ({type, avatar}) {
  let url = (type === 'boss') ? '/boss' : '/candidate'
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId (userid, targetid) {
  return [userid, targetid].sort().join('_')
}