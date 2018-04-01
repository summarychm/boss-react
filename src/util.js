export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : 'genius';
    (!avatar) && (url += 'info');
    return url;
}