import tags from '~/assets/json/tags.json'

export const state = () => ({
  tags: tags
})

export const getters = {
  tags: ({ tags }) => tags,
  tagOfName: ({ tags }, name) => tags.filter(tag => tag.name === name),
  tagOfSlug: ({ tags }, slug) => tags.filter(tag => tag.slug === slug)
}
