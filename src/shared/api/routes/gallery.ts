import { api } from '..'
import { endpoints } from '../endpoints'

export const getGallery = () => {
  return api.get(endpoints.gallery.list)
}

export const getGalleryById = (id: number) => {
  return api.get(endpoints.gallery.byId(id))
}
