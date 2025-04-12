import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useNavigate } from "react-router";


const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const navigate = useNavigate()

  const fetchConnection = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch( addConnection (res.data.data))
  };

  const chatPagedirect = (id) => {
        navigate("/chat/" + id)
  };


  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <>
      <div className="flex justify-center my-10">
        <ul className="list bg-base-100 rounded-box shadow-md max-w-200">
          <li className="p-4 pb-12 text-xl opacity-80 tracking-wide w-150 text-center">
            Connection for this week
          </li>
          {connection?.length == 0 && <li className="p-4 pb-12 text-md opacity-80 tracking-wide w-150 text-center">
             You don't have any connection
          </li>}
          {connection &&
            connection?.map((data) => {
              return (
                <li className="list-row w-180" mb-lg-5>
                  <div>
                    <img className="size-10 rounded-box" src={data?.photoUrl} />
                  </div>
                  <div>
                    <div>{data?.firstName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {data?.lastName}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">{data?.about}</p>
                  <button className="btn " onClick={()=>{ chatPagedirect(data?._id)}}>
                        Chat
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
