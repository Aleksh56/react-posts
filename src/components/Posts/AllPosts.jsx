import React, {  useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { api } from "../../api/api";
import Post from "./Post";
import styles from "../../styles";

import {  Row, Col, Pagination } from "antd";
import Sort from "../Sort";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  setSortedPosts,
  setCurrentPage,
  setIsLoading,
} from "../../store/actions/actions";

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const dispatch = useDispatch();
  const {
    posts,
    isLoading,
    currentPage,
    postsPerPage,
    sortedPosts
  } = useSelector((state) => state);

  useEffect(() => {
    const fetchAllPostFromApi = async () => {
      try {
        dispatch(setIsLoading(true));
        const posts = await api.getAllPosts();
        dispatch(setPosts(posts));
        dispatch(setSortedPosts(posts));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchAllPostFromApi();
  }, [refreshFlag, dispatch]);

  const sortPosts = (sortedPosts) => {
    dispatch(setSortedPosts(sortedPosts));
    dispatch(setCurrentPage(1));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <FaSpinner className='animate-spin h-8 w-8 text-blue-500' />
      </div>
    );
  }

  return (
    <div className='px-4'>
      <div className='container flex justify-end mx-auto'>
        <Sort onSort={sortPosts} postInfo={posts} />
      </div>
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
          onChange={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
        />
      </div>
    </div>
  );
};

export default AllPosts;
