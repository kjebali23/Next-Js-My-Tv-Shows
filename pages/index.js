import {gql , GraphQLClient} from 'graphql-request'
import Section from '../components/Section'


export const getStaticProps = async () =>{

  const url = process.env.ENDPOINT
  const GraphClient = new GraphQLClient(url , {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })



const query = gql`
query{
  videos{
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
    thumbnail{
      url
    },
  }
}
`

const data = await GraphClient.request(query)
const videos = data.videos
return{props: {
  videos,  
}
}
}

const Home = ({videos})=> {

    const randomVideo = (videos) =>{
        return videos[Math.floor(Math.random() * videos.length )]
    }

    const unseenVideos = (videos)=> {
        return videos.filter(video => video.seen == false || video.seen == null )
    }

    const filterVideos = (videos , genre)=>{
      return videos.filter((video)=> video.tags.includes(genre))
    }

  return (
    <>
    <div className="app">
        <div className="main-video">
            <img src={randomVideo(videos).thumbnail.url} /> 
        </div>
        <div className="video-feed">
          <Section genre={"Wanna see"} videos = {unseenVideos(videos)}/>
          <Section genre={"Comedy"}  videos = {filterVideos(videos , 'Comedy')} />
          <Section genre={"Drama"} videos = {filterVideos(videos , 'Drama')} />
          <Section genre={"Thriller"} videos = {filterVideos(videos , 'Thriller')}/>
          <Section genre={"Classic"} videos = {filterVideos(videos , 'Classic')}/>
          
        </div>
    </div>
    </>
  )
}

export default Home