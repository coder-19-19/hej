import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";

const CustomPagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage =
        paginationRange && paginationRange[paginationRange?.length - 1];
    return (
        <div className={`d-flex justify-content-${props.align}`}>
            <ul
                className={classnames("pagination", {
                    [className]: className,
                })}
            >
                <li
                    className={classnames("page-item", {
                        disabled: currentPage === 1,
                    })}
                    onClick={currentPage !== 1 ? onPrevious : () => {}}
                >
                    <a className="page-link">&laquo;</a>
                </li>
                {paginationRange?.map((pageNumber, i) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li key={i} className="page-item dots">
                                &#8230;
                            </li>
                        );
                    }

                    return (
                        <li
                            key={i}
                            className={classnames("page-item", {
                                active: pageNumber === currentPage,
                            })}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            <a className="page-link">
                                {pageNumber}
                            </a>
                        </li>
                    );
                })}
                <li
                    className={classnames("page-item", {
                        disabled: currentPage === lastPage,
                    })}
                    onClick={currentPage !== lastPage ? onNext : () => {}}
                >
                    <a className="page-link">&raquo;</a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPagination;
