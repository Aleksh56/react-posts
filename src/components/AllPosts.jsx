import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { api } from "../api/api";
import Post from "./Post";
import styles from "../styles";
import { Card, Row, Col, Pagination } from "antd";

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  useEffect(() => {
    const fetchAllPostFromApi = async () => {
      try {
        setIsLoading(true);
        const posts = await api.getAllPosts();
        setPosts(posts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPostFromApi();
  }, [refreshFlag]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className={`${styles.flexRowFullCenter} h-screen`}>
        <FaSpinner className={styles.fetchLoader} />
      </div>
    );
  }

  return (
    <div className='px-4'>
      <div className='container py-8 mx-auto flex flex-wrap'>
        <Row gutter={[16, 16]}>
          {currentPosts.map((post) => (
            <Col xs={24} sm={24} md={12} lg={6} key={post._id}>
              <Link to={`/post/${post._id}`}>
                <Post postInfo={post} refreshPosts={refreshPostsOnPage} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <div className='flex justify-center mt-4 mb-7'>
        <Pagination
          current={currentPage}
          pageSize={postsPerPage}
          total={posts.length}
          showSizeChanger={false}
          onChange={paginate}
        />
      </div>
    </div>
  );
};

export default AllPosts;
