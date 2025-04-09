import React , { useEffect } from 'react'
import { addRequest, removeRequest } from '../utils/requestSlice.jsx';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import BASE_URL from '../utils/constant';


const Requests = () => {

    
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const respondRequest = async (status, toUserID) => {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + toUserID, {} ,
      {
        withCredentials: true,
      }
    );
    dispatch(removeRequest(toUserID))
  };

  const fetchRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

    

  return (
    <>
      <div className="flex justify-center my-10">
        <ul className="list bg-base-100 rounded-box shadow-md max-w-200">
          <li className="p-4 pb-12 text-xl opacity-80 tracking-wide  text-center">
            Here are all your request
          </li>

          {request &&
            request.map((data) => {
              return (
                <li className="list-row w-180" mb-lg-5>
                  <div>
                    <img
                      className="size-10 rounded-box"
                      src={data.fromUserId.photoUrl}
                    />
                  </div>
                  <div>
                    <div>{data.fromUserId.firstName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {data.fromUserId.lastName}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">
                    {data.fromUserId.about}
                  </p>
                  <button
                    class="btn btn-active btn-info"
                    onClick={() => respondRequest("rejected", data._id)}
                  >
                    Reject
                  </button>
                  <button
                    class="btn btn-active btn-success"
                    onClick={() => respondRequest("accepted", data._id)}
                  >
                    Accept
                  </button>
                </li>
              );
            })}
          {request.length == 0 && (
              <li className="list-row w-180 mb-5 flex justify-center">
                You have no requests at this moment
              </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Requests