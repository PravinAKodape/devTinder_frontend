import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch( addConnection (res.data.data))
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <>
      <div className="flex justify-center my-10">
        <ul className="list bg-base-100 rounded-box shadow-md max-w-200">
          <li className="p-4 pb-12 text-xl opacity-80 tracking-wide  text-center">
            Connection for this week
          </li>

          {connection &&
            connection.map((data) => {
              return (
                <li className="list-row w-180" mb-lg-5>
                  <div>
                    <img className="size-10 rounded-box" src={data.photoUrl} />
                  </div>
                  <div>
                    <div>{data.firstName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {data.lastName}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">{data.about}</p>
                  <button className="btn btn-square btn-ghost">
                    <svg
                      className="size-[1.2em]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </g>
                    </svg>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Connections;
