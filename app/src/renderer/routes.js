export default [
  {
    path: '/',
    name: 'app-page',
    component: require('components/AppPageView')
  },
  {
    path: '*',
    redirect: '/'
  }

]
