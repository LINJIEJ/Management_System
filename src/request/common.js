export function removeHTMLTag(htmlStr) {
  const html = htmlStr.replace(/<img.*?>/g, '').replaceAll(/<[^>]+>/g, '').replace(/&nbsp;/gi, '')
  return html
}
