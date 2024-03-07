"use client";

import Spinner from "@/components/Common/CommonModal/Spinner";
import Image from "next/image";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import useDynamicData from "../Components/Hooks/useDynamicData";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";

const page = () => {
    const {
        data: articles,
        isLoading,
        refetch,
    } = useDynamicData("articles", "/api/articles");

    if (isLoading) {
        return <Spinner />;
    }

    console.log(articles);
    return (
        <div className="">
            <div className="">
                <p className="text-lg font-semibold">All article</p>
                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-start justify-between pt-6 2xl:gap-6 gap-3">
                    {articles.map((post) => (
                        <ArticleCard
                        
                            key={post._id}
                            post={post}
                            refetch={refetch}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default page;

const ArticleCard = ({ post, refetch }) => {
    const {
        _id,
        title,
        description,
        author,
        date,
        articleImage_url,
        avatar_url,
    } = post;
    const axiosAdmin = useAxios();
    const [isDeleting, setIsDeleting] = useState(false);
    const [seeMore, setSeeMore] = useState(true);
    const handleDeleteArticle = (id) => {
        console.log(id);
        setIsDeleting(true);
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: "#d63031",
                cancelButtonColor: "#1dbf73",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result?.isConfirmed) {
                    axiosAdmin.delete(`/api/articles/${id}`).then((result) => {
                        if (result?.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            refetch();
                            toast.error("successfully deleted");
                            setIsDeleting(false);
                        }
                    });
                }
            });
            setIsDeleting(false);
        } catch (error) {
            console.error("Error deleting user:", error);
            setIsDeleting(false);
        }
    };

    return (
        <div className="h-full rounded-lg overflow-hidden border-2 bg-white mb-1 relative">
            <button
                onClick={() => handleDeleteArticle(_id)}
                className=" bg-rose-600 border-4 border-white rounded-2xl p-1.5 flex items-center justify-center absolute -top-2 -right-2 text-2xl text-white"
            >
                {isDeleting ? (
                    <div className="mx-6">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <RiCloseLine />
                )}
            </button>
            <img
                className="w-full h-48 object-cover"
                src={articleImage_url}
                alt="Illustration"
            />
            <div className="px-5 py-4">
                <h3 className="text-xl font-bold ">
                    {title.length <= 30 ? title : title.slice(0, 30)}
                    {title.length >= 30 && <span>...</span>}
                </h3>
                <p className="text-sm ">
                    {description.length <= 90
                        ? description
                        : description.slice(0, 90)}
                    ,{description.length >= 90 && <span>...</span>}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div className="px-6 flex items-center gap-3 pb-4">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                        <Image
                            className="w-8 h-8 rounded-full object-cover"
                            src={avatar_url}
                            alt="Author"
                            width={32}
                            height={32}
                        />
                    </div>
                    <h5 className="ml-2 text-sm font-bold">
                        {author} <br />{" "}
                        <span className="font-normal text-sm">{date}</span>
                    </h5>
                </div>
                <div className="pb-8">
                    <Link id={post._id} href={`/article-details/${post._id}`}>
                        <GoLinkExternal className="text-2xl me-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
