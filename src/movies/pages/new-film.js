import React,{ useState, useEffect } from 'react';
import { Row, Col,Pagination } from 'antd';
import LayoutComponent from '../components/layout';
import { getDataNewFilm } from '../services/api';
import LoadingData from '../components/loading-data';
import ListMoviesView from '../components/list-movies';

const NewFilmPage = () => {
  const [loadingNewFilm, setLoadingNewFilm] = useState(false);
  const [movies, setMovie] = useState([]);
  const [totalItems, setTotaItem] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      setLoadingNewFilm(true);
      const data = await getDataNewFilm(page);
      if(data){
        setMovie(data.results);
        setTotaItem(data.total_results);
        if(page < 1){
          setPage(1);
        } else if(page > data.total_pages) {
          setPage(data.total_pages);
        }
        setLoadingNewFilm(false);
      }
    }
    getData();
  }, [page]);
  const changePage = (pages) => {
    setPage(pages);
  }

  if(loadingNewFilm || movies.length === 0){
    return (
      <LayoutComponent>
        <LoadingData/>
      </LayoutComponent>
    )
  }
  return (
    <LayoutComponent>
    <ListMoviesView movies={movies} />
    <Row style={{textAlign: 'center', marginTop: '20px'}}>
        <Col span={24}>
          <Pagination
            current={page}
            pageSize={20}
            total={totalItems}
            onChange={(pages) => changePage(pages) }
          />
        </Col>
    </Row>
  </LayoutComponent>
  )
}
export default React.memo(NewFilmPage);