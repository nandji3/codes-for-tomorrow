import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPageAction } from "../../Redux/postsSlice";
import styles from "../../Styles/Pagination.module.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Pagination = () => {
    const dispatch = useDispatch();
    const { posts, currentPage } = useSelector((state) => state.posts);

    const totalPages = Math.ceil(posts.length / 6); // Assuming 6 items per page

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            dispatch(currentPageAction(newPage));
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(totalPages, maxPageNumbersToShow);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.navBtn} ${currentPage === 1 ? styles.disabled : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <BiSolidLeftArrow />
            </button>
            {currentPage > 3 && (
                <>
                    <button
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>
                    <span className={styles.ellipsis}>...</span>
                </>
            )}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${styles.pageBtn} ${currentPage === pageNumber ? styles.active : ""}`}
                >
                    {pageNumber}
                </button>
            ))}
            {currentPage < totalPages - 2 && (
                <>
                    <span className={styles.ellipsis}>...</span>
                    <button
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className={`${styles.navBtn} ${currentPage === totalPages ? styles.disabled : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <BiSolidRightArrow />
            </button>
        </div>
    );
};

export default Pagination;
