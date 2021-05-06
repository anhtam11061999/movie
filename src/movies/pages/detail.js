import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Rate, Button } from 'antd';
import LayoutComponent from '../components/layout';
import { getDataMoviesById, getRecommend } from '../services/api';
import LoadingData from '../components/loading-data';
import YouTube from 'react-youtube';
import { PlayCircleOutlined } from '@ant-design/icons'

const { Meta } = Card;

const DetailMoviePage = () => {
  const { id } = useParams(); // lay dc params tu url xuong
  // call api dua id cua bo phim
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailMovie, setDetailMovie] = useState({});
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const getData = async () => {
      setLoadingDetail(true);
      const data = await getDataMoviesById(id);
      if (data) {
        setDetailMovie(data);
                setLoadingDetail(false);
      }
    }
    getData();
    console.log(detailMovie.videos)
  }, [id]);
  // check object detailMovie khong rong
  if (loadingDetail && Object.keys(detailMovie).length === 0 && detailMovie.constructor === Object) {
    return (
      <LayoutComponent>
        <LoadingData />
      </LayoutComponent>
    )
  }
  return (
    <LayoutComponent>
      <Row style={{ marginTop: '80px', marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={12} lg={24} xl={6}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w300${detailMovie.poster_path}`} />}
          >
            <Meta title={detailMovie.tagline} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <h1 style={{ fontWeight: 'bold' }}>{detailMovie.title}</h1>
          <span style={{ fontWeight: 'bold' }}>{detailMovie.release_date}</span>
          <p style={{ maxWidth: '500px', }}>{detailMovie.overview}</p>
          <span style={{ fontWeight: 'bold' }}>Vote average : <Rate allowHalf count='10' defaultValue={detailMovie.vote_average} /> <br /> Vote count : {detailMovie.vote_count} votes</span>
          <Row style={{ marginTop:'10px', marginBottom:'10px'}}>
          <Button type="primary" shape="round" icon={<PlayCircleOutlined />} style={{ backgroundColor: 'palevioletred'}} size={'large'}>
            Play
          </Button>
          </Row>
         
          <Row style={{ marginTop: '20px', width: '90%', height: '90%' }}>
            <YouTube videoId={'7Y6-w5Psupw'} opts={opts} onReady={(event) => { event.target.pauseVideo(); }} />;
         </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <Row>
            {detailMovie.images !== undefined ? detailMovie.images.backdrops.map((item, index) => (
              <Col span={24} key={index}>
                <Card
                  hoverable
                  bordered={false}
                  style={{ width: 300 }}
                  cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w300${item.file_path}`} />}
                >
                </Card>
              </Col>
            )) : null}
          </Row>

        </Col>
      </Row>

    </LayoutComponent >
  )
}
export default React.memo(DetailMoviePage);