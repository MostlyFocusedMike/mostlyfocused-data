export const formatRouteName = (route: string) => {
  if (route === '/') return 'mostlyfocused.com'
  if (route === '/pages/articles/') return '/articles'
  return route.replace('/pages/articles', '');
}
