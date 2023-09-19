// app/[id]/page.tsx
"use client"
import { useProfile, profileId, usePublications, PublicationTypes } from '@lens-protocol/react-web'
import Link from 'next/link'

export default function page({ params }: any) {
  // الذي يقوم المستخدم بإضافته في الرابط id إستدعاء
  const { id } = params

  // web3arabs.lens الذي يقوم بطلبه المستخدم مثل id يقوم بإستدعاء الحساب المتعلق في
  const { data: profile, loading } = useProfile({ handle: id }) as any

  // إستدعاء المنشورات
  const { data: posts } = usePublications({ 
    // معين id إستدعاء منشورات من المستخدم الذي يحمل
    profileId: profileId(profile?.id),
    // نقوم بتحديد النوع بحيث يظهر لنا المنشورات فقط وليس التعليقات
    publicationTypes: [PublicationTypes.Post],
    // نقوم بإستدعاء 15 من المنشورات
    limit: 15
  }) as any

  // قم بمراقبتها من هناك console طباعة بيانات الحساب على
  console.log(profile)

  // إذا مازال يقوم بإستدعاء بيانات الحساب فسيطلب من المستخدم ان ينتظر
  if (loading) return <p className='p-20 text-5xl'>Loading...</p>

  return (
    <div className='px-20 py-10 w-[70%]'>
      <h1 className='text-5xl'>Profile</h1>
      <div className='my-12'>
        {
          profile?.picture && profile?.picture.__typename === 'MediaSet' ? (
            <img src={profile?.picture.original.url} width="120" height="120" />
          ) : <div className="w-[120px] h-[120px] bg-slate-500" />
        }
        <h3 className="text-3xl mt-4">{profile?.name}</h3>
        <h4 className="text-2xl mt-2">{profile?.handle}</h4>
        <h6 className="text-lg mt-2">
          {profile?.bio.split("\n").map((i: string, id: number) => <p key={id}>{i}</p>)}
        </h6>
        <div className="flex gap-5 my-4">
          <p className='text-md'>Following: {profile?.stats.totalFollowing}</p>
          <p className='text-md'>Followers: {profile?.stats.totalFollowers}</p>
        </div>
      </div>

      {posts?.map((post: any) => (
        <div className="flex flex-col my-6" key={post?.id}>
          <div className="flex flex-row gap-2">
            <div className='flex justify-center items-center'>
            {
              profile?.picture && profile?.picture.__typename === 'MediaSet' ? (
                <img src={profile?.picture.original.url} width="50" height="50" className='rounded-full' />
              ) : <div className="w-[50px] h-[50px] bg-slate-500" />
            }
            </div>
            <div className="flex flex-col justify-center">
              <p className='text-md'>{profile?.name}</p>
              <p className='text-sm'>{profile?.handle}</p>
            </div>
          </div>
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