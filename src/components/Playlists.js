import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { v4 as uuidv4 } from "uuid";

import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const allPlylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlists,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/songs/delete-playlist",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Playlist deleted successfully");
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  let uid = uuidv4();
  return (
    <div className="bg-gray-50">
      <div className="flex justify-between w-full">
        <h1 className="text-green-500 text-2xl">Your Playlists</h1>
        <h1
          className="underline text-green-500 cursor-pointer text-xl "
          onClick={() => {
            navigate("/create-edit-playlist");
          }}
        >
          Create Playlist
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              // key={uid}
              className={`flex flex-col gap-1 shadow border rounded p-2 cursor-pointer ${
                isSelected && "border-active border-2"
              }`}
              onClick={() => {
                dispatch(SetSelectedPlaylist(playlist));
              }}
            >
              <h1 className="text-3xl">{playlist?.name}</h1>
              <h1 className="text-xl">{playlist?.songs?.length} Songs</h1>
              <hr />
              <div className="flex gap-3 justify-between">
                <i
                  className="ri-delete-bin-line text-2xl text-gray-500"
                  onClick={() => {
                    onDelete(playlist.name);
                  }}
                ></i>

                <i
                  className="ri-pencil-line text-2xl text-gray-500"
                  onClick={() => {
                    dispatch(SetSelectedPlaylistForEdit(playlist));
                    navigate(`/create-edit-playlist`);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
