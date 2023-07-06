import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { api } from "../../api/api";
import Post from "./Post";
import { Row, Col, Pagination } from "antd";
import Sort from "../Sort";
import { getAllPosts } from "../../store/actions/PostsActions";

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedPosts, setSortedPosts] = useState(posts);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchAllPostFromApi = async () => {
      try {
        setIsLoading(true);
        await dispatch(getAllPosts());
        setSortedPosts(posts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPostFromApi();
  },[refreshFlag, posts]);



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    sortedPosts && sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }
  const sortPosts = (sortedPosts) => {
    setSortedPosts(sortedPosts);
    setCurrentPage(1);
  };

  return (
    <div className="px-4">
      <div className="container flex justify-end mx-auto">
        <Sort onSort={sortPosts} postInfo={posts} />
      </div>
      <div className="container py-8 mx-auto flex flex-wrap">
        <Row gutter={[16, 16]}>
          {currentPosts.map((post) => (
            <Col xs={24} sm={24} md={12} lg={8} key={post._id}>
              <Link to={`/post/${post._id}`}>
                <Post postInfo={post} refreshPosts={refreshPostsOnPage} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <div className="flex justify-center mt-4 mb-7">
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
