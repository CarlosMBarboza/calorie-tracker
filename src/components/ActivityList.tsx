import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo, Dispatch } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[]; // Este es el prop que envía la App al componente ActivityList
  dispatch: Dispatch<ActivityActions>;
};
export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {activities.length === 0 ? (
        <p className="text-center py-6">No hay actividades aún...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
              ${activity.category === 1 ? "bg-lime-600" : "bg-orange-500"}`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-gray-500">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-6 w-6 text-slate-400" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
