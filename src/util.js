export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : 'genius';
    (!avatar) && (url += 'info');
    return url;
}

//获取chatid
export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join("_");
}
