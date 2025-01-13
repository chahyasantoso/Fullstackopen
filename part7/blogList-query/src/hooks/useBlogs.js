import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

/*
kalo ingin behavior sama seperti bloglist-redux 
(dimana datanya diload semua diawal, ini meyebabkan data tidak up to date,
kalo pengen up to date maka harus refresh browser.)
maka tinggal diset staleTime = Infinity (maka akan selalu ambil data dari cache)

pakai default staleTime:0 lebih bagus karena dia bisa ada background refetch,
dimana dia pastikan kalau komponen bloglist dimount maka dia akan fetch data 
yang paling up to date, dan komponen blog dimount maka dia akan fetch data lagi
yang paling up to date
*/

const sortSelector = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)

export const useBlogs = (select = sortSelector) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select,
    staleTime: Infinity,
  })
}

/*
karena backend tidak punya endpoint khusus individual blog, maka terpaksa fetch semua
kalau misalnya backend punya endpoint untuk individual blog,
maka bisa pakai query key seperti ini:
return useQuery({queryKey:['blogs', id], queryFn: blogService.findOne({id})})
*/

export const useBlog = (id) => {
  return useBlogs((blogs) => blogs.find((blog) => blog.id === id))
}
