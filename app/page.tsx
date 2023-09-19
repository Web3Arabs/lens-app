// app/page.tsx
"use client";
import { PublicationSortCriteria, PublicationTypes, useExplorePublications } from '@lens-protocol/react-web'
import Link from 'next/link'

export default function Home() {
  // نقوم بإستدعاء المنشورات المتداولة في البروتوكول
  const { data: posts, loading } = useExplorePublications({
    // نقوم بتحديد النوع بحيث يظهر لنا المنشورات فقط وليس التعليقات
    publicationTypes: [PublicationTypes.Post],
    // نقوم بتحديد المنشورات التي تحتوي على تعليقات اكبر
    sortCriteria: PublicationSortCriteria.TopCommented,
    // نقوم بإستدعاء 25 من المنشورات
    limit: 25
  }) as any
  
  // قم بمراقبتها من هناك console طباعة المنشورات على
  console.log(posts)

  // إذا مازال يقوم بإستدعاء المنشورات فسيطلب من المستخدم ان ينتظر
  if (loading) return <p className='p-20 text-5xl'>Loading...</p>

  return (
    <div className='px-20 py-10 w-[70%]'>
      <h1 className='text-5xl'>Posts</h1>
      {posts?.map((post: any) => (
        <div className="flex flex-col my-6" key={post?.id}>
          <Link href={`/${post.profile.handle}`}>
            <div className="flex flex-row gap-2">
              <div className='flex justify-center items-center'>
              {
                post.profile.picture && post.profile.picture.__typename === 'MediaSet' ? (
                  <img src={post.profile.picture.original.url} width="50" height="50" className='rounded-full' />
                ) : <div className="w-[50px] h-[50px] bg-slate-500" />
              }
              </div>
              <div className="flex flex-col justify-center">
                <p className='text-md'>{post.profile.name}</p>
                <p className='text-sm'>{post.profile.handle}</p>
              </div>
            </div>
          </Link>
          <div className='flex flex-col my-4 px-5'>
            <Link href={`/post/${post.id}`}>
              <div className="text-lg">
                {post.metadata.content.split("\n").map((i: string, id: number) => (<p key={id}>{i}<br/></p>))}
              </div>
              <div>
                {post.metadata.image && post.metadata.media[0].__typename === 'MediaSet' ? (
                  <img src={post.metadata?.media[0]?.original.url} width="100%" height="100%" className='mt-2' />
                ) : null}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}