import "./Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import followsService from "../../../Services/FollowsService";
import FollowsCountModel from "../../../Models/FollowsCountModel";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import notifyService from "../../../Services/NotifyService";



function Chart(): JSX.Element {
  const user = useVerifyLoggedIn();

  const [followerCount, setFollowerCount] = useState<FollowsCountModel[]>([]);

  useEffect(() => {
    followsService.followersCount()
      .then(setFollowerCount)
      .catch(error => notifyService.error(error))
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vacations Report',
        color: 'aqua',
        font: {
          size: 20
        }
      },

    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vacation Destination',
          font: {
            size: 12
          },
          padding: 10, 
          color: 'aqua',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number Of Followers',
          font: {
            size: 12
          },
          padding:10, 

          color: 'aqua',

        },
      }

    }


  };

  const labels = followerCount.map(f => f.destination);

  const data = {
    labels,
    datasets: [
      {
        label: 'Follows For Vacation',
        data: followerCount.map(f => f.followersCount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        borderRadius: 10,
        hoverBackgroundColor: '#3EFF00',
        hoverBorderColor: 'rgb(54, 162, 235)',
      }
    ],
  };

  return (
    <div className="Chart">
      {user.roleId === 1
        ?
        <>
        <AdminMenu /> 
        <Bar options={options} data={data} />
        </>
        :
        <Navigate to="/vacations" />
      }
    </div>
  );
}

export default Chart;
